#!/bin/bash

# Initialize config directory if it doesn't exist
if [ ! -d "/root/.claude-code-router" ]; then
    echo "Creating config directory..."
    mkdir -p /root/.claude-code-router
fi

# Copy default config if no config exists
if [ ! -f "/root/.claude-code-router/config.json" ]; then
    echo "Copying default config..."
    cp /app/docker-config.json /root/.claude-code-router/config.json
fi

# Override HOST setting if OVERRIDE_HOST environment variable is set
if [ ! -z "$OVERRIDE_HOST" ]; then
    echo "Overriding HOST setting to: $OVERRIDE_HOST"
    # Use jq to update the HOST field and ensure APIKEY is set for Docker use
    if command -v jq &> /dev/null; then
        jq ".HOST = \"$OVERRIDE_HOST\" | .APIKEY = \"docker-api-key\"" /root/.claude-code-router/config.json > /tmp/config.json && \
        mv /tmp/config.json /root/.claude-code-router/config.json
    else
        # Fallback using sed
        sed -i "s/\"HOST\":\s*\"[^\"]*\"/\"HOST\": \"$OVERRIDE_HOST\"/" /root/.claude-code-router/config.json
        sed -i "s/\"APIKEY\":\s*\"[^\"]*\"/\"APIKEY\": \"docker-api-key\"/" /root/.claude-code-router/config.json
    fi
fi

# Start the service
exec "$@"