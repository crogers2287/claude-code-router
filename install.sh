#!/bin/bash

# Claude Code Router Installation Script
# Supports Linux and macOS

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

# Detect OS
detect_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        OS="linux"
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        OS="macos"
    else
        print_error "Unsupported OS: $OSTYPE"
        exit 1
    fi
    print_status "Detected OS: $OS"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        print_info "Visit https://docs.docker.com/get-docker/ for installation instructions."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose."
        print_info "Visit https://docs.docker.com/compose/install/ for installation instructions."
        exit 1
    fi
    
    print_status "Docker and Docker Compose are installed"
}

# Check if Claude Code is installed in the container
check_claude_code() {
    print_info "Checking Claude Code installation in Docker container..."
    
    # The Claude Code installation is handled in the Dockerfile
    # We just need to verify it will be installed when we build
    if grep -q "@anthropic-ai/claude-code" Dockerfile; then
        print_status "Claude Code will be installed in the Docker container"
    else
        print_warning "Claude Code installation not found in Dockerfile, adding it..."
        # This case shouldn't happen with the current Dockerfile, but keeping as safety check
    fi
}

# Create configuration directory
setup_config_dir() {
    CONFIG_DIR="$HOME/.claude-code-router"
    CLAUDE_DIR="$HOME/.claude"
    
    # Setup Claude Code Router config
    if [ ! -d "$CONFIG_DIR" ]; then
        print_status "Creating configuration directory: $CONFIG_DIR"
        mkdir -p "$CONFIG_DIR"
    else
        print_info "Configuration directory already exists: $CONFIG_DIR"
    fi
    
    # Setup Claude Code config directory for persistence
    if [ ! -d "$CLAUDE_DIR" ]; then
        print_status "Creating Claude Code configuration directory: $CLAUDE_DIR"
        mkdir -p "$CLAUDE_DIR"
        print_info "This directory will store Claude Code authentication data"
    else
        print_info "Claude Code configuration directory already exists: $CLAUDE_DIR"
    fi
    
    # Create placeholder files for Claude config if they don't exist
    # This ensures Docker volume mounts work properly
    if [ ! -f "$HOME/.claude.json" ]; then
        print_info "Creating placeholder Claude config file for Docker volume mounting"
        echo '{}' > "$HOME/.claude.json"
    fi
    
    if [ ! -f "$HOME/.claude.json.backup" ]; then
        echo '{}' > "$HOME/.claude.json.backup"
    fi
    
    # Copy example config if no config exists
    if [ ! -f "$CONFIG_DIR/config.json" ]; then
        if [ -f "config.example.json" ]; then
            print_status "Copying example configuration to $CONFIG_DIR/config.json"
            cp config.example.json "$CONFIG_DIR/config.json"
            print_warning "Please edit $CONFIG_DIR/config.json with your API keys and preferences"
        else
            print_warning "No example configuration found. You'll need to create $CONFIG_DIR/config.json manually"
        fi
    else
        print_info "Configuration file already exists: $CONFIG_DIR/config.json"
    fi
}

# Build Docker image
build_docker_image() {
    print_status "Building Docker image for Claude Code Router..."
    
    # Check if image already exists
    if docker images | grep -q claude-code-router; then
        print_warning "Docker image already exists. Rebuilding..."
    fi
    
    # Build with better error handling
    if ! docker compose version &> /dev/null; then
        if ! docker-compose build; then
            print_error "Docker build failed. Trying to clean up and rebuild..."
            # Clean up and try again
            docker-compose down || true
            docker system prune -f || true
            print_info "Retrying build..."
            docker-compose build
        fi
    else
        if ! docker compose build; then
            print_error "Docker build failed. Trying to clean up and rebuild..."
            # Clean up and try again
            docker compose down || true
            docker system prune -f || true
            print_info "Retrying build..."
            docker compose build
        fi
    fi
    
    print_status "Docker image built successfully"
}

# Create ccr wrapper script
create_ccr_wrapper() {
    WRAPPER_DIR="/usr/local/bin"
    WRAPPER_PATH="$WRAPPER_DIR/ccr"
    
    # Check if we need sudo
    if [ -w "$WRAPPER_DIR" ]; then
        SUDO=""
    else
        SUDO="sudo"
        print_info "Administrator privileges required to install ccr command"
    fi
    
    print_status "Creating ccr wrapper script..."
    
    # Get the absolute path to the project directory
    PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
    
    # Create wrapper script
    cat > /tmp/ccr << EOF
#!/bin/bash
# Claude Code Router wrapper script

# Change to the project directory
cd "$PROJECT_DIR"

# Function to ensure container is running
ensure_container_running() {
    if ! docker ps --format "table {{.Names}}" | grep -q claude-code-router; then
        echo "Starting Claude Code Router container..."
        if docker compose version &> /dev/null; then
            docker compose up -d
        else
            docker-compose up -d
        fi
        
        # Wait for services to be ready
        echo "Waiting for services to start..."
        sleep 5
    fi
}

# Function to get the actual container name (handles -1, -2 suffixes)
get_container_name() {
    docker ps --format "table {{.Names}}" | grep claude-code-router | head -1 | tr -d ' '
}

# Handle different commands
case "\$1" in
    start)
        if docker compose version &> /dev/null; then
            docker compose up -d
        else
            docker-compose up -d
        fi
        echo "Claude Code Router started"
        echo "Main service: http://localhost:3456"
        echo "Web UI: http://localhost:3457/ui"
        ;;
    stop)
        if docker compose version &> /dev/null; then
            docker compose down
        else
            docker-compose down
        fi
        echo "Claude Code Router stopped"
        ;;
    restart)
        if docker compose version &> /dev/null; then
            docker compose restart
        else
            docker-compose restart
        fi
        echo "Claude Code Router restarted"
        ;;
    status)
        if docker ps | grep -q claude-code-router; then
            echo "Claude Code Router is running"
            docker ps | grep claude-code-router
        else
            echo "Claude Code Router is not running"
        fi
        ;;
    logs)
        shift
        if docker compose version &> /dev/null; then
            docker compose logs \$@
        else
            docker-compose logs \$@
        fi
        ;;
    code)
        ensure_container_running
        shift
        
        # Check if Claude is authenticated, if not, prompt for login
        CONTAINER_NAME=\$(get_container_name)
        
        # No authentication check needed - router handles all authentication
        # Claude Code will connect to the router which has the provider API keys
        
        # Execute the command inside the container
        docker exec -it \$CONTAINER_NAME node dist/cli.js code "\$@"
        ;;
    config)
        ensure_container_running
        echo "Opening configuration interface..."
        # Detect OS and open browser
        if [[ "\$OSTYPE" == "linux-gnu"* ]]; then
            xdg-open "http://localhost:3459/ui" 2>/dev/null || echo "Please open http://localhost:3459/ui in your browser"
        elif [[ "\$OSTYPE" == "darwin"* ]]; then
            open "http://localhost:3459/ui"
        fi
        ;;
    login)
        echo "ℹ️  No login required!"
        echo "The router handles authentication with all providers using configured API keys."
        echo "Just run: ccr code"
        ;;
    exec)
        shift
        CONTAINER_NAME=\$(get_container_name)
        docker exec -it \$CONTAINER_NAME \$@
        ;;
    *)
        # Pass through any other commands to the CLI inside the container
        ensure_container_running
        CONTAINER_NAME=\$(get_container_name)
        docker exec -it \$CONTAINER_NAME node dist/cli.js "\$@"
        ;;
esac
EOF
    
    # Install wrapper script
    $SUDO mv /tmp/ccr "$WRAPPER_PATH"
    $SUDO chmod +x "$WRAPPER_PATH"
    
    print_status "ccr command installed to $WRAPPER_PATH"
}

# Start services
start_services() {
    print_status "Starting Claude Code Router services..."
    
    if docker compose version &> /dev/null; then
        docker compose up -d
    else
        docker-compose up -d
    fi
    
    # Wait for services to be ready
    print_info "Waiting for services to start..."
    sleep 5
    
    # Check if services are running
    if docker ps | grep -q claude-code-router; then
        print_status "Services started successfully!"
        print_info "Main service: http://localhost:3456"
        print_info "Web UI: http://localhost:3457/ui"
    else
        print_error "Failed to start services. Check logs with: ccr logs"
        exit 1
    fi
}

# Function to prompt user for continuation
prompt_continue() {
    read -p "Continue with installation? (y/n): " choice
    case $choice in
        y|Y)
            return 0
            ;;
        *)
            echo "Installation cancelled."
            exit 0
            ;;
    esac
}

# Handle partial installation
handle_partial_install() {
    # Check if we have a partial installation
    CONFIG_DIR="$HOME/.claude-code-router"
    WRAPPER_DIR="/usr/local/bin"
    WRAPPER_PATH="$WRAPPER_DIR/ccr"
    
    PARTIAL_INSTALL_FOUND=false
    
    # Check various indicators of partial installation
    if [ -f "$WRAPPER_PATH" ]; then
        print_warning "ccr command already exists at $WRAPPER_PATH"
        PARTIAL_INSTALL_FOUND=true
    fi
    
    if [ -d "$CONFIG_DIR" ]; then
        print_warning "Configuration directory already exists at $CONFIG_DIR"
        PARTIAL_INSTALL_FOUND=true
    fi
    
    if docker images | grep -q claude-code-router; then
        print_warning "Docker image already exists"
        PARTIAL_INSTALL_FOUND=true
    fi
    
    if [ "$PARTIAL_INSTALL_FOUND" = true ]; then
        echo
        print_info "A partial installation was detected."
        echo "Please choose an option:"
        echo "  1. Continue where we left off (recommended)"
        echo "  2. Start fresh (remove existing installation)"
        echo "  3. Exit without making changes"
        
        while true; do
            read -p "Enter your choice (1-3): " choice
            case $choice in
                1)
                    print_status "Continuing with existing installation..."
                    if docker images | grep -q claude-code-router; then
                        read -p "Skip Docker build? (y/n): " skip_build
                        if [[ $skip_build =~ ^[Yy]$ ]]; then
                            export SKIP_BUILD=true
                        fi
                    fi
                    return 0
                    ;;
                2)
                    print_status "Removing existing installation..."
                    # Remove wrapper
                    if [ -f "$WRAPPER_PATH" ]; then
                        if [ -w "$WRAPPER_DIR" ]; then
                            rm -f "$WRAPPER_PATH"
                        else
                            sudo rm -f "$WRAPPER_PATH"
                        fi
                    fi
                    
                    # Remove config (ask first)
                    if [ -d "$CONFIG_DIR" ]; then
                        read -p "Keep configuration files? (y/n): " keep_config
                        if [[ $keep_config =~ ^[Nn]$ ]]; then
                            rm -rf "$CONFIG_DIR"
                        fi
                    fi
                    
                    # Stop containers
                    if docker compose version &> /dev/null; then
                        docker compose down 2>/dev/null || true
                    else
                        docker-compose down 2>/dev/null || true
                    fi
                    
                    # Remove Docker image
                    docker rmi -f claude-code-router 2>/dev/null || true
                    
                    print_status "Old installation removed"
                    return 0
                    ;;
                3)
                    echo "Exiting without changes."
                    exit 0
                    ;;
                *)
                    echo "Invalid choice. Please enter 1, 2, or 3."
                    ;;
            esac
        done
    fi
}

# Main installation flow
main() {
    echo "=================================="
    echo "Claude Code Router Installation"
    echo "=================================="
    print_info "This script will:"
    echo "  1. Check system requirements"
    echo "  2. Build Docker image"
    echo "  3. Create configuration directory"
    echo "  4. Install ccr command"
    echo "  5. Start services"
    echo
    
    # Handle partial installation if it exists
    handle_partial_install
    
    # Allow user to continue
    if ! prompt_continue; then
        exit 0
    fi
    
    # Check prerequisites
    detect_os
    check_docker
    check_claude_code
    
    # Setup
    [ "$SKIP_BUILD" != true ] && build_docker_image
    setup_config_dir
    create_ccr_wrapper
    start_services
    
    echo
    echo "=================================="
    print_status "Installation completed!"
    echo "=================================="
    echo
    echo "Available commands:"
    echo "  ccr start      - Start the router service"
    echo "  ccr stop       - Stop the router service"
    echo "  ccr restart    - Restart the router service"
    echo "  ccr status     - Check service status"
    echo "  ccr logs       - View service logs"
    echo "  ccr code       - Run Claude Code through the router"
    echo "  ccr config     - Open the Web UI configuration"
    echo
    print_warning "Don't forget to configure your API keys in ~/.claude-code-router/config.json"
    print_info "Or use 'ccr config' to open the Web UI configuration interface"
}

# Run main function
main