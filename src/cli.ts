#!/usr/bin/env node
import { run } from "./index";
import { showStatus } from "./utils/status";
import { executeCodeCommand } from "./utils/codeCommand";
import { cleanupPidFile, isServiceRunning } from "./utils/processCheck";
import { version } from "../package.json";
import { spawn } from "child_process";
import { PID_FILE, REFERENCE_COUNT_FILE } from "./constants";
import fs, { existsSync, readFileSync } from "fs";
import {join} from "path";

const command = process.argv[2];

const HELP_TEXT = `
Usage: ccr [command]

Commands:
  start         Start server with web UI
  stop          Stop server
  restart       Restart server with web UI
  status        Show server status
  code          Execute claude command
  ui            Open configuration web interface
  -v, version   Show version information
  -h, help      Show help information

Example:
  ccr start                  # Start both API (3000) and Web UI (3457)
  ccr ui                     # Open web configuration
  ccr code "Write a Hello World"
  
Web Interface:
  http://localhost:3457/ui    # Visual configuration panel
  http://localhost:3000      # API endpoint
`;

async function waitForService(
  timeout = 10000,
  initialDelay = 1000
): Promise<boolean> {
  // Wait for an initial period to let the service initialize
  await new Promise((resolve) => setTimeout(resolve, initialDelay));

  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    if (isServiceRunning()) {
      // Wait for an additional short period to ensure service is fully ready
      await new Promise((resolve) => setTimeout(resolve, 500));
      return true;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return false;
}

async function main() {
  switch (command) {
    case "start":
      if (isServiceRunning()) {
        console.log("✅ Service is already running in the background.");
        break;
      }
      
      // Check if we should run in foreground mode
      if (process.argv.includes("--foreground")) {
        run();
      } else {
        // Start the service in the background
        const cliPath = join(__dirname, "cli.js");
        const startProcess = spawn("node", [cliPath, "start", "--foreground"], {
          detached: true,
          stdio: "ignore",
          env: { ...process.env, SERVICE_PORT: "3456" }
        });
        
        startProcess.on("error", (error) => {
          console.error("Failed to start service:", error);
          process.exit(1);
        });
        
        startProcess.unref();
        
        // Wait a moment for the service to start
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        if (isServiceRunning()) {
          console.log("✅ Claude Code Router started successfully!");
          console.log("🌐 Web UI (Configuration): http://localhost:3457/ui");
          console.log("📡 API Endpoint: http://localhost:3000");
          console.log("📝 Configure your providers and routing rules through the web interface");
        } else {
          console.error("❌ Failed to start service.");
          process.exit(1);
        }
      }
      break;
    case "stop":
      try {
        const pid = parseInt(readFileSync(PID_FILE, "utf-8"));
        process.kill(pid);
        cleanupPidFile();
        if (existsSync(REFERENCE_COUNT_FILE)) {
          try {
            fs.unlinkSync(REFERENCE_COUNT_FILE);
          } catch (e) {
            // Ignore cleanup errors
          }
        }
        console.log(
          "claude code router service has been successfully stopped."
        );
      } catch (e) {
        console.log(
          "Failed to stop the service. It may have already been stopped."
        );
        cleanupPidFile();
      }
      break;
    case "status":
      await showStatus();
      break;
    case "code":
      if (!isServiceRunning()) {
        console.log("Service not running, starting service...");
        const cliPath = join(__dirname, "cli.js");
        const startProcess = spawn("node", [cliPath, "start"], {
          detached: true,
          stdio: "ignore",
        });

        // let errorMessage = "";
        // startProcess.stderr?.on("data", (data) => {
        //   errorMessage += data.toString();
        // });

        startProcess.on("error", (error) => {
          console.error("Failed to start service:", error.message);
          process.exit(1);
        });

        // startProcess.on("close", (code) => {
        //   if (code !== 0 && errorMessage) {
        //     console.error("Failed to start service:", errorMessage.trim());
        //     process.exit(1);
        //   }
        // });

        startProcess.unref();

        if (await waitForService()) {
          executeCodeCommand(process.argv.slice(3));
        } else {
          console.error(
            "Service startup timeout, please manually run `ccr start` to start the service"
          );
          process.exit(1);
        }
      } else {
        executeCodeCommand(process.argv.slice(3));
      }
      break;
    case "-v":
    case "version":
      console.log(`claude-code-router version: ${version}`);
      break;
    case "ui":
      if (!isServiceRunning()) {
        console.log("Service not running, starting service...");
        const cliPath = join(__dirname, "cli.js");
        const startProcess = spawn("node", [cliPath, "start"], {
          detached: true,
          stdio: "ignore",
        });

        startProcess.on("error", (error) => {
          console.error("Failed to start service:", error.message);
          process.exit(1);
        });

        startProcess.unref();

        if (await waitForService()) {
          console.log("🌐 Opening configuration interface at http://localhost:3457/ui");
          console.log("📝 Configure your providers and routing rules through the web interface");
          
          // Try to open in browser
          try {
            const { exec } = require("child_process");
            const url = "http://localhost:3457/ui";
            const platform = process.platform;
            
            if (platform === "darwin") {
              exec(`open "${url}"`);
            } else if (platform === "win32") {
              exec(`start "${url}"`);
            } else {
              exec(`xdg-open "${url}"`);
            }
          } catch (error) {
            console.log("Could not automatically open browser. Please visit the URL manually.");
          }
        } else {
          console.error("Service startup timeout, please manually run `ccr start` first");
          process.exit(1);
        }
      } else {
        console.log("🌐 Configuration interface available at http://localhost:3457/ui");
        console.log("📝 Configure your providers and routing rules through the web interface");
        
        // Try to open in browser
        try {
          const { exec } = require("child_process");
          const url = "http://localhost:3457/ui";
          const platform = process.platform;
          
          if (platform === "darwin") {
            exec(`open "${url}"`);
          } else if (platform === "win32") {
            exec(`start "${url}"`);
          } else {
            exec(`xdg-open "${url}"`);
          }
        } catch (error) {
          console.log("Could not automatically open browser. Please visit the URL manually.");
        }
      }
      break;
    case "restart":
      // Stop the service if it's running
      try {
        const pid = parseInt(readFileSync(PID_FILE, "utf-8"));
        process.kill(pid);
        cleanupPidFile();
        if (existsSync(REFERENCE_COUNT_FILE)) {
          try {
            fs.unlinkSync(REFERENCE_COUNT_FILE);
          } catch (e) {
            // Ignore cleanup errors
          }
        }
        console.log("claude code router service has been stopped.");
      } catch (e) {
        console.log("Service was not running or failed to stop.");
        cleanupPidFile();
      }

      // Start the service again in the background
      console.log("Starting claude code router service...");
      const cliPath = join(__dirname, "cli.js");
      const startProcess = spawn("node", [cliPath, "start"], {
        detached: true,
        stdio: "ignore",
      });

      startProcess.on("error", (error) => {
        console.error("Failed to start service:", error);
        process.exit(1);
      });

      startProcess.unref();
      console.log("✅ Service started successfully in the background.");
      break;
    case "-h":
    case "help":
      console.log(HELP_TEXT);
      break;
    default:
      console.log(HELP_TEXT);
      process.exit(1);
  }
}

main().catch(console.error);
