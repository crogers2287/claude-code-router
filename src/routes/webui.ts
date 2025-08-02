import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const CONFIG_DIR = join(homedir(), '.claude-code-router');
const CONFIG_FILE = join(CONFIG_DIR, 'config.json');

interface ConfigRequest extends FastifyRequest {
  body: any;
}

export async function webuiRoutes(fastify: FastifyInstance) {
  console.log('🔧 Starting webui routes registration...');
  
  // Log all registered routes after setup
  fastify.ready(() => {
    console.log('Web UI Routes registered:');
    const routes = fastify.printRoutes({ commonPrefix: false });
    console.log(routes);
  });

  // Serve the web UI
  fastify.get('/ui', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Try multiple possible paths for the HTML file
      const possiblePaths = [
        join(__dirname, '../../dist/web/index.html'),
        join(__dirname, '../dist/web/index.html'),
        join(__dirname, 'dist/web/index.html'),
        join(process.cwd(), 'dist/web/index.html')
      ];
      
      let html = '';
      let found = false;
      
      for (const htmlPath of possiblePaths) {
        if (existsSync(htmlPath)) {
          html = await readFile(htmlPath, 'utf-8');
          found = true;
          break;
        }
      }
      
      if (found) {
        reply.type('text/html').send(html);
      } else {
        reply.type('text/html').send(getDefaultHTML());
      }
    } catch (error) {
      reply.type('text/html').send(getDefaultHTML());
    }
  });

  // Serve logo
  fastify.get('/logo.png', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const possiblePaths = [
        join(__dirname, '../../logo.png'),
        join(__dirname, '../logo.png'),
        join(__dirname, 'logo.png'),
        join(process.cwd(), 'logo.png'),
        join(process.cwd(), 'dist/logo.png')
      ];
      
      for (const logoPath of possiblePaths) {
        if (existsSync(logoPath)) {
          const logo = await readFile(logoPath);
          reply.type('image/png').send(logo);
          return;
        }
      }
      
      reply.code(404).send('Logo not found');
    } catch (error) {
      console.error('Error serving logo:', error);
      reply.code(404).send('Logo not found');
    }
  });

  // Serve static assets
  fastify.get('/ui/bundle.js', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Try multiple possible paths for the bundle file
      const possiblePaths = [
        join(__dirname, '../../dist/web/bundle.js'),
        join(__dirname, '../dist/web/bundle.js'), 
        join(__dirname, 'dist/web/bundle.js'),
        join(process.cwd(), 'dist/web/bundle.js')
      ];
      
      let js = '';
      let found = false;
      
      for (const jsPath of possiblePaths) {
        if (existsSync(jsPath)) {
          js = await readFile(jsPath, 'utf-8');
          found = true;
          break;
        }
      }
      
      if (found) {
        reply.type('application/javascript').send(js);
      } else {
        reply.code(404).send('Bundle not found - checked paths: ' + possiblePaths.join(', '));
      }
    } catch (error) {
      reply.code(500).send('Error loading bundle: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  });

  // API to get current configuration
  fastify.get('/api/config', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      let config = getDefaultConfig();
      
      if (existsSync(CONFIG_FILE)) {
        const fileConfig = JSON.parse(await readFile(CONFIG_FILE, 'utf-8'));
        // Merge file config with defaults to ensure all fields exist
        config = {
          ...config,
          ...fileConfig,
          Router: {
            ...config.Router,
            ...(fileConfig.Router || {})
          }
        };
      }
      
      reply.send(config);
    } catch (error) {
      reply.code(500).send({ error: 'Failed to read configuration' });
    }
  });

  // API to update configuration
  fastify.post('/api/config', async (request: ConfigRequest, reply: FastifyReply) => {
    try {
      const config = request.body;
      await writeFile(CONFIG_FILE, JSON.stringify(config, null, 2));
      
      // Trigger hot reload by restarting the server
      setTimeout(() => {
        process.emit('SIGHUP' as any);
      }, 100);
      
      reply.send({ success: true, message: 'Configuration updated successfully' });
    } catch (error) {
      reply.code(500).send({ error: 'Failed to update configuration' });
    }
  });

  // API to validate provider configuration
  fastify.post('/api/validate-provider', async (request: ConfigRequest, reply: FastifyReply) => {
    try {
      const { provider } = request.body;
      
      // Basic validation
      const errors = [];
      const warnings = [];
      
      // Required fields
      if (!provider.name || provider.name.trim() === '') {
        errors.push('Provider name is required');
      } else if (!/^[a-zA-Z0-9_-]+$/.test(provider.name)) {
        errors.push('Provider name can only contain letters, numbers, hyphens, and underscores');
      }
      
      if (!provider.api_base_url || provider.api_base_url.trim() === '') {
        errors.push('API base URL is required');
      } else {
        try {
          new URL(provider.api_base_url);
        } catch {
          errors.push('API base URL must be a valid URL');
        }
      }
      
      if (!provider.models || provider.models.length === 0) {
        errors.push('At least one model is required');
      } else {
        // Validate model names
        provider.models.forEach((model: string, index: number) => {
          if (!model || model.trim() === '') {
            errors.push(`Model ${index + 1} cannot be empty`);
          }
        });
      }

      // Warnings for common issues
      if (!provider.api_key || provider.api_key.trim() === '') {
        warnings.push('No API key provided - some providers may require authentication');
      }

      if (provider.api_base_url && provider.api_base_url.startsWith('http://')) {
        warnings.push('Using HTTP instead of HTTPS may not be secure');
      }

      const isValid = errors.length === 0;
      reply.send({ 
        valid: isValid, 
        errors: errors.length > 0 ? errors : undefined,
        warnings: warnings.length > 0 ? warnings : undefined
      });
    } catch (error) {
      reply.code(500).send({ 
        valid: false, 
        error: 'Validation failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // API to test provider connection
  fastify.post('/api/test-provider', async (request: ConfigRequest, reply: FastifyReply) => {
    try {
      const { provider } = request.body;
      
      // Simple connectivity test
      const testResult = await testProviderConnection(provider);
      reply.send(testResult);
    } catch (error) {
      reply.code(500).send({ 
        success: false, 
        error: 'Connection test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // API to get available models for a provider (especially useful for Ollama)
  fastify.post('/api/get-provider-models', async (request: ConfigRequest, reply: FastifyReply) => {
    try {
      const { provider } = request.body;
      
      const models = await getProviderModels(provider);
      reply.send({ success: true, models });
    } catch (error) {
      reply.code(500).send({ 
        success: false, 
        error: 'Failed to fetch models',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
}

async function testProviderConnection(provider: any): Promise<{ success: boolean; message: string; latency?: number }> {
  const startTime = Date.now();
  
  try {
    // Determine provider type and construct appropriate test request
    const testResult = await performProviderTest(provider);
    const latency = Date.now() - startTime;
    
    return {
      ...testResult,
      latency
    };
  } catch (error) {
    const latency = Date.now() - startTime;
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Connection failed',
      latency
    };
  }
}

async function performProviderTest(provider: any): Promise<{ success: boolean; message: string }> {
  const baseUrl = provider.api_base_url;
  const apiKey = provider.api_key;
  
  // Detect provider type based on URL patterns
  const providerType = detectProviderType(baseUrl);
  
  try {
    switch (providerType) {
      case 'gemini':
        return await testGeminiProvider(baseUrl, apiKey);
      case 'anthropic':
        return await testAnthropicProvider(baseUrl, apiKey);
      case 'ollama':
        return await testOllamaProvider(baseUrl, apiKey);
      case 'openai_compatible':
      default:
        return await testOpenAICompatibleProvider(baseUrl, apiKey);
    }
  } catch (error) {
    if (error instanceof Error) {
      // Categorize common error types
      if (error.message.includes('timeout') || error.message.includes('ECONNREFUSED')) {
        return {
          success: false,
          message: 'Connection timeout - check if the service is running and URL is correct'
        };
      } else if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        return {
          success: false,
          message: 'Authentication failed - check your API key'
        };
      } else if (error.message.includes('403') || error.message.includes('Forbidden')) {
        return {
          success: false,
          message: 'Access forbidden - check API key permissions'
        };
      } else if (error.message.includes('404')) {
        return {
          success: false,
          message: 'API endpoint not found - check your base URL'
        };
      } else if (error.message.includes('429')) {
        return {
          success: false,
          message: 'Rate limited - try again later'
        };
      } else if (error.message.includes('500') || error.message.includes('502') || error.message.includes('503')) {
        return {
          success: false,
          message: 'Server error - the API service may be temporarily unavailable'
        };
      }
    }
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown connection error'
    };
  }
}

function detectProviderType(baseUrl: string): string {
  const url = baseUrl.toLowerCase();
  
  if (url.includes('generativelanguage.googleapis.com')) {
    return 'gemini';
  } else if (url.includes('api.anthropic.com')) {
    return 'anthropic';
  } else if (url.includes('localhost:11434') || url.includes('127.0.0.1:11434') || url.includes(':11434') || url.includes('ollama')) {
    return 'ollama';
  }
  // Default to OpenAI-compatible for most other providers
  return 'openai_compatible';
}

async function testGeminiProvider(baseUrl: string, apiKey: string): Promise<{ success: boolean; message: string }> {
  // For Gemini, we test by listing models
  const testUrl = baseUrl.endsWith('/') ? `${baseUrl}?key=${apiKey}` : `${baseUrl}?key=${apiKey}`;
  
  const response = await fetch(testUrl, {
    method: 'GET',
    headers: {
      'User-Agent': 'claude-code-router-test'
    },
    signal: AbortSignal.timeout(10000)
  });
  
  if (response.ok) {
    const data = await response.json();
    if (data.models && Array.isArray(data.models)) {
      return {
        success: true,
        message: `Connection successful - found ${data.models.length} models`
      };
    } else {
      return {
        success: true,
        message: 'Connection successful'
      };
    }
  } else {
    const errorText = await response.text().catch(() => response.statusText);
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }
}

async function testAnthropicProvider(baseUrl: string, apiKey: string): Promise<{ success: boolean; message: string }> {
  // For Anthropic, we send a minimal test message
  const testUrl = baseUrl.endsWith('/messages') ? baseUrl : `${baseUrl}/messages`;
  
  const response = await fetch(testUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'User-Agent': 'claude-code-router-test'
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1,
      messages: [{ role: 'user', content: 'Hi' }]
    }),
    signal: AbortSignal.timeout(10000)
  });
  
  if (response.ok) {
    return {
      success: true,
      message: 'Connection and authentication successful'
    };
  } else if (response.status === 400) {
    // A 400 error might indicate the API is working but we sent an invalid request
    // This is actually good - it means we can reach the API
    const errorText = await response.text().catch(() => '');
    if (errorText.includes('model') || errorText.includes('max_tokens')) {
      return {
        success: true,
        message: 'Connection successful (API reachable and responding)'
      };
    }
  }
  
  const errorText = await response.text().catch(() => response.statusText);
  throw new Error(`HTTP ${response.status}: ${errorText}`);
}

async function testOllamaProvider(baseUrl: string, apiKey: string): Promise<{ success: boolean; message: string }> {
  // For Ollama, first try to get available models to use a real model name
  try {
    const models = await getOllamaModels(baseUrl);
    if (models.length === 0) {
      return {
        success: false,
        message: 'Ollama is running but no models are installed. Run "ollama pull <model-name>" to install a model.'
      };
    }
    
    // Since we successfully got models from Ollama, we know it's working
    // Test the chat completions endpoint with an invalid model to verify it's available
    const testUrl = baseUrl.endsWith('/chat/completions') ? baseUrl : 
                    baseUrl.endsWith('/') ? `${baseUrl}v1/chat/completions` : `${baseUrl}/v1/chat/completions`;
    
    const response = await fetch(testUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'claude-code-router-test'
      },
      body: JSON.stringify({
        model: 'invalid-test-model',
        messages: [{ role: 'user', content: 'Hi' }],
        max_tokens: 1,
        stream: false
      }),
      signal: AbortSignal.timeout(5000) // Quick check for endpoint availability
    });
    
    // We expect this to return an error, but that proves the endpoint exists
    const errorText = await response.text().catch(() => response.statusText);
    if (errorText.includes('model') || errorText.includes('not found') || response.status === 404) {
      return {
        success: true,
        message: `Connection successful - found ${models.length} available models`
      };
    } else if (response.ok) {
      // Unexpected success, but still good
      return {
        success: true,
        message: `Connection successful - found ${models.length} available models`
      };
    } else {
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED')) {
        return {
          success: false,
          message: 'Connection failed - is Ollama running? Start it with "ollama serve"'
        };
      } else if (error.message.includes('timeout')) {
        return {
          success: false,
          message: 'Connection timeout - Ollama may be slow to respond or overloaded'
        };
      }
    }
    throw error;
  }
}

async function testOpenAICompatibleProvider(baseUrl: string, apiKey: string): Promise<{ success: boolean; message: string }> {
  // For OpenAI-compatible APIs, we send a minimal chat completion request
  const testUrl = baseUrl.endsWith('/chat/completions') ? baseUrl : 
                  baseUrl.endsWith('/') ? `${baseUrl}chat/completions` : `${baseUrl}/chat/completions`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'User-Agent': 'claude-code-router-test'
  };
  
  // Add authorization header if API key is provided
  if (apiKey && apiKey.trim() !== '' && apiKey !== 'ollama') {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }
  
  const response = await fetch(testUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: 'test-model-that-likely-does-not-exist',
      messages: [{ role: 'user', content: 'Hi' }],
      max_tokens: 1,
      stream: false
    }),
    signal: AbortSignal.timeout(10000)
  });
  
  if (response.ok) {
    return {
      success: true,
      message: 'Connection and authentication successful'
    };
  } else if (response.status === 400 || response.status === 422) {
    // A 400/422 error might indicate the API is working but we sent an invalid model name
    const errorText = await response.text().catch(() => '');
    if (errorText.includes('model') || errorText.includes('not found') || errorText.includes('does not exist') || 
        errorText.includes('invalid') || errorText.includes('unknown') || errorText.includes('Permission denied') ||
        errorText.includes('resource_not_found')) {
      return {
        success: true,
        message: 'Connection successful (API reachable and responding correctly)'
      };
    }
  } else if (response.status === 404) {
    // Check if this is a model not found error (API working) or endpoint not found error
    const errorText = await response.text().catch(() => '');
    if (errorText.includes('model') || errorText.includes('not found') || errorText.includes('does not exist') || 
        errorText.includes('invalid') || errorText.includes('unknown') || errorText.includes('Permission denied') ||
        errorText.includes('resource_not_found')) {
      return {
        success: true,
        message: 'Connection successful (API reachable and responding correctly)'
      };
    }
    
    // Try alternative endpoint for some providers
    const alternativeUrl = baseUrl.endsWith('/v1/chat/completions') ? 
                          baseUrl.replace('/v1/chat/completions', '/chat/completions') :
                          baseUrl.replace('/chat/completions', '/v1/chat/completions');
    
    if (alternativeUrl !== testUrl) {
      try {
        const altResponse = await fetch(alternativeUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            model: 'test-model-that-likely-does-not-exist',
            messages: [{ role: 'user', content: 'Hi' }],
            max_tokens: 1,
            stream: false
          }),
          signal: AbortSignal.timeout(5000)
        });
        
        if (altResponse.ok || altResponse.status === 400) {
          return {
            success: true,
            message: `Connection successful (try using ${alternativeUrl} as your base URL)`
          };
        }
      } catch {
        // Ignore alternative URL test failure
      }
    }
  }
  
  const errorText = await response.text().catch(() => response.statusText);
  throw new Error(`HTTP ${response.status}: ${errorText}`);
}

function getDefaultHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Claude Code Router - Configuration</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        .header {
            text-align: center;
            color: white;
            margin-bottom: 2rem;
        }
        .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            padding: 2rem;
            margin-bottom: 2rem;
        }
        .loading {
            text-align: center;
            padding: 4rem;
            color: #666;
        }
        .spinner {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #667eea;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div id="loading-container" class="container">
        <div class="header">
            <h1>Claude Code Router</h1>
            <p>Configuration Management Interface</p>
        </div>
        <div class="card">
            <div class="loading">
                <div class="spinner"></div>
                <p>Loading configuration interface...</p>
                <p style="margin-top: 1rem; font-size: 0.9em; color: #888;">
                    If this message persists, please run <code>npm run build:ui</code> to build the interface.
                </p>
            </div>
        </div>
    </div>
    <div id="root"></div>
    <script src="/ui/bundle.js"></script>
    <script>
        // Hide loading message when React app mounts
        const observer = new MutationObserver(function(mutations) {
            const root = document.getElementById('root');
            if (root && root.children.length > 0) {
                const loadingContainer = document.getElementById('loading-container');
                if (loadingContainer) {
                    loadingContainer.style.display = 'none';
                }
                observer.disconnect();
            }
        });
        
        observer.observe(document.getElementById('root'), {
            childList: true,
            subtree: true
        });
        
        // Fallback: hide loading after 5 seconds
        setTimeout(function() {
            const loadingContainer = document.getElementById('loading-container');
            if (loadingContainer) {
                loadingContainer.style.display = 'none';
            }
        }, 5000);
    </script>
</body>
</html>`;
}

async function getProviderModels(provider: any): Promise<string[]> {
  const baseUrl = provider.api_base_url;
  const providerType = detectProviderType(baseUrl);
  
  switch (providerType) {
    case 'ollama':
      return await getOllamaModels(baseUrl);
    case 'gemini':
      return await getGeminiModels(baseUrl, provider.api_key);
    default:
      // For other providers, return the configured models
      return provider.models || [];
  }
}

async function getOllamaModels(baseUrl: string): Promise<string[]> {
  try {
    // Extract base URL without the chat completions path
    const apiBase = baseUrl.replace(/\/v1\/chat\/completions$/, '').replace(/\/chat\/completions$/, '');
    const tagsUrl = apiBase.endsWith('/') ? `${apiBase}api/tags` : `${apiBase}/api/tags`;
    
    const response = await fetch(tagsUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'claude-code-router-test'
      },
      signal: AbortSignal.timeout(10000)
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.models && Array.isArray(data.models)) {
        return data.models.map((model: any) => model.name || model.model).filter(Boolean);
      }
    }
    
    return [];
  } catch (error) {
    console.error('Failed to fetch Ollama models:', error);
    return [];
  }
}

async function getGeminiModels(baseUrl: string, apiKey: string): Promise<string[]> {
  try {
    const modelsUrl = baseUrl.endsWith('/') ? `${baseUrl}?key=${apiKey}` : `${baseUrl}?key=${apiKey}`;
    
    const response = await fetch(modelsUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'claude-code-router-test'
      },
      signal: AbortSignal.timeout(10000)
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.models && Array.isArray(data.models)) {
        return data.models.map((model: any) => model.name).filter(Boolean);
      }
    }
    
    return [];
  } catch (error) {
    console.error('Failed to fetch Gemini models:', error);
    return [];
  }
}

function getDefaultConfig() {
  return {
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
  };
}