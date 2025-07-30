# Docker Hub Setup Instructions

## 1. Create Docker Hub Account

If you don't have one:
1. Go to [dockerhub.com](https://hub.docker.com)
2. Create your free account
3. Verify your email address

## 2. Configure GitHub Secrets

Add these secrets to your GitHub repository:

Go to: **Settings > Secrets and variables > Actions**

Add:
```
DOCKERHUB_USERNAME: crogers2287
DOCKERHUB_TOKEN: your-dockerhub-access-token
```

### To create Docker Hub token:
1. Go to [hub.docker.com/settings/security](https://hub.docker.com/settings/security)
2. Click "New Access Token"
3. Set name: "GitHubActions-CCRouter"
4. Copy the generated token and add it to GitHub secrets

## 3. Repository Configuration

Make sure your Docker Hub repository exists:
1. Go to [hub.docker.com/repositories/create](https://hub.docker.com/repositories/create)
2. Create new repository: `crogers2287/claude-code-router`
3. Set visibility: Public (recommended)
4. Connect to GitHub for automated builds

## 4. Usage Examples

After setup, users can pull your Docker image:

```bash
# Pull latest image
docker pull crogers2287/claude-code-router:latest

# Run with Docker Compose
docker-compose -f docker-compose.prod.yml up -d

# Run directly
docker run -p 3000:3000 -p 3001:3001 crogers2287/claude-code-router:latest

# With environment variables
docker run -e OPENAI_API_KEY=sk-your-key \
           -e ANTHROPIC_API_KEY=sk-your-key \
           -p 3000:3000 -p 3001:3001 \
           crogers2287/claude-code-router:latest
```

## 5. Automated Builds

The GitHub Actions workflow will automatically:
- Build and push on every `main` branch push
- Build and push on every tag release
- Create multi-platform images (amd64/arm64)
- Generate proper tags (latest, version, etc.)

## 6. Manual Build and Push (Optional)

If you want to manually build and push:

```bash
# Build the image
docker build -t crogers2287/claude-code-router:latest .

# Push to Docker Hub
docker push crogers2287/claude-code-router:latest

# Tag specific version
docker tag crogers2287/claude-code-router:latest crogers2287/claude-code-router:v1.0.0
docker push crogers2287/claude-code-router:v1.0.0
```

## 7. Verification

Test your Docker image:

```bash
# Test the image
docker run --rm --name test-ccr -p 3000:3000 -p 3001:3001 crogers2287/claude-code-router:latest

# Check if services are accessible
curl http://localhost:3000/health
curl http://localhost:3001
```

## 8. Badges

Add Docker Hub badge to your README:

```markdown
[![Docker Hub](https://img.shields.io/docker/pulls/crogers2287/claude-code-router.svg)](https://hub.docker.com/r/crogers2287/claude-code-router)
[![Docker Image Size](https://img.shields.io/docker/image-size/crogers2287/claude-code-router/latest)](https://hub.docker.com/r/crogers2287/claude-code-router)
```