import Server from "@musistudio/llms";
import { readConfigFile, writeConfigFile } from "./utils";
import { CONFIG_FILE } from "./constants";
import { join } from "path";
import { readFileSync } from "fs";
import fastifyStatic from "@fastify/static";
import { 
  scanForClaudeExecutables, 
  validateClaudeExecutable, 
  testClaudeExecutable,
  updateClaudePath 
} from "./utils/system";

export const createServer = (config: any): Server => {
  const server = new Server(config);

  // Add endpoint to read config.json
  server.app.get("/api/config", async () => {
    return await readConfigFile();
  });

  server.app.get("/api/transformers", async () => {
    const transformers =
      server.app._server!.transformerService.getAllTransformers();
    const transformerList = Array.from(transformers.entries()).map(
      ([name, transformer]: any) => ({
        name,
        endpoint: transformer.endPoint || null,
      })
    );
    return { transformers: transformerList };
  });

  // Add endpoint to save config.json
  server.app.post("/api/config", async (req) => {
    const newConfig = req.body;
    
    // Backup existing config file if it exists
    const { backupConfigFile } = await import("./utils");
    const backupPath = await backupConfigFile();
    if (backupPath) {
      console.log(`Backed up existing configuration file to ${backupPath}`);
    }
    
    await writeConfigFile(newConfig);
    return { success: true, message: "Config saved successfully" };
  });

  // Add endpoint to restart the service
  server.app.post("/api/restart", async (_, reply) => {
    reply.send({ success: true, message: "Service restart initiated" });

    // Restart the service after a short delay to allow response to be sent
    setTimeout(() => {
      const { spawn } = require("child_process");
      spawn("ccr", ["restart"], { detached: true, stdio: "ignore" });
    }, 1000);
  });

  // Add endpoint to export configuration
  server.app.get("/api/export/config", async (_, reply) => {
    try {
      const config = await readConfigFile();
      reply.type('application/json').send(config);
    } catch (error) {
      reply.code(500).send({ 
        error: 'Failed to export configuration',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Add endpoint to export providers only
  server.app.get("/api/export/providers", async (_, reply) => {
    try {
      const config = await readConfigFile();
      const providersData = { Providers: config.Providers || [] };
      reply.type('application/json').send(providersData);
    } catch (error) {
      reply.code(500).send({ 
        error: 'Failed to export providers',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Add endpoint to import configuration
  server.app.post("/api/import/config", async (req, reply) => {
    try {
      const importedConfig = req.body;
      
      // Validate the imported config has required structure
      if (!importedConfig.Providers || !Array.isArray(importedConfig.Providers)) {
        return reply.code(400).send({
          error: 'Invalid configuration: missing or invalid Providers array'
        });
      }
      
      // Get current config to preserve server settings
      const currentConfig = await readConfigFile();
      
      // Merge configurations, preserving critical server settings
      const mergedConfig = {
        ...currentConfig,
        ...importedConfig,
        // Preserve critical server settings
        APIKEY: currentConfig.APIKEY,
        HOST: currentConfig.HOST,
        API_TIMEOUT_MS: importedConfig.API_TIMEOUT_MS || currentConfig.API_TIMEOUT_MS
      };
      
      // Backup existing config
      const { backupConfigFile } = await import("./utils");
      const backupPath = await backupConfigFile();
      if (backupPath) {
        console.log(`Backed up existing configuration to ${backupPath}`);
      }
      
      await writeConfigFile(mergedConfig);
      reply.send({ 
        success: true, 
        message: "Configuration imported successfully",
        backupPath
      });
    } catch (error) {
      reply.code(500).send({ 
        error: 'Failed to import configuration',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Add endpoint to import providers
  server.app.post("/api/import/providers", async (req, reply) => {
    try {
      const importedData = req.body;
      let providersToImport: any[] = [];
      
      // Handle different import formats
      if (importedData.Providers && Array.isArray(importedData.Providers)) {
        providersToImport = importedData.Providers;
      } else if (Array.isArray(importedData)) {
        providersToImport = importedData;
      } else {
        return reply.code(400).send({
          error: 'Invalid format: Expected JSON with Providers array or array of providers'
        });
      }
      
      // Validate provider structure
      const isValid = providersToImport.every(provider => 
        provider.name && provider.api_base_url && Array.isArray(provider.models)
      );
      
      if (!isValid) {
        return reply.code(400).send({
          error: 'Invalid provider data: Each provider must have name, api_base_url, and models array'
        });
      }
      
      // Get current config
      const currentConfig = await readConfigFile();
      
      // Merge with existing providers (avoiding duplicates by name)
      const existingNames = new Set(currentConfig.Providers.map((p: any) => p.name));
      const uniqueImported = providersToImport.filter(p => !existingNames.has(p.name));
      const newProviders = [...currentConfig.Providers, ...uniqueImported];
      
      const newConfig = { ...currentConfig, Providers: newProviders };
      
      // Backup existing config
      const { backupConfigFile } = await import("./utils");
      const backupPath = await backupConfigFile();
      
      await writeConfigFile(newConfig);
      reply.send({ 
        success: true, 
        message: `Imported ${uniqueImported.length} new providers (${providersToImport.length - uniqueImported.length} duplicates skipped)`,
        backupPath,
        imported: uniqueImported.length,
        skipped: providersToImport.length - uniqueImported.length
      });
    } catch (error) {
      reply.code(500).send({ 
        error: 'Failed to import providers',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // System API endpoints for Claude executable management
  server.app.get("/api/system/scan-claude", async (_, reply) => {
    try {
      console.log("Scanning system for Claude executables...");
      const executables = await scanForClaudeExecutables();
      console.log(`Found ${executables.length} Claude executables`);
      
      reply.send({ 
        success: true, 
        executables,
        total: executables.length
      });
    } catch (error) {
      console.error("Failed to scan for Claude executables:", error);
      reply.code(500).send({ 
        success: false,
        error: 'Failed to scan for Claude executables',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  server.app.post("/api/system/validate-claude", async (req, reply) => {
    try {
      const { path } = req.body as { path: string };
      
      if (!path || typeof path !== 'string') {
        return reply.code(400).send({
          success: false,
          error: 'Invalid request: path is required and must be a string'
        });
      }

      console.log(`Validating Claude executable at: ${path}`);
      const executable = await validateClaudeExecutable(path);
      
      if (!executable) {
        return reply.code(404).send({
          success: false,
          error: 'Executable not found or invalid'
        });
      }

      reply.send({ 
        success: true, 
        executable 
      });
    } catch (error) {
      console.error("Failed to validate Claude executable:", error);
      reply.code(500).send({ 
        success: false,
        error: 'Failed to validate Claude executable',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  server.app.post("/api/system/test-claude", async (req, reply) => {
    try {
      const { path } = req.body as { path: string };
      
      if (!path || typeof path !== 'string') {
        return reply.code(400).send({
          success: false,
          error: 'Invalid request: path is required and must be a string'
        });
      }

      console.log(`Testing Claude executable at: ${path}`);
      const testResult = await testClaudeExecutable(path);
      
      reply.send({ 
        success: testResult.success,
        message: testResult.message
      });
    } catch (error) {
      console.error("Failed to test Claude executable:", error);
      reply.code(500).send({ 
        success: false,
        error: 'Failed to test Claude executable',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  server.app.post("/api/system/reload-claude-path", async (req, reply) => {
    try {
      const { path } = req.body as { path: string };
      
      if (!path || typeof path !== 'string') {
        return reply.code(400).send({
          success: false,
          error: 'Invalid request: path is required and must be a string'
        });
      }

      console.log(`Updating Claude path to: ${path}`);
      const updateResult = await updateClaudePath(path);
      
      if (updateResult.success) {
        reply.send({ 
          success: true,
          message: updateResult.message 
        });
      } else {
        reply.code(400).send({
          success: false,
          error: updateResult.message
        });
      }
    } catch (error) {
      console.error("Failed to update Claude path:", error);
      reply.code(500).send({ 
        success: false,
        error: 'Failed to update Claude path',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Register static file serving with caching
  server.app.register(fastifyStatic, {
    root: join(__dirname, "..", "dist"),
    prefix: "/ui/",
    maxAge: "1h",
  });

  // Redirect /ui to /ui/ for proper static file serving
  server.app.get("/ui", async (_, reply) => {
    return reply.redirect("/ui/");
  });

  return server;
};
