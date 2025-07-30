#!/usr/bin/env node

// Quick test script to verify the new provider testing functionality
const { testProviderConnection, performProviderTest, detectProviderType, testGeminiProvider, testAnthropicProvider, testOpenAICompatibleProvider } = require('./dist/cli.js');

// Test provider configurations
const testProviders = [
  {
    name: 'ollama-local',
    api_base_url: 'http://localhost:11434/v1/chat/completions',
    api_key: 'ollama'
  },
  {
    name: 'openrouter',
    api_base_url: 'https://openrouter.ai/api/v1/chat/completions',
    api_key: 'fake-key-for-testing'
  },
  {
    name: 'gemini',
    api_base_url: 'https://generativelanguage.googleapis.com/v1beta/models/',
    api_key: 'fake-key-for-testing'
  },
  {
    name: 'deepseek',
    api_base_url: 'https://api.deepseek.com/chat/completions',
    api_key: 'fake-key-for-testing'
  }
];

async function testProviders() {
  console.log('Testing provider connection functionality...\n');
  
  for (const provider of testProviders) {
    console.log(`Testing provider: ${provider.name}`);
    console.log(`URL: ${provider.api_base_url}`);
    
    try {
      // This should not crash and should return reasonable error messages
      const result = await fetch('http://localhost:8080/api/test-provider', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ provider })
      });
      
      const data = await result.json();
      console.log(`Result: ${data.success ? 'SUCCESS' : 'FAILED'}`);
      console.log(`Message: ${data.message}`);
      if (data.latency) {
        console.log(`Latency: ${data.latency}ms`);
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
    
    console.log('---\n');
  }
}

// Note: This test requires the server to be running
// Run with: node test-provider-connections.js
console.log('Note: This requires the CCR server to be running on localhost:8080');
console.log('Start with: ccr start\n');

testProviders().catch(console.error);