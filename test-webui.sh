#!/bin/bash

echo "🧪 Testing Claude Code Router Web UI"
echo "====================================="

# Test if service is running
if ! ccr status >/dev/null 2>&1; then
    echo "❌ Service not running. Starting..."
    ccr start
    sleep 3
fi

# Test web UI HTML
echo "🌐 Testing Web UI HTML..."
if curl -s http://127.0.0.1:3457/ui | grep -q "Claude Code Router"; then
    echo "✅ Web UI HTML loads correctly"
else
    echo "❌ Web UI HTML failed to load"
fi

# Test JavaScript bundle
echo "📦 Testing JavaScript Bundle..."
if curl -s http://127.0.0.1:3457/ui/bundle.js | grep -q "react"; then
    echo "✅ JavaScript bundle loads correctly"
else
    echo "❌ JavaScript bundle failed to load"
fi

# Test API endpoints
echo "🔌 Testing API endpoints..."

# Test config endpoint
if curl -s http://127.0.0.1:3457/api/config | grep -q "Providers"; then
    echo "✅ Config API works"
else
    echo "❌ Config API failed"
fi

# Test validation endpoint
if curl -s -X POST http://127.0.0.1:3457/api/validate-provider \
   -H "Content-Type: application/json" \
   -d '{"provider":{"name":"test","api_base_url":"https://api.example.com","models":["gpt-4"]}}' \
   | grep -q "valid"; then
    echo "✅ Validation API works"
else
    echo "❌ Validation API failed"
fi

echo ""
echo "🎉 Web UI is ready!"
echo "Open: http://localhost:3457/ui"
echo "Or run: ccr ui"