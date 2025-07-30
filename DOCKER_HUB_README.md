# Claude Code Router - Web UI Edition 🌐

**Repository**: `crogers2287/claude-code-router`
**

## 📋 Overview

The most user-friendly Docker image for **Claude Code Router** - route Claude Code requests to different AI models with a beautiful web interface. No more JSON configuration files!

## 🚀 **1-Command Launch**

```bash
docker run -d -p 3457:3457 crogers2287/claude-code-router:latest
```

**Then visit**: `http://localhost:3457/ui` for visual configuration!

## ✨ **Key Features**

### 🖥️ **Web Interface (Host:3457)**
- **Visual Provider Management**: Add OpenAI, Anthropic, DeepSeek, etc. via web UI
- **Interactive Model Selection**: Browse and select models visually  
- **Real-time Monitoring**: Live logs, errors, and performance metrics
- **Cost Analytics**: Track spending across providers
- **Drag-and-Drop Routing**: Configure routing rules visually

### 📡 **API Endpoints (Host:3000)**
- Full Claude Code API compatibility
- RESTful configuration management
- WebSocket support for real-time updates
- Health checks and metrics

## 🐳 **Quick Start Guide**

### **Basic Usage**
```bash
# Quick start - everything included
docker run -d \
  --name claude-code-router \
  -p 3457:3457 \
  crogers2287/claude-code-router:latest

# Access web interface
curl http://localhost:3457/ui
```

### **Production Setup**
```bash
# With API keys via web UI (recommended)
docker run -d \
  -p 3457:3457 \
  -e WEB_UI_PORT=3457 \
  -e PORT=3000 \
  crogers2287/claude-code-router:latest

# Configure through web interface
open http://localhost:3457/ui
```

### **Docker Compose (Recommended)**
```yaml
version: '3.8'
services:
  claude-router:
    image: crogers2287/claude-code-router:latest
    ports:
      - "3457:3457"  # Web UI  
      - "3000:3000"  # API
    environment:
      - NODE_ENV=production
    volumes:
      - ./config:/app/config
    restart: unless-stopped
```

## 📸 **Web Interface Screenshots**

### **🏠 Main Dashboard**
Access everything from a central hub:
- ✅ Add providers with API keys
- ⚙️ Configure routing rules  
- 📊 Monitor live metrics
- 🔧 Quick setup wizards

### **🎯 Provider Configuration**
Visual provider management:
- 🖱️ Point-and-click provider addition
- 🔍 Real-time connection testing
- 📋 Model discovery and selection
- 💰 Cost estimation

### **📈 Live Monitoring**
Real-time insights:
- 📊 Performance metrics
- 💸 Cost tracking
- 🔴 Error alerts
- 📋 Request history

## 🔧 **Configuration Options**

### **Environment Variables**
| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | API server port |
| `WEB_UI_PORT` | `3457` | Web interface port |
| `LOG_LEVEL` | `info` | Logging level |
| `APIKEY` | `` | Optional security key |
| `API_TIMEOUT_MS` | `600000` | Request timeout |

### **Volume Mounts**
```bash
# Persistent configuration
-v ./config:/app/config:ro

# Persistent logs  
-v ./logs:/app/logs
```

## 🎯 **Supported Providers**

Add these through the web UI instantly:

### **Premium APIs**
- **🔴 Anthropic** (Claude series)
- **🟢 OpenAI** (GPT models)
- **🔵 Google** (Gemini series)
- **🟣 OpenRouter** (Multi-provider)

### **Budget Options**
- **🟤 DeepSeek** (High quality, low cost)
- **🟠 Ollama** (Self-hosted)
- **⚡ Volcengine** (Chinese providers)

## 🚀 **Getting Started - Step by Step**

### **1. 🐳 Launch Container**
```bash
docker run -d -p 3457:3457 crogers2287/claude-code-router:latest
```

### **2. 🌐 Configure via Web UI**
1. Open `http://localhost:3457/ui`
2. Click "Add Provider"
3. Select provider (OpenAI, Anthropic, etc.)
4. Paste API key and test connection
5. Configure routing rules visually

### **3. 🎯 Ready to Use!**
```bash
# Through Docker commandccdocker exec claude-code-router ccr code "analyze this code"

# Or use API endpoint
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "help refactor this"}]}'
```

## 📊 **Performance Metrics**

### **System Requirements**
- **CPU**: 0.5 cores minimum, 1 core recommended
- **RAM**: 512MB minimum, 1GB recommended
- **Storage**: 100MB app + config
- **Network**: Stable internet for API calls

### **Image Tags**
| Tag | Description | Size |
|-----|-------------|------|
| `latest` | Full web UI + API | ~150MB |
| `alpine` | Lightweight | ~80MB |
| `minimal` | CLI only | ~50MB |

## 🤝 **Docker Hub Integration**

### **GitHub Actions Integration**
Automatically built from GitHub:
- ✅ Multi-platform support (amd64, arm64)
- ✅ Automated security updates
- ✅ Stable release tagging
- ✅ Latest features included

### **Community Support**
- **💬 GitHub Issues**: [Report issues](https://github.com/crogers2287/claude-code-router/issues)
- **📖 Documentation**: [Complete docs](https://github.com/crogers2287/claude-code-router/tree/main/docs)
- **💬 Discussions**: [Join discussions](https://github.com/crogers2287/claude-code-router/discussions)

## 🐳 **Quick Commands**

### **Essential Commands**
```bash
# Check running container
docker ps | grep claude-code-router

# View logs &l.st
```