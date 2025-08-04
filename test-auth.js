#!/usr/bin/env node

const http = require('http');

// Test configurations
const tests = [
  {
    name: "Test 1: No authentication header",
    options: {
      hostname: 'localhost',
      port: 3456,
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    body: JSON.stringify({
      messages: [{role: 'user', content: 'test'}],
      model: 'claude-3-5-sonnet-20241022'
    })
  },
  {
    name: "Test 2: With Bearer token",
    options: {
      hostname: 'localhost',
      port: 3456,
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-api-key'
      }
    },
    body: JSON.stringify({
      messages: [{role: 'user', content: 'test'}],
      model: 'claude-3-5-sonnet-20241022'
    })
  },
  {
    name: "Test 3: With x-api-key header",
    options: {
      hostname: 'localhost',
      port: 3456,
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'test-api-key'
      }
    },
    body: JSON.stringify({
      messages: [{role: 'user', content: 'test'}],
      model: 'claude-3-5-sonnet-20241022'
    })
  }
];

function runTest(test) {
  return new Promise((resolve) => {
    console.log(`\n=== ${test.name} ===`);
    console.log('Request headers:', test.options.headers);
    
    const req = http.request(test.options, (res) => {
      console.log(`Status: ${res.statusCode}`);
      console.log('Response headers:', res.headers);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log('Response body:', data);
        resolve();
      });
    });
    
    req.on('error', (error) => {
      console.error('Request error:', error.message);
      resolve();
    });
    
    req.write(test.body);
    req.end();
  });
}

async function runAllTests() {
  console.log("Testing Claude Code Router Authentication");
  console.log("==========================================");
  
  // First check if router is running
  const checkReq = http.get('http://localhost:3456/health', (res) => {
    console.log(`Router health check: ${res.statusCode}`);
  });
  
  checkReq.on('error', (error) => {
    console.error('Router not running:', error.message);
    console.log('\nPlease start the router with: ccr start');
    process.exit(1);
  });
  
  checkReq.on('response', async () => {
    for (const test of tests) {
      await runTest(test);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  });
}

runAllTests();