#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_step() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Configuration
INSTALL_DIR="${HOME}/.local/bin"
BINARY_NAME="ccr"
REPO_URL="https://github.com/your-username/claude-code-router"
DOCKER_COMPOSE_FILE="docker-compose.yml"

# Check if running on macOS or Linux
detect_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        OS="linux"
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        OS="macos"
    else
        print_error "Unsupported OS: $OSTYPE"
        exit 1
    fi
    print_step "Detected OS: $OS"
}

# Check if Docker is installed
check_docker() {
    print_step "Checking Docker installation..."
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        echo "  - Linux: https://docs.docker.com/engine/install/ubuntu/"
        echo "  - macOS: https://docs.docker.com/desktop/install/mac-install/"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    print_success "Docker is installed"
}

# Install latest release
install_binary() {
    print_step "Setting up Claude Code Router binary..."
    
    # Check if we should use Docker or binary
    if [[ ! -z "$USE_DOCKER" ]]; then
        print_step "Using Docker installation..."
        return 0
    fi
    
    print_step "Installing binary to $INSTALL_DIR/$BINARY_NAME"
    
    # Create bin directory if it doesn't exist
    mkdir -p "$INSTALL_DIR"
    
    # Download the latest binary
    if command -v curl &> /dev/null; then
        curl -sSL "$REPO_URL/releases/latest/download/ccr-$OS" -o "$INSTALL_DIR/$BINARY_NAME"
    elif command -v wget &> /dev/null; then
        wget --quiet "$REPO_URL/releases/latest/download/ccr-$OS" -O "$INSTALL_DIR/$BINARY_NAME"
    else
        print_error "Neither curl nor wget is available. Please install one of them."
        exit 1
    fi
    
    # Make executable
    chmod +x "$INSTALL_DIR/$BINARY_NAME"
    
    # Add to PATH if not already there
    if [[ ":$PATH:" != *":$INSTALL_DIR:"* ]]; then
        shell_config=""
        if [[ "$SHELL" == */bash ]]; then
            shell_config="$HOME/.bashrc"
        elif [[ "$SHELL" == */zsh ]]; then
            shell_config="$HOME/.zshrc"
        elif [[ "$SHELL" == */fish ]]; then
            shell_config="$HOME/.config/fish/config.fish"
        fi
        
        if [[ -n "$shell_config" ]]; then
            echo "export PATH=\"$PATH:$INSTALL_DIR\"" >> "$shell_config"
            print_step "Added $INSTALL_DIR to PATH in $shell_config"
            print_step "Please run: source $shell_config"
        fi
    fi
    
    print_success "Binary installed successfully"
}

# Create directories and configuration
setup_directories() {
    print_step "Setting up directories and configuration..."
    
    CONFIG_DIR="$HOME/.claude-code-router"
    mkdir -p "$CONFIG_DIR"
    
    # Create default config if it doesn't exist
    if [[ ! -f "$CONFIG_DIR/config.json" ]]; then
        cat > "$CONFIG_DIR/config.json" << 'EOF'
{
  "logLevel": "info",
  "apiPort": 3000,
  "webUIPort": 3001,
  "providers": [
    {
      "name": "openai",
      "type": "openai",
      "apiKey": "your-openai-api-key",
      "baseURL": "https://api.openai.com/v1",
      "models": ["gpt-4", "gpt-3.5-turbo"]
    },
    {
      "name": "claude",
      "type": "anthropic",
      "apiKey": "your-anthropic-api-key",
      "models": ["claude-3-5-sonnet-20241022", "claude-3-5-haiku-20241022"]
    }
  ],
  "routes": {
    "default": {
      "provider": "claude",
      "model": "claude-3-5-sonnet-20241022"
    },
    "background": {
      "provider": "openai",
      "model": "gpt-3.5-turbo"
    },
    "think": {
      "provider": "claude",
      "model": "claude-3-5-sonnet-20241022"
    },
    "longContext": {
      "provider": "claude",
      "model": "claude-3-5-sonnet-20241022"
    },
    "webSearch": {
      "provider": "openai",
      "model": "gpt-4"
    }
  }
}
EOF
        print_step "Created default configuration file at $CONFIG_DIR/config.json"
    fi
    
    # Create log directory
    mkdir -p "$CONFIG_DIR/logs"
}

# Setup Docker containers
setup_docker() {
    print_step "Setting up Docker containers..."
    
    if [[ -f "$DOCKER_COMPOSE_FILE" ]]; then
        print_step "Building Docker containers..."
        docker-compose build --no-cache
        
        print_step "Starting services..."
        docker-compose up -d
        
        print_success "Docker services started successfully"
        print_step "Services will be available at:"
        print_step "  - API: http://localhost:3000"
        print_step "  - Web UI: http://localhost:3001"
    else
        print_warning "docker-compose.yml not found. Using manual Docker setup."
    fi
}

# Check ports availability
check_ports() {
    print_step "Checking port availability..."
    
    required_ports=(3000 3001)
    for port in "${required_ports[@]}"; do
        if lsof -i ":$port" > /dev/null 2>&1 || netstat -tuln | grep ":$port" > /dev/null 2>&1; then
            print_warning "Port $port is already in use. You may need to choose different ports in your configuration."
        fi
    done
}

# Validate installation
validate_installation() {
    print_step "Validating installation..."
    
    if [[ ! -z "$USE_DOCKER" ]]; then
        # Check if containers are running
        if docker-compose ps | grep -q "Up”; then
            print_success "Docker containers are running successfully"
        else
            print_error "Docker containers failed to start"
            exit 1
        fi
    else
        # Check if binary works
        if "$INSTALL_DIR/$BINARY_NAME" --version > /dev/null 2>&1; then
            print_success "Binary validation successful"
        else
            print_error "Binary validation failed"
            exit 1
        fi
    fi
}

# Show usage instructions
show_usage() {
    print_success "Installation completed successfully!"
    echo ""
    print_step "Usage instructions:"
    echo ""
    
    if [[ ! -z "$USE_DOCKER" ]]; then
        echo "  # Start the service"
        echo "  docker-compose up -d"
        echo ""
        echo "  # Stop the service"
        echo "  docker-compose down"
        echo ""
        echo "  # View logs"
        echo "  docker-compose logs -f"
        echo ""
        echo "  # Access the services"
        echo "  Web UI: http://localhost:3001"
        echo "  API: http://localhost:3000"
    else
        echo "  # Start the router service"
        echo "  $BINARY_NAME start"
        echo ""
        echo "  # Stop the router service"
        echo "  $BINARY_NAME stop"
        echo ""
        echo "  # Check service status"
        echo "  $BINARY_NAME status"
        echo ""
        echo "  # Run Claude Code"
        echo "  $BINARY_NAME code 'Your prompt here'"
        echo ""
        echo "  # Access the Web UI"
        echo "  http://localhost:3001"
    fi
    
    echo ""
    print_step "Configuration file: ~/.claude-code-router/config.json"
    echo "Please update the configuration with your API keys before using."
}

# Main installation function
main() {
    echo "╔══════════════════════════════════════════════╗"
    echo "║     Claude Code Router Installation          ║"
    echo "╚══════════════════════════════════════════════╝"
    echo ""
    
    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --docker)
                USE_DOCKER=1
                shift
                ;;
            --dir)
                INSTALL_DIR="$2"
                shift 2
                ;;
            --help)
                echo "Usage: $0 [options]"
                echo ""
                echo "Options:"
                echo "  --docker    Use Docker installation instead of binary"
                echo "  --dir DIR   Installation directory (default: ~/.local/bin)"
                echo "  --help      Show this help message"
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                exit 1
                ;;
        esac
    done
    
    detect_os
    check_docker
    check_ports
    install_binary
    setup_directories
    
    if [[ ! -z "$USE_DOCKER" ]]; then
        setup_docker
    fi
    
    validate_installation
    show_usage
}

# Run main function
main "$@"