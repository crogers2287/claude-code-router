#!/usr/bin/env node
const fastify = require('fastify');
const { webuiRoutes } = require('./dist/routes/webui');

async function testWebServer() {
  console.log('Testing web server startup...');
  
  const webServer = fastify({ logger: true });
  
  try {
    // Register web UI routes
    await webuiRoutes(webServer);
    console.log('Routes registered successfully');
    
    // Try to start the server
    const host = '127.0.0.1';
    const port = 3457;
    
    await webServer.listen({ port, host });
    console.log(`🌐 Web UI server listening on http://${host}:${port}/ui`);
    
    // Keep running
    process.on('SIGINT', async () => {
      console.log('Shutting down...');
      await webServer.close();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('Failed to start web UI server:', error);
    console.error('Error details:', error.stack);
    process.exit(1);
  }
}

testWebServer();