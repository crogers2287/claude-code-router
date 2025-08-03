#!/bin/bash

# Claude Code Router Uninstallation Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[+]${NC} $1"
}

print_error() {
    echo -e "${RED}[!]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[*]${NC} $1"
}

print_info() {
    echo -e "${BLUE}[i]${NC} $1"
}

# Uninstallation function
uninstall() {
    echo "=================================="
    echo "Claude Code Router Uninstallation"
    echo "=================================="
    echo
    
    # Confirm uninstallation
    read -p "Are you sure you want to uninstall Claude Code Router? (y/N): " choice
    if [[ ! $choice =~ ^[Yy]$ ]]; then
        print_info "Uninstallation cancelled."
        exit 0
    fi
    
    print_warning "This will remove:"
    echo "  1. The ccr command from /usr/local/bin"
    echo "  2. The Docker image (claude-code-router)"
    echo "  3. Any running containers"
    echo "  4. Optionally: Configuration files"
    echo
    
    # Ask about config files
    read -p "Keep configuration files? (Y/n): " keep_config
    if [[ ! $keep_config =~ ^[Nn]$ ]]; then
        KEEP_CONFIG=true
    else
        KEEP_CONFIG=false
    fi
    
    # Stop running services
    print_status "Stopping any running services..."
    if docker compose version &> /dev/null; then
        docker compose down 2>/dev/null || true
    else
        docker-compose down 2>/dev/null || true
    fi
    
    # Remove containers
    sleep 2
    CONTAINERS=$(docker ps -a | grep claude-code-router | awk '{print $1}')
    if [ -n "$CONTAINERS" ]; then
        echo "$CONTAINERS" | xargs -I {} docker rm -f {} || true
    fi
    
    # Remove Docker image
    print_status "Removing Docker image..."
    docker rmi -f claude-code-router 2>/dev/null || true
    
    # Remove ccr command
    WRAPPER_DIR="/usr/local/bin"
    WRAPPER_PATH="$WRAPPER_DIR/ccr"
    if [ -f "$WRAPPER_PATH" ]; then
        if [ -w "$WRAPPER_DIR" ]; then
            rm -f "$WRAPPER_PATH"
        else
            sudo rm -f "$WRAPPER_PATH"
        fi
        print_status "ccr command removed"
    else
        print_info "ccr command not found"
    fi
    
    # Remove configuration if requested
    if [ "$KEEP_CONFIG" = false ]; then
        CONFIG_DIR="$HOME/.claude-code-router"
        if [ -d "$CONFIG_DIR" ]; then
            rm -rf "$CONFIG_DIR"
            print_status "Configuration files removed"
        fi
    else
        CONFIG_DIR="$HOME/.claude-code-router"
        if [ -d "$CONFIG_DIR" ]; then
            print_status "Configuration files kept at $CONFIG_DIR"
        fi
    fi
    
    # Clean up Docker resources
    print_status "Cleaning up Docker resources..."
    docker system prune -f 2>/dev/null || true
    
    echo
    echo "=================================="
    print_status "Uninstallation completed!"
    echo "=================================="
    echo
    if [ "$KEEP_CONFIG" = true ]; then
        print_info "Your configuration files were kept."
        print_info "To remove them manually: rm -rf $HOME/.claude-code-router"
    fi
    echo
    print_info "Thank you for using Claude Code Router!"
}

# Run uninstall function
uninstall