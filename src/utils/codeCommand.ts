import { spawn } from "child_process";
import {
  incrementReferenceCount,
  decrementReferenceCount,
} from "./processCheck";
import { closeService } from "./close";
import { readConfigFile } from ".";

export async function executeCodeCommand(args: string[] = []) {
  // Set environment variables
  const config = await readConfigFile();
  const env = {
    ...process.env,
    ANTHROPIC_BASE_URL: `http://127.0.0.1:${config.PORT || 3456}`,
    API_TIMEOUT_MS: String(config.API_TIMEOUT_MS ?? 600000), // Default to 10 minutes if not set
  };

  // Only override authentication if router has its own API key configured
  // Otherwise, preserve Claude's built-in authentication for Anthropic API usage
  if (config?.APIKEY) {
    env.ANTHROPIC_API_KEY = config.APIKEY;
    // Claude Code uses ANTHROPIC_AUTH_TOKEN for Bearer authentication
    delete env.ANTHROPIC_AUTH_TOKEN;
  }
  // If no router APIKEY, leave Claude's auth intact (ANTHROPIC_AUTH_TOKEN from ~/.claude)

  // Increment reference count when command starts
  incrementReferenceCount();

  // Execute claude command
  const claudePath = process.env.CLAUDE_PATH || "claude";
  const claudeProcess = spawn(claudePath, args, {
    env,
    stdio: "inherit",
    shell: true,
  });

  claudeProcess.on("error", (error) => {
    console.error("Failed to start claude command:", error.message);
    console.log(
      "Make sure Claude Code is installed: npm install -g @anthropic-ai/claude-code"
    );
    decrementReferenceCount();
    process.exit(1);
  });

  claudeProcess.on("close", (code) => {
    decrementReferenceCount();
    closeService();
    process.exit(code || 0);
  });
}
