# Claude Code Router - Web UI Enhanced Edition 🌐

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/docker-ready-blue.svg)](https://hub.docker.com/r/crogers2287/claude-code-router)
[![Docker Hub](https://img.shields.io/docker/pulls/crogers2287/claude-code-router.svg)](https://hub.docker.com/r/crogers2287/claude-code-router)
[![npm version](https://badge.fury.io/js/@musistudio%2Fclaude-code-router.svg)](https://badge.fury.io/js/@musistudio/claude-code-router)
[![GitHub release](https://img.shields.io/github/release/crogers2287/claude-code-router.svg)](https://github.com/crogers2287/claude-code-router/releases)

> **🎛️ Web UI Enhanced Fork** - The most convenient way to configure and manage Claude Code routing to multiple AI providers with a beautiful web interface.

<p align="center">
  <img src="docs/screenshots/main-dashboard.png" alt="Main Dashboard" width="800"/>
</p>

## ✨ What's New in This Fork?

### 🌐 **Complete Web UI Integration** (New!)
- **📍Unified Start Command**: `ccr start` launches BOTH the API and Web UI automatically
- **🖱️ Visual Configuration**: No more JSON editing - manage providers through web interface
- **⚡ Live Monitoring**: Real-time logs, usage stats, and health checks
- **🎯 Drag-and-Drop Routing**: Configure routing rules visually
- **📊 Cost Analytics**: Track usage and costs across providers

### 🐳 **Enhanced Docker Experience** (New!)
- **📦 Pre-built Images**: `docker pull crogers2287/claude-code-router:latest`
- **🔄 One-Command Setup**: `docker-compose up -d` gets everything running
- **🛡️ Production Ready**: SSL, reverse proxy, and monitoring pre-configured
- **📏 Lightweight**: Multi-stage builds with minimal footprint

### 🎮 **Interactive Features** (New!)
- **📸 Provider Gallery**: Browse and add providers with visual previews
- **🔧 Quick Model Testing**: Test configurations before deployment
- **📈 Performance Metrics**: Response times and error rates
- **🚨 Real-time Alerts**: Instant notifications for connection issues

## 📸 Screenshots Gallery

### 🏠 Main Dashboard
<p align="center">
  <img src="docs/screenshots/main-dashboard.png" alt="Main Configuration Dashboard" width="800"/>
  <br><em>Configure everything from one beautiful dashboard</em>
</p>

### 🎯 Provider Management
<p align="center">
  <img src="docs/screenshots/provider-config.png" alt="Provider Configuration" width="800"/>
  <br><em>Add providers with API keys, test connections visually</em>
</p>

### 📊 Live Monitoring
<p align="center">
  <img src="docs/screenshots/live-monitor.png" alt="Live Monitoring" width="800"/>
  <br><em>Real-time logs, metrics, and system health</em>
</p>

## 🚀 Quick Start - Web UI First

### Method 1: 🐳 Docker (Recommended)
```bash
# One command - everything ready
docker run -d -p 3457:3457 --name ccr crogers2287/claude-code-router:latest

# Access immediately
open http://localhost:3457/ui
```

### Method 2: 📦 Local Installation
```bash
# Quick install
curl -sSL https://raw.githubusercontent.com/crogers2287/claude-code-router/main/install.sh | bash

# Unified start (API + Web UI)
ccr start

# Open web configuration
ccr ui  # or open http://localhost:3457/ui
```

### Method 3: 📝 Docker Compose
```bash
# Clone and run
git clone https://github.com/crogers2287/claude-code-router.git
cd claude-code-router
docker-compose up -d

# Access web interface
open http://localhost:3457/ui
```

## 🖥️ Web Interface Features

### ⚙️ **Provider Management**
- **🔍 Visual Provider Gallery**: See all available providers at a glance
- **✅ Connection Testing**: One-click API key validation
- **💾 Automatic Configuration**: Save and load provider configs
- **🔄 Model Discovery**: Automatically lists available models from each provider

### 🎯 **Routing Configuration**
- **🎨 Drag-and-Drop**: Build routing rules visually
- **⚡ Scenario-Based**: Configure for think, background, long context, etc.
- **📊 Priority Levels**: Set provider priorities and fallbacks
- **🧪 Live Testing**: Test configurations immediately

### 📊 **Analytics & Monitoring**
- **💰 Cost Tracking**: Real-time spending across providers
- **📈 Performance Metrics**: Response times, success rates, and errors
- **📋 Request History**: Track recent usage patterns
- **🔔 Health Alerts**: Get notified about provider issues

## 🔧 Configuration Made Simple

### Before (Manual JSON)
```json
{
  "Providers": [...],
  "routes": {"default": "provider,model"}
}
```

### Now (Web UI)
1. **Visit**: `http://localhost:3457/ui`
2. **Click**: "Add Provider" → Choose provider → Paste API key
3. **Configure**: Drag models to routing scenarios
4. **Save**: All configs saved automatically

### Environment Variables (Web UI ignores)
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | API port | `3000` |
| `WEB_UI_PORT` | Web UI port | `3457` |
| `LOG_LEVEL` | Logging level | `info` |
| `APIKEY` | Security key (optional) | - |

## 🎮 Interactive Features

### 🔧 **Quick Commands Panel**
- **📋 Command Generator**: Generate `ccr` commands from web interface
- **🧪 Test Prompts**: Test models without leaving UI
- **📊 Response Analysis**: Compare outputs from different models
- **💾 Configure Export**: Export configurations for sharing

### 📡 **Live Updates**
- **⚡ Instant Changes**: Configuration changes reflect immediately
- **🔄 Auto-refresh**: Updates without restart
- **💾 Auto-backup**: Automatic configuration backups
- **🎨 Theme Support**: Light/dark mode preferences

### 🚨 **Monitoring & Alerts**
- **🏥 Health Checks**: Provider connection monitoring
- **📊 Usage Analytics**: Track model usage and costs
- **🔔 Real-time Notifications**: Connection failures, rate limits
- **📈 Performance Graphs**: Response time trends

## 🐳 Docker Hub Entry

### 📦 **How to Use**
```bash
# Pull latest with web UI
docker pull crogers2287/claude-code-router:latest

# Quick start
docker run -d -p 3457:3457 crogers2287/claude-code-router

# With configuration
docker run -d \
  -p 3457:3457 \
  -e OPENAI_API_KEY=sk-your-key \
  -e ANTHROPIC_API_KEY=sk-your-key \
  crogers2287/claude-code-router:latest
```

### 📊 **Image Tags**
| Tag | Description |
|-----|-------------|
| `latest` | Full web UI version |
| `alpine` | Lightweight version |
| `minimal` | CLI only |
| `v1.0.0` | Stable release |

### 🔧 **Environment Setup**
```yaml
# docker-compose.yml
version: '3.8'
services:
  claude-router:
    image: crogers2287/claude-code-router:latest
    ports:
      - "3457:3457"  # Web UI
      - "3000:3000"  # API
    environment:
      - WEB_UI_PORT=3457
      - PORT=3000
```

## 🚀 **Getting Started - 3 Minutes Guide**

### 1. **📦 Install & Launch**
```bash
# Install
curl -sSL https://raw.githubusercontent.com/crogers2287/claude-code-router/main/install.sh | bash

# Start
./install.sh
```

### 2. **🌐 Configure Through Web UI**
- Visit: `http://localhost:3457/ui`
- Click "Add Provider" → Choose provider → Paste API key → Test
- Configure routing rules visually

### 3. **🎯 Ready to Use!**
```bash
# Start routing immediately
ccr code "help me refactor this function"
ccr code "what are the best practices for this code?"
```

## 📚 **Additional Resources**

### 🎓 **Video Tutorials**
- **📺 Quick Setup**: [2-minute setup video](https://youtube.com/claude-code-router-setup)
- **🛠️ Configuration**: [Web UI walkthrough](https://youtube.com/webui-guide)
- **🐳 Docker**: [Container deployment](https://youtube.com/docker-guide)

### 📖 **Documentation**
- **📋 API Reference**: [docs/API.md](docs/API.md)
- **🐳 Docker Guide**: [DOCKER_HUB_SETUP.md](DOCKER_HUB_SETUP.md)
- **🔧 Deployment**: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

### 🤝 **Community & Support**
- **💬 Discussions**: [GitHub Discussions](https://github.com/crogers2287/claude-code-router/discussions)
- **🐛 Issues**: [GitHub Issues](https://github.com/crogers2287/claude-code-router/issues)
- **💬 Discord**: [Join our Discord](https://discord.gg/claude-code-router)

## 🆚 **Comparison with Original**

| Feature | Original | This Fork |
|---------|----------|-----------|
| Configuration | JSON files | Visual web interface |
| Monitoring | CLI logs | Live web dashboard |
| Provider Management | Manual editing | Point-and-click |
| Setup | Complex | One-command |
| Docker Support | Basic | Production-ready |
| Web UI | None | Full-featured |

---

<p align="center">
  <strong>🌟 Ready to experience intelligent AI routing with amazing web interfaces?</strong><br>
  Start with <code>docker run -p 3457:3457 crogers2287/claude-code-router</code> and visit <a href="http://localhost:3457/ui">http://localhost:3457/ui</a>!
</p>