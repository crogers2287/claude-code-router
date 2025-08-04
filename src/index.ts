import { existsSync } from "fs";
import { writeFile } from "fs/promises";
import { homedir } from "os";
import { join } from "path";
import { initConfig, initDir } from "./utils";
import { createServer } from "./server";
import { router } from "./utils/router";
import { apiKeyAuth } from "./middleware/auth";
import { webuiRoutes } from "./routes/webui";
import fastify from "fastify";
import { writeFileSync } from "fs";
import {
  cleanupPidFile,
  isServiceRunning,
  savePid,
} from "./utils/processCheck";
import { CONFIG_FILE } from "./constants";

async function initializeClaudeConfig() {
  const homeDir = homedir();
  const configPath = join(homeDir, ".claude.json");
  if (!existsSync(configPath)) {
    const userID = Array.from(
      { length: 64 },
      () => Math.random().toString(16)[2]
    ).join("");
    const configContent = {
      numStartups: 184,
      autoUpdaterStatus: "enabled",
      userID,
      hasCompletedOnboarding: true,
      lastOnboardingVersion: "1.0.17",
      projects: {},
    };
    await writeFile(configPath, JSON.stringify(configContent, null, 2));
  }
}

interface RunOptions {
  port?: number;
}

async function run(options: RunOptions = {}) {
  // Check if service is already running
  if (isServiceRunning()) {
    console.log("✅ Service is already running in the background.");
    return;
  }

  // Add error handlers to catch unhandled errors
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });

  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
  });

  await initializeClaudeConfig();
  await initDir();
  const config = await initConfig();
  let HOST = config.HOST;

  if (config.HOST && !config.APIKEY) {
    HOST = "127.0.0.1";
    console.warn(
      "⚠️ API key is not set. HOST is forced to 127.0.0.1."
    );
  }

  const port = config.PORT || 3456;

  // Save the PID of the background process
  savePid(process.pid);

  // Handle SIGINT (Ctrl+C) to clean up PID file
  process.on("SIGINT", () => {
    console.log("Received SIGINT, cleaning up...");
    cleanupPidFile();
    process.exit(0);
  });

  // Handle SIGTERM to clean up PID file
  process.on("SIGTERM", () => {
    cleanupPidFile();
    process.exit(0);
  });
  console.log(HOST)

  // Use port from environment variable if set (for background process)
  const servicePort = process.env.SERVICE_PORT
    ? parseInt(process.env.SERVICE_PORT)
    : port;
  const server = createServer({
    jsonPath: CONFIG_FILE,
    initialConfig: {
      // ...config,
      providers: config.Providers || config.providers,
      HOST: HOST,
      PORT: servicePort,
      LOG_FILE: join(
        homedir(),
        ".claude-code-router",
        "claude-code-router.log"
      ),
    },
  });
  // Create separate web UI server on port 3457
  writeFileSync('/tmp/webui-debug.log', 'Starting web UI server setup\n', { flag: 'a' });
  const webServer = fastify({ logger: true });
  
  // Register web UI routes on separate server
  console.log("About to register web UI routes...");
  try {
    await webuiRoutes(webServer);
    console.log("Web UI routes registered successfully");
  } catch (error) {
    console.error("Failed to register web UI routes:", error);
    return;
  }
  
  try {
    const webHost = HOST || "127.0.0.1";
    console.log(`Attempting to start Web UI server on ${webHost}:3457...`);
    await webServer.listen({ port: 3457, host: webHost });
    console.log(`🌐 Web UI server listening on http://${webHost}:3457/ui`);
    
    // Test that the server is actually responding after a brief delay
    setTimeout(async () => {
      try {
        const response = await fetch(`http://${webHost}:3457/ui`);
        console.log(`Web UI server health check: ${response.status}`);
      } catch (error) {
        console.error("Web UI server health check failed:", error.message);
      }
    }, 1000);
    
  } catch (error) {
    console.error("Failed to start web UI server:", error);
    console.error("Error details:", error.stack);
    console.error("Error code:", error.code);
  }
  
  // Create a mutable config reference for hot reloading
  const configRef = { current: config };

  server.addHook("preHandler", async (req: any, reply: any) => {
    // Use the current config for auth
    await apiKeyAuth(configRef.current)(req, reply);
  });
  server.addHook("preHandler", async (req: any, reply: any) => {
    if(req.url.startsWith("/v1/messages")) {
      router(req, reply, configRef.current)
    }
  });

  // Handle SIGHUP to reload configuration (after server is created)
  process.on("SIGHUP", async () => {
    console.log("🔄 Received SIGHUP, reloading configuration...");
    try {
      const newConfig = await initConfig();
      
      // Update the config reference
      configRef.current = newConfig;
      
      console.log("✅ Configuration reloaded successfully");
    } catch (error) {
      console.error("❌ Failed to reload configuration:", error);
    }
  });
  
  server.start();
}

export { run };
// run();
