# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package*.json pnpm-lock.yaml ./

# Install all dependencies (including devDependencies for build)
RUN pnpm install --include=dev

# Copy source code
COPY . .

# Build the project
RUN pnpm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install system dependencies and Claude Code CLI
RUN apk add --no-cache curl bash jq \
    && npm install -g pnpm \
    && npm install -g @anthropic-ai/claude-code

# Copy package files
COPY package*.json pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Copy necessary runtime files
COPY config.example.json ./
COPY docker-config.json ./
COPY docker-entrypoint.sh ./

# Make entrypoint script executable
RUN chmod +x docker-entrypoint.sh

# Create config directory for default setup
RUN mkdir -p /root/.claude-code-router

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3456/ || exit 1

# Expose ports for main service and WebUI
EXPOSE 3456 3457

# Use entrypoint script to initialize config before starting service
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "dist/cli.js", "start", "--foreground"]
