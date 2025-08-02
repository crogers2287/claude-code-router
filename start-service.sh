#!/bin/bash
# Start script for Claude Code Router with Web UI

# Ensure we're using the local installation
cd /home/crogers2287/claude-code-router

# Start the service with web UI
exec /usr/bin/node dist/cli.js start --foreground