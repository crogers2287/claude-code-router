#!/bin/bash

# Claude Code Router Uninstall Script
# Comprehensive removal with backup options

set -euo pipefail

# Color codes
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly CYAN='\033[0;36m'
readonly WHITE='\033[1;37m'
readonly NC='\033[0m'

# Unicode symbols
readonly CHECK_MARK="✅"
readonly CROSS_MARK="❌"
readonly WARNING="⚠️"
readonly INFO="ℹ️"

# Global variables
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_DIR="$HOME/.claude-code-router"
UNINSTALL_TIMESTAMP=$(date '+%Y%m%d_%H%M%S')

# Logging function
log() {
    local level="$1"
    shift
    local message="$*"
    
    case "$level" in
        "ERROR")   echo -e "${RED}${CROSS_MARK} $message${NC}" ;;
        "WARN")    echo -e "${YELLOW}${WARNING} $message${NC}" ;;
        "SUCCESS") echo -e "${GREEN}${CHECK_MARK} $message${NC}" ;;
        "INFO")    echo -e "${BLUE}${INFO} $message${NC}" ;;
        *)         echo -e "${WHITE}$message${NC}" ;;
    esac
}

# Header
print_header() {
    clear
    echo -e "${RED}"
    cat << 'EOF'
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║        🗑️  Claude Code Router Uninstall Script 🗑️           ║
║                                                               ║
║                    Complete removal tool                      ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}\n"
}

# Confirm uninstall
confirm_uninstall() {
    echo -e "${YELLOW}${WARNING} This will remove Claude Code Router from your system.${NC}"
    echo -e "${CYAN}The following will be removed:${NC}"
    echo -e "  • ccr command (/usr/local/bin/ccr)"
    echo -e "  • systemd service (if installed)"
    echo -e "  • project files ($SCRIPT_DIR)"
    echo
    echo -e "${CYAN}Configuration directory will be handled separately.${NC}"
    echo
    
    read -p "Are you sure you want to uninstall Claude Code Router? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log "INFO" "Uninstall cancelled by user"
        exit 0
    fi
}

# Stop service
stop_service() {
    log "INFO" "Stopping Claude Code Router service..."
    
    # Stop via ccr command if available
    if command -v ccr >/dev/null 2>&1; then
        if ccr stop >/dev/null 2>&1; then
            log "SUCCESS" "Service stopped via ccr command"
        else
            log "WARN" "Failed to stop service via ccr command"
        fi
    fi
    
    # Stop systemd service if exists
    if systemctl is-active claude-code-router >/dev/null 2>&1; then
        if sudo systemctl stop claude-code-router 2>/dev/null; then
            log "SUCCESS" "Systemd service stopped"
        else
            log "WARN" "Failed to stop systemd service"
        fi
    fi
    
    # Kill any remaining processes
    if pkill -f "claude-code-router" 2>/dev/null; then
        log "SUCCESS" "Killed remaining processes"
    fi
}

# Remove systemd service
remove_systemd_service() {
    log "INFO" "Removing systemd service..."
    
    local service_file="/etc/systemd/system/claude-code-router.service"
    
    if [[ -f "$service_file" ]]; then
        # Disable and remove service
        if sudo systemctl disable claude-code-router 2>/dev/null && \
           sudo rm -f "$service_file" && \
           sudo systemctl daemon-reload; then
            log "SUCCESS" "Systemd service removed"
        else
            log "WARN" "Failed to remove systemd service"
        fi
    else
        log "INFO" "No systemd service found"
    fi
}

# Remove ccr command
remove_ccr_command() {
    log "INFO" "Removing ccr command..."
    
    local ccr_script="/usr/local/bin/ccr"
    
    if [[ -f "$ccr_script" ]]; then
        if sudo rm -f "$ccr_script"; then
            log "SUCCESS" "ccr command removed from $ccr_script"
        else
            log "WARN" "Failed to remove ccr command (check sudo permissions)"
        fi
    else
        log "INFO" "ccr command not found"
    fi
}

# Handle configuration directory
handle_config_directory() {
    if [[ ! -d "$CONFIG_DIR" ]]; then
        log "INFO" "No configuration directory found"
        return 0
    fi
    
    echo
    echo -e "${CYAN}Configuration directory found: $CONFIG_DIR${NC}"
    echo -e "${CYAN}This contains your API keys and settings.${NC}"
    echo
    echo -e "${CYAN}Choose an option:${NC}"
    echo -e "  1) Keep configuration (recommended for reinstall)"
    echo -e "  2) Backup configuration and remove"
    echo -e "  3) Remove configuration permanently"
    echo
    
    while true; do
        read -p "Enter your choice (1-3): " -n 1 -r
        echo
        
        case $REPLY in
            1)
                log "INFO" "Keeping configuration directory: $CONFIG_DIR"
                break
                ;;
            2)
                backup_and_remove_config
                break
                ;;
            3)
                remove_config_permanently
                break
                ;;
            *)
                echo -e "${RED}Invalid choice. Please enter 1, 2, or 3.${NC}"
                ;;
        esac
    done
}

# Backup and remove configuration
backup_and_remove_config() {
    log "INFO" "Creating backup of configuration..."
    
    local backup_dir="$HOME/claude-code-router-backups"
    local backup_file="$backup_dir/config_backup_$UNINSTALL_TIMESTAMP.tar.gz"
    
    mkdir -p "$backup_dir"
    
    if tar -czf "$backup_file" -C "$HOME" ".claude-code-router" 2>/dev/null; then
        log "SUCCESS" "Configuration backed up to: $backup_file"
        
        if rm -rf "$CONFIG_DIR"; then
            log "SUCCESS" "Configuration directory removed"
        else
            log "WARN" "Failed to remove configuration directory"
        fi
    else
        log "ERROR" "Failed to create backup"
        return 1
    fi
}

# Remove configuration permanently
remove_config_permanently() {
    echo -e "${RED}${WARNING} This will permanently delete all your API keys and settings!${NC}"
    read -p "Are you absolutely sure? Type 'DELETE' to confirm: " -r
    
    if [[ "$REPLY" == "DELETE" ]]; then
        if rm -rf "$CONFIG_DIR"; then
            log "SUCCESS" "Configuration directory permanently removed"
        else
            log "WARN" "Failed to remove configuration directory"
        fi
    else
        log "INFO" "Configuration removal cancelled"
    fi
}

# Remove project files
remove_project_files() {
    echo
    read -p "Remove project files from $SCRIPT_DIR? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log "INFO" "Removing project files..."
        
        # Don't remove if we're in the project directory
        if [[ "$(pwd)" == "$SCRIPT_DIR"/* ]]; then
            log "WARN" "Cannot remove project files while inside project directory"
            log "INFO" "Please run this script from outside $SCRIPT_DIR"
            return 1
        fi
        
        if rm -rf "$SCRIPT_DIR"; then
            log "SUCCESS" "Project files removed from $SCRIPT_DIR"
        else
            log "WARN" "Failed to remove project files"
        fi
    else
        log "INFO" "Project files kept at $SCRIPT_DIR"
    fi
}

# Remove Claude Code (optional)
remove_claude_code() {
    if ! command -v claude >/dev/null 2>&1; then
        log "INFO" "Claude Code not found, skipping"
        return 0
    fi
    
    echo
    echo -e "${CYAN}Claude Code is installed on your system.${NC}"
    echo -e "${CYAN}This may be used by other applications.${NC}"
    read -p "Remove Claude Code? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log "INFO" "Removing Claude Code..."
        if npm uninstall -g @anthropic-ai/claude-code; then
            log "SUCCESS" "Claude Code removed"
        else
            log "WARN" "Failed to remove Claude Code"
        fi
    else
        log "INFO" "Claude Code kept on system"
    fi
}

# Verify removal
verify_removal() {
    log "INFO" "Verifying removal..."
    
    local issues=0
    
    # Check ccr command
    if command -v ccr >/dev/null 2>&1; then
        log "WARN" "ccr command still found in PATH"
        ((issues++))
    else
        log "SUCCESS" "ccr command removed"
    fi
    
    # Check systemd service
    if systemctl list-unit-files | grep -q claude-code-router 2>/dev/null; then
        log "WARN" "systemd service still exists"
        ((issues++))
    else
        log "SUCCESS" "systemd service removed"
    fi
    
    # Check processes
    if pgrep -f "claude-code-router" >/dev/null 2>&1; then
        log "WARN" "Claude Code Router processes still running"
        ((issues++))
    else
        log "SUCCESS" "No running processes found"
    fi
    
    if [[ $issues -eq 0 ]]; then
        log "SUCCESS" "Uninstall verification passed"
        return 0
    else
        log "WARN" "Uninstall verification found $issues issues"
        return 1
    fi
}

# Show completion message
show_completion() {
    echo
    log "SUCCESS" "Claude Code Router uninstall completed"
    
    if [[ -d "$CONFIG_DIR" ]]; then
        echo -e "${CYAN}${INFO} Configuration preserved at: $CONFIG_DIR${NC}"
    fi
    
    if [[ -d "$SCRIPT_DIR" ]]; then
        echo -e "${CYAN}${INFO} Project files preserved at: $SCRIPT_DIR${NC}"
    fi
    
    echo -e "\n${CYAN}Thank you for using Claude Code Router!${NC}"
    echo -e "${CYAN}If you reinstall, your configuration will be preserved.${NC}"
}

# Main uninstall function
main() {
    print_header
    
    confirm_uninstall
    
    log "INFO" "Starting Claude Code Router uninstall..."
    
    # Stop service
    stop_service
    
    # Remove components
    remove_systemd_service
    remove_ccr_command
    
    # Handle configuration
    handle_config_directory
    
    # Remove project files
    remove_project_files
    
    # Optional: Remove Claude Code
    remove_claude_code
    
    # Verify removal
    verify_removal
    
    # Show completion
    show_completion
    
    log "SUCCESS" "Uninstall process completed at $(date)"
}

# Run main function
main "$@"