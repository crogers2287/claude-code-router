#!/bin/bash

# Test script to verify Docker setup exposes both ports correctly

echo "Testing Claude Code Router Docker setup..."
echo

# Check if containers are running
if docker ps | grep -q claude-code-router; then
    echo "✓ Container is running"
    
    # Test main service port
    echo -n "Testing main service (port 3456)... "
    if curl -s -f http://localhost:3456/ > /dev/null 2>&1; then
        echo "✓ Accessible"
    else
        echo "✗ Not accessible"
    fi
    
    # Test WebUI port
    echo -n "Testing WebUI (port 3457)... "
    if curl -s -f http://localhost:3457/ui > /dev/null 2>&1; then
        echo "✓ Accessible"
    else
        echo "✗ Not accessible"
    fi
    
    # Show exposed ports
    echo
    echo "Container exposed ports:"
    docker port $(docker ps -q -f name=claude-code-router)
else
    echo "✗ Container is not running"
    echo "Run './install.sh' or 'docker-compose up -d' to start it"
fi