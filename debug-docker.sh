#!/bin/bash

echo "=== Claude Code Router Docker Debug Script ==="
echo "Date: $(date)"
echo "User: $(whoami)"
echo

# Find the running container
CONTAINER_ID=$(docker ps --filter "ancestor=ccr" --format "{{.ID}}" | head -1)
if [ -z "$CONTAINER_ID" ]; then
    CONTAINER_ID=$(docker ps --filter "name=ccr" --format "{{.ID}}" | head -1)
fi

if [ -z "$CONTAINER_ID" ]; then
    echo "❌ No running CCR container found!"
    echo "Available containers:"
    docker ps -a
    exit 1
fi

echo "✅ Found CCR container: $CONTAINER_ID"
echo

echo "=== 1. Container Info ==="
docker inspect $CONTAINER_ID --format '{{.Name}} - {{.Config.Image}} - {{.State.Status}}'
echo

echo "=== 2. Container Environment Variables ==="
docker exec $CONTAINER_ID env | grep -E "(PORT|HOST|API|CLAUDE)" | sort
echo

echo "=== 3. Config File Contents ==="
echo "Checking /root/.claude-code-router/config.json:"
docker exec $CONTAINER_ID cat /root/.claude-code-router/config.json 2>/dev/null || echo "❌ Config file not found"
echo

echo "=== 4. Process Status Inside Container ==="
echo "Node processes:"
docker exec $CONTAINER_ID ps aux | grep node | grep -v grep
echo

echo "=== 5. Network Status Inside Container ==="
echo "Listening ports:"
docker exec $CONTAINER_ID netstat -tulpn 2>/dev/null | grep LISTEN || docker exec $CONTAINER_ID ss -tulpn | grep LISTEN
echo

echo "=== 6. Test Internal Connectivity ==="
echo "Testing localhost:3456 from inside container:"
docker exec $CONTAINER_ID curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost:3456/ 2>/dev/null || echo "❌ Connection failed"
echo

echo "=== 7. Container Logs (last 20 lines) ==="
docker logs --tail 20 $CONTAINER_ID
echo

echo "=== 8. Docker Port Mapping ==="
docker port $CONTAINER_ID
echo

echo "=== 9. Test External Connectivity ==="
echo "Testing external access to Docker host:"
DOCKER_HOST_IP=$(docker inspect $CONTAINER_ID --format '{{range .NetworkSettings.Networks}}{{.Gateway}}{{end}}')
echo "Docker host IP: $DOCKER_HOST_IP"

# Test from host to container
echo "Testing host -> container on port 8456:"
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost:8456/ 2>/dev/null || echo "❌ Connection failed"
echo

echo "=== 10. Claude Code Configuration Check ==="
echo "Checking if Claude Code can detect the router:"
docker exec $CONTAINER_ID claude --version 2>/dev/null || echo "❌ Claude Code not available in container"
echo

echo "=== 11. File System Check ==="
echo "Config directory contents:"
docker exec $CONTAINER_ID ls -la /root/.claude-code-router/ 2>/dev/null || echo "❌ Config directory not found"
echo

echo "=== 12. Router Service Status ==="
echo "Checking ccr status inside container:"
docker exec $CONTAINER_ID node /app/dist/cli.js status 2>/dev/null || echo "❌ CCR status check failed"
echo

echo "=== 13. Test CCR Code Command ==="
echo "Testing ccr code command inside container:"
docker exec $CONTAINER_ID timeout 10s node /app/dist/cli.js code "test" 2>&1 || echo "❌ CCR code command failed or timed out"
echo

echo "=== Debug Complete ==="
echo "Container ID: $CONTAINER_ID"
echo "Time: $(date)"