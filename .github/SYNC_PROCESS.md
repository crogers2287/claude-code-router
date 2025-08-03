# Automatic Sync Process

This document explains how the automatic sync with upstream works and what files are protected during the process.

## Overview

The repository automatically syncs with the upstream `musistudio/claude-code-router` repository daily at 6 AM UTC. The sync process preserves all custom web interface components and related functionality.

## Protected Files

The following files and directories are automatically preserved during sync:

### Core Web Interface
- `src/web/` - Entire custom web interface directory
  - `src/web/components/` - All React components
  - `src/web/index.tsx` - Main entry point
  - `src/web/components/styles.css` - Custom styles

### Backend Components
- `src/routes/webui.ts` - Web UI API routes
- `src/middleware/auth.ts` - Authentication middleware (if customized)

### Documentation & Testing
- `WEB_UI_README.md` - Custom web UI documentation
- `standalone-webui-test.js` - Web UI standalone testing
- `test-webui-server.js` - Web UI server testing
- `test-webui.sh` - Web UI shell testing script
- `capture-screenshots.js` - Screenshot automation

### Configuration
- Custom sections in `package.json` related to web UI builds
- Any UI-specific configuration files

## Sync Process

### 1. Daily Automatic Sync
- Runs every day at 6 AM UTC
- Can also be triggered manually via GitHub Actions

### 2. Conflict Resolution Strategy
1. **Upstream First**: Accept upstream changes for core router functionality
2. **Preserve Custom**: Keep our versions of web interface files
3. **Smart Merge**: Attempt automatic resolution of conflicts
4. **Manual Review**: Create PR for human review when conflicts occur

### 3. Merge Process
```bash
# 1. Backup custom files
mkdir -p .backup/web
cp -r src/web .backup/web/

# 2. Merge upstream changes
git merge upstream/main

# 3. Resolve conflicts (prefer upstream for core, ours for UI)
# 4. Restore custom web interface
cp -r .backup/web src/

# 5. Commit and create PR
```

## Manual Sync

If you need to sync manually:

```bash
# Add upstream remote (if not already added)
git remote add upstream https://github.com/musistudio/claude-code-router.git

# Fetch latest changes
git fetch upstream

# Run the sync workflow manually
gh workflow run sync-upstream.yml
```

## Security During Sync

The sync process includes security checks:
- Scans for exposed API keys or secrets
- Validates authentication implementation
- Checks for security headers
- Reviews Docker configuration security

## Troubleshooting

### Merge Conflicts
If the automatic resolution fails:
1. Check the created PR for conflict details
2. Manually resolve conflicts in the PR branch
3. Ensure custom web interface files are preserved
4. Test the web UI functionality after merge

### Missing Custom Files
If custom files are accidentally overwritten:
1. Check the backup created during sync (in `.backup/` directory)
2. Restore files from the backup
3. Re-commit the restored files

### Build Issues
If the build breaks after sync:
1. Check if package.json was modified upstream
2. Run `npm install` to update dependencies
3. Check if TypeScript types need updating
4. Verify web UI build process still works

## Testing After Sync

After each sync, test:
1. Core router functionality: `ccr start` and `ccr code "test"`
2. Web UI accessibility: Visit `http://localhost:3457/ui`
3. API endpoints: Test provider management and configuration
4. Authentication: Verify login still works
5. Build process: Run `npm run build` and `npm run build:ui`

## Rollback Process

If a sync causes issues:

```bash
# Find the commit before sync
git log --oneline | grep "Auto-sync"

# Create rollback branch
git checkout -b rollback-sync
git revert <sync-commit-hash>

# Test functionality
npm run build
ccr start

# Create PR for rollback if needed
```

## Customization Guidelines

To ensure your customizations survive syncs:

### ✅ Safe Locations for Custom Code
- `src/web/` directory - Fully protected
- `WEB_UI_README.md` - Protected documentation
- Custom test files with "webui" in filename
- `src/routes/webui.ts` - Protected backend routes

### ⚠️ Risky Locations
- Core router files (`src/utils/router.ts`)
- Main server files (`src/server.ts`, `src/index.ts`)
- CLI files (`src/cli.ts`)
- Package.json (dependencies may conflict)

### 🚫 Avoid Modifying
- README.md (will be overwritten)
- LICENSE file
- Core transformer files
- Example configuration files

## Contact

If you encounter issues with the sync process:
1. Check the GitHub Actions logs
2. Review the security report artifacts
3. Create an issue with sync logs attached