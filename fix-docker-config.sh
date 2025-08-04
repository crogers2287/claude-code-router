#!/bin/bash

echo "=== Claude Code Router Docker Configuration Fix ==="
echo

# Find the running container
CONTAINER_ID=$(docker ps --filter "ancestor=ccr" --format "{{.ID}}" | head -1)
if [ -z "$CONTAINER_ID" ]; then
    CONTAINER_ID=$(docker ps --filter "name=ccr" --format "{{.ID}}" | head -1)
fi

if [ -z "$CONTAINER_ID" ]; then
    echo "❌ No running CCR container found!"
    echo "Please start the container first with: docker run -d -p 8456:3456 --name ccr ccr"
    exit 1
fi

echo "Found container: $CONTAINER_ID"
echo

echo "=== Current Configuration ==="
docker exec $CONTAINER_ID cat /root/.claude-code-router/config.json 2>/dev/null | jq . 2>/dev/null || docker exec $CONTAINER_ID cat /root/.claude-code-router/config.json 2>/dev/null
echo

echo "=== Fixing Configuration ==="

# Create a proper config that explicitly sets the PORT
echo "Creating corrected config with explicit PORT setting..."
docker exec $CONTAINER_ID bash -c 'cat > /root/.claude-code-router/config.json << EOF
{
  "Providers": [
    {
      "name": "echo",
      "api_base_url": "http://httpbin.org/post",
      "api_key": "dummy-key",
      "models": ["echo-model"]
    }
  ],
  "Router": {
    "default": "echo,echo-model"
  },
  "APIKEY": "docker-test-key",
  "HOST": "0.0.0.0",
  "PORT": 3456,
  "API_TIMEOUT_MS": 300000
}
EOF'

echo "✅ Updated configuration file"
echo

echo "=== New Configuration ==="
docker exec $CONTAINER_ID cat /root/.claude-code-router/config.json | jq . 2>/dev/null || docker exec $CONTAINER_ID cat /root/.claude-code-router/config.json
echo

echo "=== Restarting Router Service ==="
echo "Stopping current router process..."
docker exec $CONTAINER_ID pkill -f "node.*cli.js.*start" || echo "No router process found to kill"

echo "Waiting 3 seconds..."
sleep 3

echo "Starting router service..."
docker exec -d $CONTAINER_ID node /app/dist/cli.js start --foreground

echo "Waiting 5 seconds for service to start..."
sleep 5

echo "=== Verification ==="
echo "Checking if service is listening on port 3456:"
docker exec $CONTAINER_ID netstat -tulpn 2>/dev/null | grep :3456 || docker exec $CONTAINER_ID ss -tulpn 2>/dev/null | grep :3456 || echo "❌ Service not listening on port 3456"

echo
echo "Testing connectivity:"
docker exec $CONTAINER_ID curl -s -o /dev/null -w "Internal test (localhost:3456): HTTP %{http_code}\n" http://localhost:3456/ 2>/dev/null || echo "❌ Internal connection failed"

echo "Testing external connectivity (host:8456):"
curl -s -o /dev/null -w "External test (localhost:8456): HTTP %{http_code}\n" http://localhost:8456/ 2>/dev/null || echo "❌ External connection failed"

echo
echo "=== Test CCR Code Command ==="
echo "Testing ccr code command with new configuration:"
docker exec $CONTAINER_ID timeout 10s node /app/dist/cli.js code "test message" 2>&1 || echo "❌ CCR code command failed or timed out"

echo
echo "=== Fix Complete ==="
echo "If the tests above show HTTP 200 or similar success codes, the configuration is now correct."
echo "The container should now be properly listening on port 3456 internally and accessible via port 8456 externally."