#!/bin/bash

# Claude Code Router Installation Script
# Comprehensive installation with error handling and validation

set -euo pipefail  # Exit on error, undefined variables, and pipe failures

# Color codes for output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly PURPLE='\033[0;35m'
readonly CYAN='\033[0;36m'
readonly WHITE='\033[1;37m'
readonly NC='\033[0m' # No Color

# Unicode symbols
readonly CHECK_MARK="✅"
readonly CROSS_MARK="❌"
readonly WARNING="⚠️"
readonly INFO="ℹ️"
readonly ROCKET="🚀"
readonly GEAR="⚙️"
readonly PACKAGE="📦"
readonly WRENCH="🔧"
readonly GLOBE="🌐"
readonly COMPUTER="💻"
readonly FOLDER="📁"
readonly KEY="🔑"
readonly SHIELD="🛡️"

# Global variables
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_DIR="$HOME/.claude-code-router"
BACKUP_DIR="$CONFIG_DIR/backups"
LOG_FILE="$CONFIG_DIR/logs/install.log"
INSTALL_TIMESTAMP=$(date '+%Y%m%d_%H%M%S')

# Logging functions
log() {
    local level="$1"
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    # Ensure log directory exists
    mkdir -p "$(dirname "$LOG_FILE")"
    
    # Write to log file
    echo "[$timestamp] [$level] $message" >> "$LOG_FILE"
    
    # Also output to console with colors
    case "$level" in
        "ERROR")   echo -e "${RED}${CROSS_MARK} $message${NC}" ;;
        "WARN")    echo -e "${YELLOW}${WARNING} $message${NC}" ;;
        "SUCCESS") echo -e "${GREEN}${CHECK_MARK} $message${NC}" ;;
        "INFO")    echo -e "${BLUE}${INFO} $message${NC}" ;;
        *)         echo -e "${WHITE}$message${NC}" ;;
    esac
}

# Error handling
error_exit() {
    log "ERROR" "$1"
    echo -e "\n${RED}${CROSS_MARK} Installation failed. Check the log at: $LOG_FILE${NC}"
    exit 1
}

# Success message
success_msg() {
    log "SUCCESS" "$1"
}

# Warning message
warn_msg() {
    log "WARN" "$1"
}

# Info message
info_msg() {
    log "INFO" "$1"
}

# Progress indicator
show_progress() {
    local current=$1
    local total=$2
    local desc=$3
    local percent=$((current * 100 / total))
    local bar_length=30
    local filled_length=$((percent * bar_length / 100))
    
    printf "\r${BLUE}["
    for ((i=0; i<filled_length; i++)); do printf "█"; done
    for ((i=filled_length; i<bar_length; i++)); do printf "░"; done
    printf "] %d%% - %s${NC}" "$percent" "$desc"
    
    if [ "$current" -eq "$total" ]; then
        echo ""
    fi
}

# Header
print_header() {
    clear
    echo -e "${PURPLE}"
    cat << 'EOF'
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║        🚀 Claude Code Router Installation Script 🚀          ║
║                                                               ║
║    Intelligent LLM routing and configuration management       ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}\n"
}

# System information
detect_system() {
    info_msg "Detecting system information..."
    
    # Detect OS
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        OS="linux"
        if command -v lsb_release >/dev/null 2>&1; then
            DISTRO=$(lsb_release -si)
            VERSION=$(lsb_release -sr)
        elif [[ -f /etc/os-release ]]; then
            . /etc/os-release
            DISTRO=$NAME
            VERSION=$VERSION_ID
        else
            DISTRO="Unknown Linux"
            VERSION="Unknown"
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        OS="macos"
        DISTRO="macOS"
        VERSION=$(sw_vers -productVersion)
    else
        OS="unknown"
        DISTRO="Unknown"
        VERSION="Unknown"
    fi
    
    info_msg "Operating System: $DISTRO $VERSION"
    info_msg "Architecture: $(uname -m)"
    info_msg "Shell: $SHELL"
    
    # Check if running as root
    if [[ $EUID -eq 0 ]]; then
        warn_msg "Running as root. Consider running as a regular user for security."
        read -p "Continue as root? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            error_exit "Installation cancelled."
        fi
    fi
}

# Prerequisites check
check_prerequisites() {
    info_msg "Checking prerequisites..."
    local missing_deps=()
    
    show_progress 1 6 "Checking Node.js..."
    if ! command -v node >/dev/null 2>&1; then
        missing_deps+=("Node.js")
    else
        NODE_VERSION=$(node -v | sed 's/v//')
        NODE_MAJOR=$(echo "$NODE_VERSION" | cut -d. -f1)
        if (( NODE_MAJOR < 18 )); then
            error_exit "Node.js version 18+ is required. Current version: v$NODE_VERSION"
        fi
        success_msg "Node.js v$NODE_VERSION detected"
    fi
    
    show_progress 2 6 "Checking npm..."
    if ! command -v npm >/dev/null 2>&1; then
        missing_deps+=("npm")
    else
        NPM_VERSION=$(npm -v)
        success_msg "npm v$NPM_VERSION detected"
    fi
    
    show_progress 3 6 "Checking curl..."
    if ! command -v curl >/dev/null 2>&1; then
        missing_deps+=("curl")
    else
        success_msg "curl available"
    fi
    
    show_progress 4 6 "Checking git..."
    if ! command -v git >/dev/null 2>&1; then
        missing_deps+=("git")
    else
        success_msg "git available"
    fi
    
    show_progress 5 6 "Checking Claude Code..."
    if ! command -v claude >/dev/null 2>&1; then
        warn_msg "Claude Code not found. It will be installed automatically."
    else
        CLAUDE_VERSION=$(claude --version 2>/dev/null | head -n1 || echo "Unknown")
        success_msg "Claude Code detected: $CLAUDE_VERSION"
    fi
    
    show_progress 6 6 "Prerequisites check complete"
    
    if [[ ${#missing_deps[@]} -gt 0 ]]; then
        error_exit "Missing dependencies: ${missing_deps[*]}. Please install them first."
    fi
}

# Install Claude Code if needed
install_claude_code() {
    if ! command -v claude >/dev/null 2>&1; then
        info_msg "Installing Claude Code..."
        if npm install -g @anthropic-ai/claude-code; then
            success_msg "Claude Code installed successfully"
        else
            error_exit "Failed to install Claude Code"
        fi
    fi
}

# Backup existing configuration
backup_existing_config() {
    if [[ -d "$CONFIG_DIR" ]]; then
        info_msg "Backing up existing configuration..."
        mkdir -p "$BACKUP_DIR"
        local backup_path="$BACKUP_DIR/config_backup_$INSTALL_TIMESTAMP.tar.gz"
        
        if tar -czf "$backup_path" -C "$HOME" ".claude-code-router" 2>/dev/null; then
            success_msg "Configuration backed up to: $backup_path"
        else
            warn_msg "Failed to create backup, but continuing..."
        fi
    fi
}

# Create directory structure
create_directories() {
    info_msg "Creating directory structure..."
    
    local directories=(
        "$CONFIG_DIR"
        "$CONFIG_DIR/logs"
        "$CONFIG_DIR/backups"
        "$CONFIG_DIR/plugins"
    )
    
    for dir in "${directories[@]}"; do
        if mkdir -p "$dir"; then
            success_msg "Created directory: $dir"
        else
            error_exit "Failed to create directory: $dir"
        fi
    done
}

# Install dependencies
install_dependencies() {
    info_msg "Installing project dependencies..."
    
    cd "$SCRIPT_DIR"
    
    show_progress 1 3 "Installing packages..."
    if npm ci --only=production --silent; then
        success_msg "Production dependencies installed"
    else
        warn_msg "Production install failed, trying regular install..."
        if npm install --only=production; then
            success_msg "Dependencies installed"
        else
            error_exit "Failed to install dependencies"
        fi
    fi
    
    show_progress 2 3 "Installing development dependencies..."
    if npm install --only=dev --silent; then
        success_msg "Development dependencies installed"
    else
        warn_msg "Development dependencies install failed, but continuing..."
    fi
    
    show_progress 3 3 "Dependencies installation complete"
}

# Build the project
build_project() {
    info_msg "Building Claude Code Router..."
    
    cd "$SCRIPT_DIR"
    
    show_progress 1 2 "Building server..."
    if npm run build:server >/dev/null 2>&1; then
        success_msg "Server built successfully"
    else
        error_exit "Failed to build server"
    fi
    
    show_progress 2 2 "Building web UI..."
    if npm run build:ui >/dev/null 2>&1; then
        success_msg "Web UI built successfully"
    else
        error_exit "Failed to build web UI"
    fi
}

# Create configuration file
create_config() {
    info_msg "Creating configuration file..."
    
    local config_file="$CONFIG_DIR/config.json"
    
    if [[ ! -f "$config_file" ]]; then
        if cp "$SCRIPT_DIR/config.example.json" "$config_file"; then
            success_msg "Configuration file created: $config_file"
            warn_msg "Please edit $config_file and add your API keys"
        else
            error_exit "Failed to create configuration file"
        fi
    else
        info_msg "Configuration file already exists: $config_file"
    fi
}

# Clean up existing Docker installations
cleanup_docker_installation() {
    info_msg "Cleaning up any existing Docker installations..."
    
    # Stop and remove Docker containers
    if command -v docker >/dev/null 2>&1; then
        if docker ps --filter "name=claude-code-router" --format "table {{.Names}}" | grep -q claude-code-router; then
            info_msg "Stopping existing Docker containers..."
            docker stop claude-code-router 2>/dev/null || true
            docker rm claude-code-router 2>/dev/null || true
            success_msg "Docker containers cleaned up"
        fi
    fi
}

# Install ccr command
install_ccr_command() {
    info_msg "Installing ccr command..."
    
    local ccr_script="/usr/local/bin/ccr"
    
    # Create the ccr wrapper script
    cat > /tmp/ccr << EOF
#!/bin/bash
# Claude Code Router wrapper script

# Store the current directory
ORIGINAL_DIR="\$(pwd)"

# For the 'code' command, we need to stay in the user's directory
if [ "\$1" = "code" ]; then
    # Run the CLI from its directory but preserve the working directory
    exec node "$SCRIPT_DIR/dist/cli.js" "\$@"
else
    # For other commands, change to the project directory
    cd "$SCRIPT_DIR"
    exec node dist/cli.js "\$@"
fi
EOF
    
    if sudo mv /tmp/ccr "$ccr_script" && sudo chmod +x "$ccr_script"; then
        success_msg "ccr command installed to $ccr_script"
    else
        error_exit "Failed to install ccr command (sudo required)"
    fi
}

# Install systemd service (optional)
install_systemd_service() {
    if [[ "$OS" != "linux" ]]; then
        info_msg "Systemd service installation skipped (not Linux)"
        return 0
    fi
    
    echo
    read -p "${CYAN}${GEAR} Would you like to install as a systemd service? (y/N): ${NC}" -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        info_msg "Installing systemd service..."
        
        # Create service file with current user
        local service_file="/tmp/claude-code-router.service"
        
        cat > "$service_file" << EOF
[Unit]
Description=Claude Code Router - LLM routing service with Web UI
After=network.target

[Service]
Type=simple
User=$USER
Group=$USER
WorkingDirectory=$SCRIPT_DIR
Environment="NODE_ENV=production"
Environment="PATH=/usr/local/bin:/usr/bin:/bin"
ExecStart=$SCRIPT_DIR/start-service.sh
Restart=always
RestartSec=10
StandardOutput=append:$CONFIG_DIR/logs/service.log
StandardError=append:$CONFIG_DIR/logs/service-error.log

# Service hardening
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=read-only
ReadWritePaths=$CONFIG_DIR
ReadWritePaths=/tmp

[Install]
WantedBy=multi-user.target
EOF
        
        # Install service
        if sudo mv "$service_file" /etc/systemd/system/ && \
           sudo systemctl daemon-reload && \
           sudo systemctl enable claude-code-router; then
            success_msg "Systemd service installed and enabled"
            info_msg "Start with: sudo systemctl start claude-code-router"
            info_msg "Stop with:  sudo systemctl stop claude-code-router"
            info_msg "Status:     sudo systemctl status claude-code-router"
        else
            warn_msg "Failed to install systemd service, but continuing..."
        fi
    else
        info_msg "Systemd service installation skipped"
    fi
}

# Set up start service script
create_start_script() {
    info_msg "Creating start service script..."
    
    local start_script="$SCRIPT_DIR/start-service.sh"
    
    cat > "$start_script" << EOF
#!/bin/bash
# Start script for Claude Code Router with Web UI

# Ensure we're using the local installation
cd "$SCRIPT_DIR"

# Start the service with web UI
exec /usr/bin/node dist/cli.js start --foreground
EOF
    
    if chmod +x "$start_script"; then
        success_msg "Start script created: $start_script"
    else
        error_exit "Failed to create start script"
    fi
}

# Verify installation
verify_installation() {
    info_msg "Verifying installation..."
    
    local checks=0
    local passed=0
    
    # Check ccr command
    ((checks++))
    if command -v ccr >/dev/null 2>&1; then
        success_msg "ccr command is available"
        ((passed++))
    else
        warn_msg "ccr command not found in PATH"
    fi
    
    # Check configuration file
    ((checks++))
    if [[ -f "$CONFIG_DIR/config.json" ]]; then
        success_msg "Configuration file exists"
        ((passed++))
    else
        warn_msg "Configuration file not found"
    fi
    
    # Check build files
    ((checks++))
    if [[ -f "$SCRIPT_DIR/dist/cli.js" ]]; then
        success_msg "Server build files exist"
        ((passed++))
    else
        warn_msg "Server build files not found"
    fi
    
    ((checks++))
    if [[ -f "$SCRIPT_DIR/dist/web/bundle.js" ]]; then
        success_msg "Web UI build files exist"
        ((passed++))
    else
        warn_msg "Web UI build files not found"
    fi
    
    # Check Claude Code
    ((checks++))
    if command -v claude >/dev/null 2>&1; then
        success_msg "Claude Code is available"
        ((passed++))
    else
        warn_msg "Claude Code not found"
    fi
    
    info_msg "Verification complete: $passed/$checks checks passed"
    
    if [[ $passed -eq $checks ]]; then
        return 0
    else
        return 1
    fi
}

# Security recommendations
show_security_recommendations() {
    echo -e "\n${SHIELD} ${WHITE}Security Recommendations:${NC}"
    echo -e "${YELLOW}${WARNING}${NC} Keep your API keys secure and never commit them to version control"
    echo -e "${YELLOW}${WARNING}${NC} Use environment variables for sensitive configuration when possible"
    echo -e "${YELLOW}${WARNING}${NC} Regularly update your dependencies for security patches"
    echo -e "${YELLOW}${WARNING}${NC} Consider using a firewall to restrict access to ports 3456 and 3457"
    echo -e "${YELLOW}${WARNING}${NC} Review the configuration file permissions: $CONFIG_DIR/config.json"
}

# Show next steps
show_next_steps() {
    echo -e "\n${ROCKET} ${WHITE}Next Steps:${NC}"
    echo -e "${GREEN}1.${NC} Edit your configuration: ${CYAN}$CONFIG_DIR/config.json${NC}"
    echo -e "${GREEN}2.${NC} Add your API keys for the providers you want to use"
    echo -e "${GREEN}3.${NC} Start the service: ${CYAN}ccr start${NC}"
    echo -e "${GREEN}4.${NC} Open the Web UI: ${CYAN}ccr ui${NC} or visit ${CYAN}http://localhost:3457/ui${NC}"
    echo -e "${GREEN}5.${NC} Test with: ${CYAN}ccr code \"Hello world\"${NC}"
    
    echo -e "\n${COMPUTER} ${WHITE}Available Commands:${NC}"
    echo -e "${CYAN}ccr start${NC}   - Start the router service"
    echo -e "${CYAN}ccr stop${NC}    - Stop the router service"
    echo -e "${CYAN}ccr status${NC}  - Check service status"
    echo -e "${CYAN}ccr ui${NC}      - Open the Web UI"
    echo -e "${CYAN}ccr code${NC}    - Run Claude Code through the router"
    echo -e "${CYAN}ccr restart${NC} - Restart the service"
    
    echo -e "\n${GLOBE} ${WHITE}Web UI Features:${NC}"
    echo -e "${CYAN}•${NC} Visual provider management"
    echo -e "${CYAN}•${NC} Router configuration"
    echo -e "${CYAN}•${NC} Real-time testing"
    echo -e "${CYAN}•${NC} Import/Export configurations"
    echo -e "${CYAN}•${NC} Ollama model discovery"
    echo -e "${CYAN}•${NC} Command generator"
}

# Clean up on exit
cleanup() {
    local exit_code=$?
    if [[ $exit_code -ne 0 ]]; then
        echo -e "\n${RED}${CROSS_MARK} Installation interrupted${NC}"
        info_msg "Check the log file for details: $LOG_FILE"
    fi
    exit $exit_code
}

# Main installation function
main() {
    # Set up signal handlers
    trap cleanup EXIT INT TERM
    
    # Start installation
    print_header
    info_msg "Starting Claude Code Router installation..."
    info_msg "Installation log: $LOG_FILE"
    
    local total_steps=13
    local current_step=0
    
    # Step 1: System detection
    current_step=$((current_step + 1))
    show_progress $current_step $total_steps "Detecting system"
    detect_system
    
    # Step 2: Prerequisites check
    current_step=$((current_step + 1))
    show_progress $current_step $total_steps "Checking prerequisites"
    check_prerequisites
    
    # Step 3: Install Claude Code
    current_step=$((current_step + 1))
    show_progress $current_step $total_steps "Installing Claude Code"
    install_claude_code
    
    # Step 4: Backup existing config
    current_step=$((current_step + 1))
    show_progress $current_step $total_steps "Backing up existing configuration"
    backup_existing_config
    
    # Step 5: Clean up Docker installations
    current_step=$((current_step + 1))
    show_progress $current_step $total_steps "Cleaning up Docker installations"
    cleanup_docker_installation
    
    # Step 6: Create directories
    current_step=$((current_step + 1))
    show_progress $current_step $total_steps "Creating directories"
    create_directories
    
    # Step 7: Install dependencies
    current_step=$((current_step + 1))
    show_progress $current_step $total_steps "Installing dependencies"
    install_dependencies
    
    # Step 8: Build project
    current_step=$((current_step + 1))
    show_progress $current_step $total_steps "Building project"
    build_project
    
    # Step 9: Create configuration
    current_step=$((current_step + 1))
    show_progress $current_step $total_steps "Creating configuration"
    create_config
    
    # Step 10: Create start script
    current_step=$((current_step + 1))
    show_progress $current_step $total_steps "Creating start script"
    create_start_script
    
    # Step 11: Install ccr command
    current_step=$((current_step + 1))
    show_progress $current_step $total_steps "Installing ccr command"
    install_ccr_command
    
    # Step 12: Install systemd service (optional)
    current_step=$((current_step + 1))
    show_progress $current_step $total_steps "Installing systemd service"
    install_systemd_service
    
    # Step 13: Verify installation
    current_step=$((current_step + 1))
    show_progress $current_step $total_steps "Verifying installation"
    
    if verify_installation; then
        echo -e "\n${GREEN}${CHECK_MARK} ${WHITE}Installation completed successfully!${NC}"
        show_security_recommendations
        show_next_steps
        success_msg "Installation completed successfully at $(date)"
    else
        warn_msg "Installation completed with warnings. Some components may not be fully functional."
        info_msg "Check the log file for details: $LOG_FILE"
    fi
}

# Run main function
main "$@"