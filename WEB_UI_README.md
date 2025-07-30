# Claude Code Router - Web UI Configuration

🎉 **New Feature**: Beautiful web-based configuration interface for managing your Claude Code Router setup!

## Quick Start

1. **Start the router service:**
   ```bash
   ccr start
   ```

2. **Open the web configuration interface:**
   ```bash
   ccr ui
   ```
   
   This will automatically open your browser to `http://localhost:3456/ui`

## Features

### 🔌 Provider Management
- **Quick Setup Templates**: Pre-configured templates for popular providers:
  - OpenRouter (multi-model access)
  - Ollama (local models)
  - Google Gemini
  - DeepSeek (reasoning models)
  - Moonshot AI
  - Z.ai
  - OpenAI
  - Anthropic
  - And many more!

- **Custom Providers**: Add any OpenAI-compatible API
- **Provider Testing**: Test connectivity and latency to your providers
- **Model Management**: Configure multiple models per provider

### 🔀 Intelligent Routing
Configure smart routing rules for different scenarios:
- **Default Route**: Primary model for most requests
- **Background Route**: Fast model for background tasks (auto-triggered by claude-3-5-haiku)
- **Thinking Route**: Reasoning model for complex tasks
- **Long Context Route**: Large context model (auto-triggered by token count)
- **Web Search Route**: Model optimized for web search tasks

### 🧪 Testing Panel
- **Connection Testing**: Test all providers with one click
- **Latency Monitoring**: See response times for each provider
- **Route Overview**: Visualize your current routing configuration

### ⚡ Hot Reload
- **Automatic Reload**: Changes are automatically applied when saved
- **No Restart Required**: The router service updates configuration in real-time

## Provider Templates

The web UI includes pre-configured templates for these popular providers:

| Provider | Models | Features |
|----------|--------|----------|
| **OpenRouter** | GPT-4, Claude, Gemini, DeepSeek | Multi-provider access |
| **Ollama** | Qwen, Llama, CodeLlama | Local models |
| **Google Gemini** | Gemini 2.5 Pro/Flash | Google's latest models |
| **DeepSeek** | DeepSeek Chat/Reasoner | Advanced reasoning |
| **Moonshot** | Moonshot v1 variants | Chinese LLM provider |
| **Z.ai** | Z1 Preview | Latest reasoning model |
| **OpenAI** | GPT-4o, o1 models | Official OpenAI API |
| **Anthropic** | Claude 3.5 Sonnet/Haiku | Direct Anthropic access |

## Configuration Management

### Global Settings
- **API Key**: Authentication key for the router API
- **Host**: Server binding address (127.0.0.1 for local, 0.0.0.0 for network access)
- **Timeout**: Maximum API response time

### Provider Configuration
- **Name**: Unique identifier for the provider
- **API URL**: Endpoint for the LLM API
- **API Key**: Provider authentication (if required)
- **Models**: List of available models
- **Transformers**: Special processing rules for different APIs

### Routing Rules
- **Token Threshold**: Switch to long context model when conversation exceeds this limit
- **Auto-routing**: Intelligent model selection based on request type
- **Custom Logic**: Support for custom JavaScript routing functions

## Usage Examples

### Setting up OpenRouter
1. Click "Add Provider" → Select "OpenRouter" template
2. Enter your OpenRouter API key
3. Save the configuration
4. Set as default route in "Routing Rules"

### Adding a Local Ollama Instance
1. Click "Add Provider" → Select "Ollama" template
2. Verify the API URL (default: http://localhost:11434/v1/chat/completions)
3. Add your installed models
4. Test connectivity

### Configuring Smart Routing
1. Go to "Routing Rules" tab
2. Set different models for different scenarios:
   - Default: `openrouter,anthropic/claude-3.5-sonnet`
   - Background: `ollama,qwen2.5-coder:latest`
   - Thinking: `deepseek,deepseek-reasoner`
   - Long Context: `openrouter,google/gemini-2.5-pro-preview`

## Command Line Integration

The web UI works seamlessly with existing CLI commands:

```bash
# Start the service
ccr start

# Open web configuration
ccr ui

# Use Claude Code normally - it will use your web-configured settings
ccr code "Write a Python script to analyze data"

# Check status
ccr status

# Stop the service
ccr stop
```

## Benefits

### ✅ Easy Configuration
- Visual interface eliminates JSON editing
- Templates for popular providers
- Real-time validation and testing

### ✅ Better Management
- See all providers and models at a glance
- Test connectivity before using
- Configure complex routing rules visually

### ✅ Improved Reliability
- Validation prevents configuration errors
- Hot reload means no service interruptions
- Connection testing identifies issues early

### ✅ Enhanced Monitoring
- Visual status indicators
- Latency monitoring
- Configuration overview

## Troubleshooting

### Web UI Not Loading
```bash
# Rebuild the UI
npm run build:ui

# Check if service is running
ccr status

# Restart the service
ccr restart
```

### Configuration Not Saving
- Check the API key is set in Global Configuration
- Verify the service has write permissions to ~/.claude-code-router/
- Look for validation errors in the provider configuration

### Provider Connection Issues
- Use the "Test" button to diagnose connectivity
- Verify API keys and URLs
- Check firewall settings for local providers

## Next Steps

1. **Configure your providers** using the templates or custom settings
2. **Set up routing rules** to optimize model selection
3. **Test your configuration** using the testing panel
4. **Start using Claude Code** with your optimized setup!

The web UI makes it easy to experiment with different providers and routing strategies to find the perfect setup for your needs.