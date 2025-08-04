#!/bin/bash
# Claude Code Router Installation Script (Non-Docker Version)

set -e

echo "🚀 Claude Code Router Installation"
echo "=================================="

# Check if running as root
if [ "$EUID" -eq 0 ]; then
   echo "⚠️  Warning: Running as root. Consider running as a regular user."
fi

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ npm $(npm -v) detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Build the project
echo ""
echo "🔨 Building Claude Code Router..."
npm run build

# Create config directory if it doesn't exist
CONFIG_DIR="$HOME/.claude-code-router"
if [ ! -d "$CONFIG_DIR" ]; then
    echo ""
    echo "📁 Creating configuration directory..."
    mkdir -p "$CONFIG_DIR"
fi

# Copy example config if no config exists
if [ ! -f "$CONFIG_DIR/config.json" ]; then
    echo ""
    echo "📝 Creating default configuration..."
    cp config.example.json "$CONFIG_DIR/config.json"
    echo "⚠️  Please edit $CONFIG_DIR/config.json and add your API keys"
fi

# Install ccr command
echo ""
echo "🔧 Installing ccr command..."
cat > /tmp/ccr << EOF
#!/bin/bash
# Claude Code Router wrapper script

# Store the current directory
ORIGINAL_DIR="\$(pwd)"

# For the 'code' command, we need to stay in the user's directory
if [ "\$1" = "code" ]; then
    # Run the CLI from its directory but preserve the working directory
    exec node "$PWD/dist/cli.js" "\$@"
else
    # For other commands, change to the project directory
    cd "$PWD"
    exec node dist/cli.js "\$@"
fi
EOF

sudo mv /tmp/ccr /usr/local/bin/ccr
sudo chmod +x /usr/local/bin/ccr

# Install systemd service (optional)
echo ""
read -p "Would you like to install as a systemd service? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📋 Installing systemd service..."
    
    # Update the service file with the correct user
    sed "s/User=crogers2287/User=$USER/g" claude-code-router.service > /tmp/claude-code-router.service
    sed -i "s/Group=crogers2287/Group=$USER/g" /tmp/claude-code-router.service
    sed -i "s|WorkingDirectory=/home/crogers2287/claude-code-router|WorkingDirectory=$PWD|g" /tmp/claude-code-router.service
    sed -i "s|ExecStart=/home/crogers2287/claude-code-router/start-service.sh|ExecStart=$PWD/start-service.sh|g" /tmp/claude-code-router.service
    sed -i "s|ReadWritePaths=/home/crogers2287/.claude-code-router|ReadWritePaths=$HOME/.claude-code-router|g" /tmp/claude-code-router.service
    
    sudo mv /tmp/claude-code-router.service /etc/systemd/system/
    sudo systemctl daemon-reload
    sudo systemctl enable claude-code-router
    
    echo "✅ Systemd service installed"
    echo "   Start with: sudo systemctl start claude-code-router"
    echo "   Stop with:  sudo systemctl stop claude-code-router"
    echo "   Status:     sudo systemctl status claude-code-router"
fi

echo ""
echo "✅ Installation complete!"
echo ""
echo "🎯 Next steps:"
echo "   1. Edit your configuration: $CONFIG_DIR/config.json"
echo "   2. Start the service: ccr start"
echo "   3. Open the Web UI: ccr ui (or visit http://localhost:3457/ui)"
echo "   4. Test with: ccr code 'Hello world'"
echo ""
echo "📚 Available commands:"
echo "   ccr start   - Start the router service"
echo "   ccr stop    - Stop the router service"
echo "   ccr status  - Check service status"
echo "   ccr ui      - Open the Web UI"
echo "   ccr code    - Run Claude Code through the router"
echo ""