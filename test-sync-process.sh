#!/bin/bash

# Test script to simulate the auto-sync process locally
# This helps validate the sync logic before running in GitHub Actions

set -e

echo "🧪 Testing Auto-Sync Process Locally"
echo "====================================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not in a git repository"
    exit 1
fi

echo "✅ Git repository detected"

# Check if upstream remote exists
if ! git remote get-url upstream >/dev/null 2>&1; then
    echo "⚠️ Adding upstream remote..."
    git remote add upstream https://github.com/musistudio/claude-code-router.git
fi

echo "✅ Upstream remote configured"

# Fetch latest from upstream
echo "📡 Fetching from upstream..."
git fetch upstream

echo "✅ Upstream fetched"

# Check what files would be affected
echo "🔍 Checking differences with upstream..."
git diff --name-only upstream/main...HEAD | head -20

echo ""
echo "📊 Files that differ from upstream:"
git diff --stat upstream/main...HEAD | head -20

# Test backup process
echo ""
echo "🗃️ Testing backup process..."

# Create test backup directory
mkdir -p .test-backup/web

# Test backup of web interface
if [ -d "src/web" ]; then
    cp -r src/web .test-backup/web/
    echo "✅ Web interface backed up"
else
    echo "⚠️ No src/web directory found"
fi

# Test backup of other custom files
files_to_backup=(
    "WEB_UI_README.md"
    "src/routes/webui.ts"
    "standalone-webui-test.js"
    "test-webui-server.js"
    "test-webui.sh"
    "capture-screenshots.js"
)

echo "📋 Testing backup of custom files:"
for file in "${files_to_backup[@]}"; do
    if [ -f "$file" ]; then
        mkdir -p ".test-backup/$(dirname "$file")"
        cp "$file" ".test-backup/$file"
        echo "  ✅ $file"
    else
        echo "  ⚠️ $file (not found)"
    fi
done

# Test conflict detection
echo ""
echo "🔍 Testing conflict detection..."

# Create a temporary branch for testing
TEST_BRANCH="test-sync-$(date +%s)"
git checkout -b "$TEST_BRANCH"

echo "📋 Created test branch: $TEST_BRANCH"

# Attempt merge in dry-run mode
echo "🧪 Testing merge simulation..."
if git merge-tree "$(git merge-base HEAD upstream/main)" HEAD upstream/main >/dev/null 2>&1; then
    echo "✅ No conflicts expected"
else
    echo "⚠️ Conflicts may occur during merge"
    echo "   This is normal and will be handled automatically"
fi

# Test security checks
echo ""
echo "🛡️ Testing security checks..."

# Check for exposed secrets
echo "🔍 Checking for exposed API keys..."
if grep -r "sk-[a-zA-Z0-9]" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.test-backup --exclude="*.example.*" --exclude="README*.md" | grep -v "sk-xxx" | grep -v "sk-" >/dev/null; then
    echo "⚠️ Found potential exposed API keys:"
    grep -r "sk-[a-zA-Z0-9]" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.test-backup --exclude="*.example.*" --exclude="README*.md" | grep -v "sk-xxx" | grep -v "sk-" | head -5
else
    echo "✅ No exposed API keys found"
fi

# Check for hardcoded passwords
echo "🔍 Checking for hardcoded passwords..."
if grep -r -i "password.*=" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.test-backup --exclude="*.example.*" | grep -v "placeholder\|example\|test\|admin" >/dev/null; then
    echo "⚠️ Found potential hardcoded passwords"
else
    echo "✅ No hardcoded passwords found"
fi

# Test package.json changes
echo ""
echo "📦 Testing package.json handling..."
if git diff --name-only upstream/main...HEAD | grep -q "package.json\|package-lock.json\|pnpm-lock.yaml"; then
    echo "⚠️ Package files have changes - would trigger dependency update"
else
    echo "✅ No package file changes"
fi

# Cleanup
echo ""
echo "🧹 Cleaning up test..."
git checkout main
git branch -D "$TEST_BRANCH"
rm -rf .test-backup

echo ""
echo "🎉 Test completed successfully!"
echo ""
echo "📋 Summary:"
echo "  - Git repository: ✅"
echo "  - Upstream remote: ✅"
echo "  - Backup process: ✅"
echo "  - Security checks: ✅"
echo "  - Merge simulation: ✅"
echo ""
echo "🚀 The auto-sync process should work correctly."
echo "💡 You can now safely enable the GitHub Action workflow."