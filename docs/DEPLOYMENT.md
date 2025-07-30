# Deployment Guide

## Table of Contents

- [Docker Deployment](#docker-deployment)
- [Production Deployment](#production-deployment)
- [Kubernetes Deployment](#kubernetes-deployment)
- [Cloud Deployment](#cloud-deployment)
- [SSL/HTTPS Setup](#sslhttps-setup)
- [Monitoring & Logging](#monitoring--logging)
- [Backup & Restore](#backup--restore)

## Docker Deployment

### Quick Start

```bash
# Clone repository
git clone https://github.com/musistudio/claude-code-router.git
cd claude-code-router

# Run with default settings
docker-compose up -d

# Access services
# API: http://localhost:3000
# Web UI: http://localhost:3001
```

### Environment Configuration

Create `.env` file:

```bash
# Essential configuration
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key

# Optional configuration
PORT=3000
WEB_UI_PORT=3001
LOG_LEVEL=info
HOST=0.0.0.0
APIKEY=your-secret-key
PROXY_URL=http://proxy:8080
API_TIMEOUT_MS=600000
```

### Docker Compose Examples

#### Development
```yaml
# docker-compose.yml
version: '3.8'
services:
  claude-code-router:
    build: .
    ports:
      - "3000:3000"
      - "3001:3001"
    env_file: .env
    volumes:
      - ./config:/app/config
      - ./logs:/app/logs
    restart: unless-stopped
```

#### Production
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  claude-code-router:
    image: musistudio/claude-code-router:latest
    ports:
      - "3000:3000"
      - "3001:3001"
    env_file: .env
    volumes:
      - ccr-config:/app/config
      - ccr-logs:/app/logs
    restart: unless-stopped
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - claude-code-router
    restart: unless-stopped

volumes:
  ccr-config:
  ccr-logs:
```

## Production Deployment

### Server Requirements

Minimum:
- CPU: 1 vCPU
- RAM: 512MB
- Disk: 2GB
- Network: 1Mbps

Recommended:
- CPU: 2 vCPUs
- RAM: 2GB
- Disk: 10GB SSD
- Network: 100Mbps

### Production Setup Steps

1. **Prepare Server**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker groups
sudo usermod -aG docker $USER
```

2. **Configure Environment**
```bash
# Create project directory
mkdir ~/claude-router
cd ~/claude-router

# Create environment file
cat > .env << EOF
OPENAI_API_KEY=sk-your-key
ANTHROPIC_API_KEY=sk-ant-key
PORT=3000
WEB_UI_PORT=3001
LOG_LEVEL=info
HOST=0.0.0.0
APIKEY=your-secure-key
EOF

# Set secure permissions
chmod 600 .env
```

3. **Setup Nginx with SSL**
```bash
# Install Nginx
sudo apt install nginx -y

# Create nginx configuration
sudo cat > /etc/nginx/sites-available/claude-router << EOF
upstream claude-router {
    server localhost:3000;
}

upstream claude-webui {
    server localhost:3001;
}

server {
    listen 80;
    server_name your-domain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /etc/ssl/certs/your-domain.crt;
    ssl_certificate_key /etc/ssl/private/your-domain.key;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    location / {
        proxy_pass http://claude-webui;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-Host \$host;
        proxy_set_header X-Forwarded-Port \$server_port;
    }
    
    location /api {
        proxy_pass http://claude-router;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-Host \$host;
        proxy_set_header X-Forwarded-Port \$server_port;
        
        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/claude-router /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

4. **Setup SSL Certificate**
```bash
# Using Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com

# Automatic renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Kubernetes Deployment

### Basic Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: claude-code-router
  labels:
    app: claude-code-router
spec:
  replicas: 1
  selector:
    matchLabels:
      app: claude-code-router
  template:
    metadata:
      labels:
        app: claude-code-router
    spec:
      containers:
      - name: claude-code-router
        image: musistudio/claude-code-router:latest
        ports:
        - containerPort: 3000
          name: api
        - containerPort: 3001
          name: webui
        env:
        - name: OPENAI_API_KEY
          valueFrom:
            secretKeyRef:
              name: claude-secrets
              key: openai-key
        - name: ANTHROPIC_API_KEY
          valueFrom:
            secretKeyRef:
              name: claude-secrets
              key: anthropic-key
        - name: HOST
          value: "0.0.0.0"
        volumeMounts:
        - name: config
          mountPath: /app/config
        - name: logs
          mountPath: /app/logs
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
      volumes:
      - name: config
        configMap:
          name: claude-config
      - name: logs
        emptyDir: {}
---
apiVersion: v1
kind: Service
metadata:
  name: claude-code-router
  labels:
    app: claude-code-router
spec:
  selector:
    app: claude-code-router
  ports:
  - name: api
    port: 3000
    targetPort: 3000
  - name: webui
    port: 3001
    targetPort: 3001
  type: ClusterIP
---
apiVersion: v1
kind: Secret
metadata:
  name: claude-secrets
type: Opaque
data:
  openai-key: c2steW91ci1rZXk=  # base64 encoded
  anthropic-key: c2stYW50LWtleQ==
```

### Helm Chart

Create `values.yaml`:

```yaml
apiKey: your-secret-key
providers:
  openai:
    apiKey: sk-openai-key
    enabled: true
  anthropic:
    apiKey: sk-anthropic-key
    enabled: true

ingress:
  enabled: true
  className: nginx
  hostname: claude.your-domain.com
  tls:
    enabled: true
    secretName: claude-tls

resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 512Mi
```

Install with Helm:
```bash
helm repo add claude-repo https://helm.musistudio.com
helm install claude-router claude-repo/claude-code-router -f values.yaml
```

## Cloud Deployment

### AWS ECS (Fargate)

1. **Create Task Definition** (task-definition.json):
```json
{
  "family": "claude-code-router",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "containerDefinitions": [
    {
      "name": "claude-code-router",
      "image": "musistudio/claude-code-router:latest",
      "portMappings": [
        {"containerPort": 3000, "protocol": "tcp"},
        {"containerPort": 3001, "protocol": "tcp"}
      ],
      "environment": [
        {"name": "OPENAI_API_KEY", "value": "sk-secret"},
        {"name": "ANTHROPIC_API_KEY", "value": "sk-secret"}
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/claude-code-router",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

2. **Deploy with AWS CLI**:
```bash
# Register task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Create cluster
aws ecs create-cluster --cluster-name claude-cluster

# Create service
aws ecs create-service \
  --cluster claude-cluster \
  --service-name claude-service \
  --task-definition claude-code-router:latest \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-123],securityGroups=[sg-123]}"
```

### Google Cloud Run

```bash
# Deploy to Cloud Run
gcloud run deploy claude-code-router \
  --image musistudio/claude-code-router:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "OPENAI_API_KEY=sk-secret,ANTHROPIC_API_KEY=sk-secret" \
  --port 3000
```

### Azure Container Instances

```bash
# Create ACI
az container create \
  --resource-group myResourceGroup \
  --name claude-code-router \
  --image musistudio/claude-code-router:latest \
  --ports 3000 3001 \
  --environment-variables \
    OPENAI_API_KEY=sk-secret \
    ANTHROPIC_API_KEY=sk-secret \
  --cpu 1 \
  --memory 2
```

## SSL/HTTPS Setup

### Using Certbot (Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test renewal
sudo certbot renew --dry-run
```

### Manual SSL Configuration

1. **Upload certificate files**:
```bash
# Create SSL directory
sudo mkdir -p /etc/ssl/certs
sudo mkdir -p /etc/ssl/private

# Copy certificate and key
sudo cp your-certificate.crt /etc/ssl/certs/
sudo cp your-private.key /etc/ssl/private/

# Set permissions
sudo chmod 644 /etc/ssl/certs/your-certificate.crt
sudo chmod 600 /etc/ssl/private/your-private.key
```

2. **Configure Nginx**:
```nginx
group ssl-protocols {
        # TLSv1 and TLSv1.1 are considered insecure and disabled
        # TLSv1.2 and TLSv1.3 are enabled
        protocol TLSv1.2;
        protocol TLSv1.3;
}

server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /etc/ssl/certs/your-certificate.crt;
    ssl_certificate_key /etc/ssl/private/your-private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
}
```

### Using Cloudflare SSL

1. **Set up domain with Cloudflare**
2. **Enable proxy mode** (orange cloud)
3. **SSL/TLS encryption mode**: Full (strict)
4. **Origin certificates**:
   - Install Cloudflare's Origin certificate
   - Use Cloudflare's strict SSL mode

## Monitoring & Logging

### Application Logs

```bash
# Docker logs
docker-compose logs -f claude-code-router

# Access logs in container
docker-compose exec claude-code-router tail -f /app/logs/app.log
```

### Integration with Monitoring Tools

#### Prometheus Metrics

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'claude-code-router'
    static_configs:
      - targets: ['localhost:3000']
    metrics_path: /metrics
    scrape_interval: 5s
```

#### Log Aggregation with ELK Stack

```yaml
# Filebeat configuration
filebeat.yml
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /path/to/claude-router/logs/*.log

output.elasticsearch:
  hosts: ["localhost:9200"]
  index: "claude-router-logs-%{+YYYY.MM.dd}"
```

#### Health Monitoring with Uptime Kuma

```bash
docker run -d \
  --name uptime-kuma \
  -p 3002:3001 \
  -v uptime-kuma:/app/data \
  louislam/uptime-kuma:latest
```

### Alerting Rules

#### Prometheus Alert Rules

```yaml
# alert-rules.yml
groups:
- name: claude-router
  rules:
  - alert: HighMemoryUsage
    expr: memory_usage_bytes / memory_limit_bytes > 0.9
    for: 5m
    annotations:
      summary: High memory usage detected
      description: "Memory usage is above 90% on {{ $labels.instance }}"
```

## Backup & Restore

### Configuration Backup

```bash
# Backup configuration and logs
tar -czf claude-router-backup-$(date +%Y%m%d-%H%M%S).tar.gz \
  /path/to/config/ \
  /path/to/logs/

# Upload to S3
aws s3 cp claude-router-backup-*.tar.gz s3://your-backup-bucket/
```

### Automated Backup Script

Create `backup.sh`:

```bash
#!/bin/bash
DATE=$(date +%Y%m%d-%H%M%S)
BACKUP_DIR="/backups/claude-router"
BACKUP_FILE="claude-router-backup-${DATE}.tar.gz"

# Create backup directory
mkdir -p ${BACKUP_DIR}

# Backup configuration and data
tar -czf "${BACKUP_DIR}/${BACKUP_FILE}" \
  -C /home/$USER \
  .claude-code-router config.json logs/

# Clean old backups (keep 7 days)
find ${BACKUP_DIR} -name "*.tar.gz" -mtime +7 -delete

# Upload to cloud (optional)
aws s3 cp "${BACKUP_DIR}/${BACKUP_FILE}" s3://your-backup-bucket/

# Log backup completion
echo "$(date): Backup completed - ${BACKUP_FILE}" >> ${BACKUP_DIR}/backup.log
```

### Restore from Backup

```bash
# Stop service
ccr stop

# Restore backup
tar -xzf claude-router-backup-20240101-120000.tar.gz

# Confirm restore
ccr status
```

### Disaster Recovery

#### High Availability Setup

```yaml
# docker-compose.ha.yml
version: '3.8'
services:
  claude-router-1:
    image: musistudio/claude-code-router:latest
    # ... configuration for primary
  
  claude-router-2:
    image: musistudio/claude-code-router:latest
    # ... configuration for secondary
  
  nginx:
    image: nginx:alpine
    # ... load balancer configuration
  
  redis:
    image: redis:alpine
    # ... session storage for clustering
```

## Security Hardening

### Docker Security

```yaml
# docker-compose.secure.yml
services:
  claude-code-router:
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /tmp
    capabilities:
      drop:
        - ALL
```

### Linux Server Security

```bash
# Enable firewall
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# Disable password authentication
sudo nano /etc/ssh/sshd_config
# Set PasswordAuthentication no
sudo systemctl restart sshd

# Automatic security updates
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

### Network Security

```bash
# Rate limiting with fail2ban
sudo apt install fail2ban

# Configure fail2ban rules for nginx
sudo cat > /etc/fail2ban/jail.local << EOF
[nginx-http-auth]
enabled = true

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
action = iptables-multiport[name=ReqLimit, port="http,https", protocol=tcp]
logpath = /var/log/nginx/*.error.log
findtime = 600
bantime = 7200
maxretry = 10
EOF
```