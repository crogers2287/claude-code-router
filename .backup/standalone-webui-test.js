#!/usr/bin/env node
// Standalone test server to verify web UI API endpoints
const fastify = require('fastify');

// Inline the essential parts of webuiRoutes for testing
async function testWebuiRoutes(fastify) {
  console.log('🔧 Starting webui routes registration...');
  
  // Test API endpoints
  fastify.get('/api/config', async (request, reply) => {
    console.log('GET /api/config called');
    reply.send({
      "Providers": [],
      "Router": {
        "default": "",
        "background": "",
        "think": "",
        "longContext": "",
        "longContextThreshold": 60000,
        "webSearch": ""
      },
      "APIKEY": "",
      "HOST": "127.0.0.1",
      "API_TIMEOUT_MS": 600000
    });
  });

  fastify.post('/api/test-provider', async (request, reply) => {
    console.log('POST /api/test-provider called with:', request.body);
    const { provider } = request.body;
    
    // Simple test response
    reply.send({
      success: true,
      message: 'Test endpoint working',
      provider: provider ? provider.name : 'unknown'
    });
  });

  fastify.get('/ui', async (request, reply) => {
    console.log('GET /ui called');
    reply.type('text/html').send('<html><body><h1>Test Web UI</h1><p>This is a test page</p></body></html>');
  });
}

async function startTestServer() {
  const server = fastify({ logger: false });
  
  await testWebuiRoutes(server);
  
  try {
    await server.listen({ port: 3457, host: '127.0.0.1' });
    console.log('🌐 Test Web UI server listening on http://127.0.0.1:3457');
    console.log('Available endpoints:');
    console.log('- GET  http://127.0.0.1:3457/ui');
    console.log('- GET  http://127.0.0.1:3457/api/config');
    console.log('- POST http://127.0.0.1:3457/api/test-provider');
    
    // Keep the server running
    process.on('SIGINT', async () => {
      console.log('Shutting down test server...');
      await server.close();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('Failed to start test server:', error);
    process.exit(1);
  }
}

startTestServer();