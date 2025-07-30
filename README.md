# Claude Code Router

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/docker-ready-blue.svg)](https://hub.docker.com/r/musistudio/claude-code-router)
[![npm version](https://badge.fury.io/js/@musistudio%2Fclaude-code-router.svg)](https://badge.fury.io/js/@musistudio%2Fclaude-code-router)

A powerful tool to route Claude Code requests to different models and customize any request.

[中文版](README_zh.md) | [Documentation](https://claude-code-router.musistudio.com)

![](blog/images/claude-code.png)

## 🚀 Quick Start

The fastest way to get started is using Docker:

```bash
# 1. Clone the repository
git clone https://github.com/musistudio/claude-code-router.git
cd claude-code-router

# 2. Run the installation script
./install.sh

# 3. Access the web interface
open http://localhost:3001
```

## ✨ Features

- **Model Routing**: Route requests to different models based on your needs (e.g., background tasks, thinking, long context)
- **Multi-Provider Support**: Supports various model providers like OpenRouter, DeepSeek, Ollama, Gemini, Volcengine, and SiliconFlow
- **Request/Response Transformation**: Customize requests and responses for different providers using transformers
- **Dynamic Model Switching**: Switch models on-the-fly within Claude Code using the `/model` command
- **GitHub Actions Integration**: Trigger Claude Code tasks in your GitHub workflows
- **Plugin System**: Extend functionality with custom transformers
- **Docker Support**: Easy deployment with Docker containers
- **Web UI**: Modern web interface for configuration and monitoring
- **Real-time Logs**: View logs in real-time through web interface

## 📦 Installation Options

### Option 1: Automated Installation (Recommended)

```bash
curl -sSL https://raw.githubusercontent.com/musistudio/claude-code-router/main/install.sh | bash
```

### Option 2: Docker Installation

```bash
# Using Docker Compose
docker-compose up -d

# Using plain Docker
docker build -t claude-code-router .
docker run -p 3000:3000 -p 3001:3001 claude-code-router
```

### Option 3: Binary Installation

```bash
# Download the latest release
wget https://github.com/musistudio/claude-code-router/releases/latest/download/ccr-linux
chmod +x ccr-linux
sudo mv ccr-linux /usr/local/bin/ccr

# Or using npm
npm install -g @musistudio/claude-code-router
```

### Option 4: Development Setup

```bash
git clone https://github.com/musistudio/claude-code-router.git
cd claude-code-router
npm install
npm run build
ccr start
```

## ⚙️ Configuration

### Essential Configuration

Create `~/.claude-code-router/config.json`:

```json
{
  "apiPort": 3000,
  "webUIPort": 3001,
  "logLevel": "info",
  "APIKEY": "your-secret-key",
  "Providers": [
    {
      "name": "openai",
      "type": "openai",
      "apiKey": "sk-your-api-key",
      "baseURL": "https://api.openai.com/v1",
      "models": ["gpt-4", "gpt-3.5-turbo"]
    },
    {
      "name": "claude",
      "type": "anthropic",
      "apiKey": "sk-ant-your-api-key",
      "models": ["claude-3-5-sonnet-20241022", "claude-3-5-haiku-20241022"]
    }
  ],
  "routes": {
    "default": {
      "provider": "claude",
      "model": "claude-3-5-sonnet-20241022"
    },
    "background": {
      "provider": "openai",
      "model": "gpt-3.5-turbo"
    },
    "think": {
      "provider": "claude",
      "model": "claude-3-5-sonnet-20241022"
    }
  }
}
```

### Docker Configuration

Create `docker-compose.env`:

```bash
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key
PORT=3000
WEB_UI_PORT=3001
LOG_LEVEL=info
```

## 🔧 Usage

### Basic Commands

```bash
# Start the router service
ccr start

# Stop the router service
ccr stop

# Check service status
ccr status

# Restart the service
ccr restart

# Run Claude Code with the router
ccr code "Fix the API endpoint"
```

### Advanced Usage

#### Dynamic Model Switching
```claude
/model openai,gpt-4
```

#### Custom Routing
```claude
/model claude,claude-3-5-sonnet-20241022
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | API port | `3000` |
| `WEB_UI_PORT` | Web UI port | `3001` |
| `LOG_LEVEL` | Logging level | `info` |
| `APIKEY` | Security API key | - |
| `PROXY_URL` | HTTP proxy URL | - |
| `API_TIMEOUT_MS` | API timeout | `600000` |

## 🐳 Docker Deployment

### Single Node

```bash
# Quick deployment
docker-compose up -d

# With custom config
docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
```

### With Nginx (Production)

```bash
# Use nginx profile
docker-compose --profile with-nginx up -d

# Access via: http://your-server/
```

### Kubernetes

```yaml
# Example Kubernetes deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: claude-code-router
spec:
  replicas: 1
  selector:
    matchLabels:
      app: claude-code-router
  template:
    spec:
      containers:
      - name: claude-code-router
        image: musistudio/claude-code-router:latest
        ports:
        - containerPort: 3000
        - containerPort: 3001
        env:
        - name: OPENAI_API_KEY
          valueFrom:
            secretKeyRef:
              name: api-keys
              key: openai-key
```

## 🏗️ Development

### Prerequisites
- Node.js >= 18
- Docker & Docker Compose
- Git

### Development Setup

```bash
# Clone repository
git clone https://github.com/musistudio/claude-code-router.git
cd claude-code-router

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Start with hot reload
npm run dev:watch
```

### File Structure

```
claude-code-router/
├── src/
│   ├── cli.ts              # Command-line interface
│   ├── server.ts          # Main server
│   ├── routes/            # API routes
│   │   └── webui.ts       # Web UI endpoints
│   ├── web/               # Web UI components
│   │   ├── components/    # React components
│   │   └── index.tsx     # Web UI app
├── docker-compose.yml     # Docker configuration
├── Dockerfile            # Docker image
├── install.sh            # Installation script
└── config.example.json   # Example configuration
```

## 🔄 API Reference

### Base URLs
- API: `http://localhost:3000`
- Web UI: `http://localhost:3001`

### Health Check
```
GET /health
```

### Configuration Endpoints
```
GET /config               # Get current config
POST /config              # Update config
GET /providers           # List providers
POST /providers          # Add provider
DELETE /providers/:name  # Remove provider
```

### Status Endpoints
```
GET /status              # System status
GET /logs                # View logs
GET /metrics             # Performance metrics
```

## 🔐 Security

### API Key Authentication
Enable authentication by setting `APIKEY` in config:

```json
{
  "APIKEY": "your-secret-key-12345"
}
```

### HTTPS Setup

#### Using Nginx
```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /etc/ssl/certs/cert.pem;
    ssl_certificate_key /etc/ssl/private/key.pem;
    
    location / {
        proxy_pass http://claude-code-router:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### Using Cloudflare
Add your domain and Cloudflare will handle SSL automatically.

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find what's using the port
lsof -i :3001

# Use different ports
{
  "apiPort": 3002,
  "webUIPort": 3003
}
```

#### Connection Issues
```bash
# Check if service is running
ccr status

# Check logs
docker-compose logs -f

# Restart service
ccr restart
```

#### API Key Issues
```bash
# Test API key curl https://api.openai.com/v1/models -H "Authorization: Bearer sk-your-key"
```

### Debug Mode
Run with debug logging:

```bash
# Environment
LOG_LEVEL=debug ccr start

# Docker
LOG_LEVEL=debug docker-compose up
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and test
4. Commit changes: `git commit -m 'Add amazing feature'`
5. Push to branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Standards
- Use TypeScript for new files
- Add tests for new features
- Update documentation
- Use semantic commit messages

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=musistudio/claude-code-router&type=Date)](https://star-history.com/#musistudio/claude-code-router&Date)

## 🔗 Links

- **Documentation**: [claude-code-router.musistudio.com](https://claude-code-router.musistudio.com)
- **Issues**: [GitHub Issues](https://github.com/musistudio/claude-code-router/issues)
- **Discussions**: [GitHub Discussions](https://github.com/musistudio/claude-code-router/discussions)
- **NPM Package**: [@musistudio/claude-code-router](https://www.npmjs.com/package/@musistudio/claude-code-router)
- **Docker Hub**: [musistudio/claude-code-router](https://hub.docker.com/r/musistudio/claude-code-router)

---

## 🎉 For Merchants
If you're interested in commercial usage or custom features, please contact us at [business@musistudio.com](mailto:business@musistudio.com)