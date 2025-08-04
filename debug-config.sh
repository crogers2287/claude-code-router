#!/bin/bash

echo "=== Claude Code Router Configuration Debug ==="
echo

# Find the running container
CONTAINER_ID=$(docker ps --filter "ancestor=ccr" --format "{{.ID}}" | head -1)
if [ -z "$CONTAINER_ID" ]; then
    CONTAINER_ID=$(docker ps --filter "name=ccr" --format "{{.ID}}" | head -1)
fi

if [ -z "$CONTAINER_ID" ]; then
    echo "❌ No running CCR container found!"
    exit 1
fi

echo "Container ID: $CONTAINER_ID"
echo

echo "=== Detailed Config Analysis ==="

echo "1. Raw config file:"
echo "---"
docker exec $CONTAINER_ID cat /root/.claude-code-router/config.json 2>/dev/null | jq . 2>/dev/null || docker exec $CONTAINER_ID cat /root/.claude-code-router/config.json 2>/dev/null
echo "---"
echo

echo "2. PORT setting analysis:"
PORT_FROM_CONFIG=$(docker exec $CONTAINER_ID cat /root/.claude-code-router/config.json 2>/dev/null | jq -r '.PORT // "not_set"' 2>/dev/null)
echo "PORT in config: $PORT_FROM_CONFIG"
echo "Default PORT (if not set): 3456"
echo

echo "3. Environment variable override check:"
docker exec $CONTAINER_ID env | grep -E "^PORT=" || echo "No PORT environment variable set"
echo

echo "4. Expected vs Actual:"
echo "Expected behavior: Router should listen on port 3456 (default) inside container"
echo "Expected mapping: Container port 3456 -> Host port 8456"
echo

echo "5. Verify router is reading config correctly:"
echo "Testing router config parsing..."
docker exec $CONTAINER_ID node -e "
const fs = require('fs');
const path = require('path');
try {
  const configPath = '/root/.claude-code-router/config.json';
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  console.log('Config loaded successfully');
  console.log('PORT from config:', config.PORT || 'undefined (will use 3456)');
  console.log('HOST from config:', config.HOST || 'undefined');
  console.log('APIKEY from config:', config.APIKEY ? '***set***' : 'undefined');
} catch (error) {
  console.error('Config parsing error:', error.message);
}
" 2>/dev/null || echo "❌ Failed to test config parsing"
echo

echo "6. Check what the codeCommand.ts actually resolves to:"
docker exec $CONTAINER_ID node -e "
const config = JSON.parse(require('fs').readFileSync('/root/.claude-code-router/config.json', 'utf8'));
const port = config.PORT || 3456;
const baseUrl = \`http://127.0.0.1:\${port}\`;
console.log('Resolved ANTHROPIC_BASE_URL:', baseUrl);
console.log('This is what ccr code command will use');
" 2>/dev/null || echo "❌ Failed to test URL resolution"
echo

echo "7. Verify the service is actually listening on the expected port:"
echo "Checking if anything is listening on port 3456:"
docker exec $CONTAINER_ID netstat -tulpn 2>/dev/null | grep :3456 || docker exec $CONTAINER_ID ss -tulpn 2>/dev/null | grep :3456 || echo "❌ Nothing listening on port 3456"
echo

echo "8. Check if the Docker port mapping is correct:"
echo "Docker port mappings for this container:"
docker port $CONTAINER_ID
echo

echo "9. Final connectivity test:"
echo "Testing connection to the resolved URL from inside container:"
docker exec $CONTAINER_ID node -e "
const config = JSON.parse(require('fs').readFileSync('/root/.claude-code-router/config.json', 'utf8'));
const port = config.PORT || 3456;
const baseUrl = \`http://127.0.0.1:\${port}\`;
console.log('Testing URL:', baseUrl);

const http = require('http');
const req = http.get(baseUrl, (res) => {
  console.log('✅ Connection successful, status:', res.statusCode);
}).on('error', (err) => {
  console.log('❌ Connection failed:', err.message);
});
setTimeout(() => req.destroy(), 5000);
" 2>/dev/null || echo "❌ Failed to test connectivity"
echo

echo "=== Configuration Debug Complete ==="