import { spawn, exec } from "child_process";
import { promises as fs } from "fs";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { homedir, platform } from "os";
import { promisify } from "util";

const execAsync = promisify(exec);

export interface ClaudeExecutable {
  path: string;
  version: string;
  isValid: boolean;
}

/**
 * Scans the system for Claude Code executables in common installation paths
 */
export async function scanForClaudeExecutables(): Promise<ClaudeExecutable[]> {
  const candidates: string[] = [];
  const isWindows = platform() === "win32";
  
  // Common installation paths
  const commonPaths = isWindows ? [
    "C:\\Program Files\\nodejs\\claude.cmd",
    "C:\\Program Files (x86)\\nodejs\\claude.cmd",
    join(homedir(), "AppData\\Roaming\\npm\\claude.cmd"),
    join(homedir(), "AppData\\Local\\Programs\\nodejs\\claude.cmd"),
    "claude.cmd",
    "claude.exe"
  ] : [
    "/usr/local/bin/claude",
    "/usr/bin/claude", 
    "/opt/homebrew/bin/claude",
    "/home/linuxbrew/.linuxbrew/bin/claude",
    join(homedir(), ".local/bin/claude"),
    join(homedir(), ".npm-global/bin/claude"),
    "claude"
  ];

  // Add npm global paths
  try {
    const { stdout } = await execAsync(isWindows ? "npm root -g" : "npm prefix -g");
    const npmGlobalRoot = stdout.trim();
    if (npmGlobalRoot) {
      const npmGlobalBin = isWindows ? 
        join(npmGlobalRoot, "claude.cmd") : 
        join(dirname(npmGlobalRoot), "bin", "claude");
      candidates.push(npmGlobalBin);
      
      // Also check for @anthropic-ai/claude-code installation
      const anthropicClaudePath = isWindows ? 
        join(npmGlobalRoot, "node_modules", "@anthropic-ai", "claude-code", "bin", "claude.cmd") :
        join(npmGlobalRoot, "bin", "claude");
      candidates.push(anthropicClaudePath);
    }
  } catch (error) {
    console.debug("Failed to get npm global path:", error);
  }

  // Add yarn global paths
  try {
    const { stdout } = await execAsync("yarn global dir");
    const yarnGlobalDir = stdout.trim();
    if (yarnGlobalDir) {
      const yarnClaudePath = isWindows ?
        join(yarnGlobalDir, "node_modules", ".bin", "claude.cmd") :
        join(yarnGlobalDir, "node_modules", ".bin", "claude");
      candidates.push(yarnClaudePath);
    }
  } catch (error) {
    console.debug("Failed to get yarn global path:", error);
  }

  // Check which command to find executables in PATH
  try {
    const whichCommand = isWindows ? "where claude" : "which claude";
    const { stdout } = await execAsync(whichCommand);
    const pathExecutables = stdout.trim().split('\n').filter(Boolean);
    candidates.push(...pathExecutables);
  } catch (error) {
    console.debug("Failed to find claude in PATH:", error);
  }

  // Add common paths to candidates
  candidates.push(...commonPaths);

  // Remove duplicates and validate each candidate
  const uniqueCandidates = [...new Set(candidates)];
  const results: ClaudeExecutable[] = [];

  for (const candidatePath of uniqueCandidates) {
    try {
      const executable = await validateClaudeExecutable(candidatePath);
      if (executable) {
        results.push(executable);
      }
    } catch (error) {
      console.debug(`Failed to validate ${candidatePath}:`, error);
    }
  }

  // Sort by validity and path preference
  results.sort((a, b) => {
    if (a.isValid && !b.isValid) return -1;
    if (!a.isValid && b.isValid) return 1;
    
    // Prefer global npm installations
    if (a.path.includes("npm") && !b.path.includes("npm")) return -1;
    if (!a.path.includes("npm") && b.path.includes("npm")) return 1;
    
    // Prefer /usr/local/bin over /usr/bin
    if (a.path.includes("/usr/local/bin") && b.path.includes("/usr/bin")) return -1;
    if (a.path.includes("/usr/bin") && b.path.includes("/usr/local/bin")) return 1;
    
    return a.path.localeCompare(b.path);
  });

  return results;
}

/**
 * Validates a specific Claude executable path
 */
export async function validateClaudeExecutable(claudePath: string): Promise<ClaudeExecutable | null> {
  try {
    // Check if file exists
    if (!existsSync(claudePath)) {
      return {
        path: claudePath,
        version: "File not found",
        isValid: false
      };
    }

    // Try to get version
    const version = await getClaudeVersion(claudePath);
    
    return {
      path: claudePath,
      version: version || "Unknown version",
      isValid: version !== null
    };
  } catch (error) {
    return {
      path: claudePath,
      version: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      isValid: false
    };
  }
}

/**
 * Gets the version of a Claude executable
 */
async function getClaudeVersion(claudePath: string): Promise<string | null> {
  return new Promise((resolve) => {
    const child = spawn(claudePath, ["--version"], {
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 5000,
      shell: true
    });

    let output = "";
    let errorOutput = "";

    child.stdout?.on("data", (data) => {
      output += data.toString();
    });

    child.stderr?.on("data", (data) => {
      errorOutput += data.toString();
    });

    child.on("close", (code) => {
      if (code === 0 && output.trim()) {
        // Extract version from output
        const versionMatch = output.match(/(\d+\.\d+\.\d+)/);
        resolve(versionMatch ? versionMatch[1] : output.trim());
      } else if (errorOutput.includes("version") || output.includes("version")) {
        // Some executables output version to stderr or in error text
        const versionMatch = (output + errorOutput).match(/(\d+\.\d+\.\d+)/);
        resolve(versionMatch ? versionMatch[1] : "Unknown version");
      } else {
        resolve(null);
      }
    });

    child.on("error", () => {
      resolve(null);
    });

    // Timeout fallback
    setTimeout(() => {
      child.kill();
      resolve(null);
    }, 5000);
  });
}

/**
 * Tests if a Claude executable can be executed successfully
 */
export async function testClaudeExecutable(claudePath: string): Promise<{ success: boolean; message: string }> {
  try {
    const executable = await validateClaudeExecutable(claudePath);
    
    if (!executable) {
      return { success: false, message: "Failed to validate executable" };
    }
    
    if (!executable.isValid) {
      return { success: false, message: executable.version };
    }

    // Try to run a simple help command
    return new Promise((resolve) => {
      const child = spawn(claudePath, ["--help"], {
        stdio: ["ignore", "pipe", "pipe"],
        timeout: 5000,
        shell: true
      });

      let output = "";
      let errorOutput = "";

      child.stdout?.on("data", (data) => {
        output += data.toString();
      });

      child.stderr?.on("data", (data) => {
        errorOutput += data.toString();
      });

      child.on("close", (code) => {
        if (code === 0 || output.includes("usage") || output.includes("help") || errorOutput.includes("usage")) {
          resolve({ 
            success: true, 
            message: `Claude executable is working (version: ${executable.version})` 
          });
        } else {
          resolve({ 
            success: false, 
            message: `Failed to execute: ${errorOutput || 'Unknown error'}` 
          });
        }
      });

      child.on("error", (error) => {
        resolve({ 
          success: false, 
          message: `Execution error: ${error.message}` 
        });
      });

      // Timeout fallback
      setTimeout(() => {
        child.kill();
        resolve({ 
          success: false, 
          message: "Execution timeout - executable may be hanging" 
        });
      }, 5000);
    });
  } catch (error) {
    return { 
      success: false, 
      message: `Test failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}

/**
 * Updates the CCR wrapper script to use a new Claude executable path
 */
export async function updateClaudePath(newClaudePath: string): Promise<{ success: boolean; message: string }> {
  try {
    // Validate the new path first
    const validation = await testClaudeExecutable(newClaudePath);
    if (!validation.success) {
      return {
        success: false,
        message: `Cannot update to invalid Claude path: ${validation.message}`
      };
    }

    // Update environment variable for current process
    process.env.CLAUDE_PATH = newClaudePath;

    // Try to create/update a persistent configuration file for the claude path
    const configDir = join(homedir(), ".claude-code-router");
    const claudePathFile = join(configDir, "claude-path.txt");
    
    try {
      await fs.mkdir(configDir, { recursive: true });
      await fs.writeFile(claudePathFile, newClaudePath, "utf-8");
    } catch (error) {
      console.warn("Failed to persist Claude path configuration:", error);
    }

    // On Unix-like systems, try to update any ccr wrapper scripts
    if (platform() !== "win32") {
      const possibleWrapperPaths = [
        "/usr/local/bin/ccr",
        "/usr/bin/ccr",
        join(homedir(), ".local/bin/ccr"),
        join(homedir(), "bin/ccr")
      ];

      for (const wrapperPath of possibleWrapperPaths) {
        try {
          if (existsSync(wrapperPath)) {
            const content = await fs.readFile(wrapperPath, "utf-8");
            if (content.includes("CLAUDE_PATH=") || content.includes("claude")) {
              // Update the wrapper script to use the new Claude path
              const updatedContent = content.replace(
                /(export\s+CLAUDE_PATH=)[^\n]*/g,
                `$1"${newClaudePath}"`
              );
              await fs.writeFile(wrapperPath, updatedContent, "utf-8");
              console.log(`Updated wrapper script at ${wrapperPath}`);
            }
          }
        } catch (error) {
          console.debug(`Failed to update wrapper at ${wrapperPath}:`, error);
        }
      }
    }

    return {
      success: true,
      message: `Successfully updated Claude path to: ${newClaudePath}`
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to update Claude path: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

/**
 * Load the persisted Claude path from configuration
 */
export async function loadPersistedClaudePath(): Promise<string | null> {
  try {
    const configDir = join(homedir(), ".claude-code-router");
    const claudePathFile = join(configDir, "claude-path.txt");
    
    if (existsSync(claudePathFile)) {
      const claudePath = await fs.readFile(claudePathFile, "utf-8");
      return claudePath.trim();
    }
  } catch (error) {
    console.debug("Failed to load persisted Claude path:", error);
  }
  
  return null;
}