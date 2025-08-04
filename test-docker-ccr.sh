#!/bin/bash

echo "=== Testing Docker Claude Code Router ==="

# Function to get container name
get_container_name() {
    docker ps --format "table {{.Names}}" | grep claude-code-router | head -1 | tr -d ' '
}

echo "1. Checking container status..."
CONTAINER_NAME=$(get_container_name)
if [ -z "$CONTAINER_NAME" ]; then
    echo "❌ No claude-code-router container running"
    exit 1
fi
echo "✅ Container running: $CONTAINER_NAME"

echo "2. Checking config inside container..."
docker exec $CONTAINER_NAME cat /root/.claude-code-router/config.json | grep -A2 -B2 APIKEY || echo "No APIKEY found"

echo "3. Testing router API directly..."
curl -s -H "Authorization: Bearer docker-api-key" http://localhost:3458/ | head -50

echo "4. Checking if Claude Code is installed in container..."
docker exec $CONTAINER_NAME which claude || echo "Claude not found in PATH"
docker exec $CONTAINER_NAME claude --version || echo "Claude version check failed"

echo "5. Testing codeCommand execution..."
docker exec $CONTAINER_NAME ls -la /app/dist/cli.js
docker exec $CONTAINER_NAME node /app/dist/cli.js --help || echo "CLI help failed"

echo "6. Checking environment when running code command..."
docker exec $CONTAINER_NAME env | grep -E "ANTHROPIC|API|AUTH" || echo "No auth env vars"

echo "7. Testing direct code command..."
timeout 10 docker exec -it $CONTAINER_NAME node /app/dist/cli.js code "hello" || echo "Code command failed or timed out"

echo "=== Test complete ==="