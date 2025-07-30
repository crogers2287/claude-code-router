# Docker Hub Setup Guide

## 🐳 Prerequisites

1. **Docker Hub Account**: Sign up at [hub.docker.com](https://hub.docker.com)
2. **GitHub Repository**: Ensure you have access to `crogers2287/claude-code-router` settings

## 🔧 Configure GitHub Secrets

Add these secrets to your GitHub repository:

1. **Go to**: Settings > Secrets and variables > Actions

2. **Add these secrets**:
   - `DOCKERHUB_USERNAME`: crogers2287
   - `DOCKERHUB_TOKEN`: Your Docker Hub Access Token

### Creating Docker Hub Access Token

1. **Login to Docker Hub**: [hub.docker.com/settings/security](https://hub.docker.com/settings/security)
2. **Click "New Access Token"**
3. **Set name**: `claude-code-router-github`
4. **Copy the token** and add to GitHub secrets

## 🚀 Automated Builds

Once secrets are configured:
- ✅ **Auto-build on main push**
- ✅ **Multi-platform images** (amd64/arm64)
- ✅ **Proper tagging** (latest, v1.0.0, etc.)

## 📥 Manual Build (Optional)

```bash
# Immediate build without secrets
docker build -t crogers2287/claude-code-router:latest .
docker push crogers2287/claude-code-router:latest
```

## 🎯 Access Your Image

After setup: `docker pull crogers2287/claude-code-router:latest`