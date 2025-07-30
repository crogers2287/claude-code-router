# API Documentation

## Overview

Claude Code Router provides a RESTful API for managing configuration, monitoring status, and controlling the router service. The API follows RESTful principles with JSON responses.

## Base URL

```
http://localhost:3000
```

## Authentication

If `APIKEY` is configured in your settings, include it in requests:

```
Authorization: Bearer your-api-key
```

or

```
x-api-key: your-api-key
```

## Health Check

### GET /health

Check service health status.

```
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "uptime": 3600,
  "version": "1.0.28"
}
```

## Configuration Management

### GET /config

Get current configuration.

```
GET /config
```

**Response:**
```json
{
  "apiPort": 3000,
  "webUIPort": 3001,
  "logLevel": "info",
  "providers": [
    {
      "name": "openai",
      "api_base_url": "https://api.openai.com/v1/chat/completions",
      "api_key": "sk-***",
      "models": ["gpt-4", "gpt-3.5-turbo"]
    }
  ],
  "routes": {
    "default": "openai,gpt-4"
  }
}
```

### POST /config

Update configuration (partial updates supported).

```
POST /config
Content-Type: application/json

{
  "providers": [
    {
      "name": "new-provider",
      "api_base_url": "https://api.example.com/chat/completions",
      "api_key": "sk-new-key",
      "models": ["new-model"]
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Configuration updated",
  "restartRequired": false
}
```

### PUT /config

Replace entire configuration.

```
PUT /config
Content-Type: application/json

{
  "apiPort": 3000,
  "webUIPort": 3001,
  "logLevel": "debug",
  "providers": [...],
  "routes": {...}
}
```

## Provider Management

### GET /providers

List all providers.

```
GET /providers
```

**Response:**
```json
[
  {
    "name": "openai",
    "type": "openai",
    "status": "active",
    "modelCount": 2,
    "lastUsed": "2024-01-01T12:00:00.000Z"
  },
  {
    "name": "anthropic",
    "type": "anthropic",
    "status": "active",
    "modelCount": 1,
    "lastUsed": "2024-01-01T12:00:00.000Z"
  }
]
```

### GET /providers/:name

Get specific provider details.

```
GET /providers/openai
```

**Response:**
```json
{
  "name": "openai",
  "type": "openai",
  "api_base_url": "https://api.openai.com/v1/chat/completions",
  "models": ["gpt-4", "gpt-3.5-turbo", "gpt-4-turbo-preview"],
  "status": "active",
  "lastUsed": "2024-01-01T12:00:00.000Z",
  "requestCount": 42
}
```

### POST /providers

Add a new provider.

```
POST /providers
Content-Type: application/json

{
  "name": "deepseek",
  "type": "openai",
  "api_base_url": "https://api.deepseek.com/chat/completions",
  "api_key": "sk-deepseek-key",
  "models": ["deepseek-chat", "deepseek-reasoner"],
  "transformer": {
    "use": ["deepseek"]
  }
}
```

### PUT /providers/:name

Update an existing provider.

```
PUT /providers/openai
Content-Type: application/json

{
  "models": ["gpt-4", "gpt-3.5-turbo", "gpt-4-turbo", "gpt-4-1106-preview"],
  "transformer": {
    "use": ["tooluse"]
  }
}
```

### DELETE /providers/:name

Remove a provider.

```
DELETE /providers/openai
```

**Response:**
```json
{
  "success": true,
  "message": "Provider 'openai' removed"
}
```

## Routing Management

### GET /routes

Get current routing rules.

```
GET /routes
```

**Response:**
```json
{
  "default": "openai,gpt-3.5-turbo",
  "background": "ollama,qwen2.5-coder:latest",
  "think": "openai,gpt-4",
  "longContext": "openai,gpt-4-1106-preview",
  "webSearch": "gemini,gemini-2.5-flash",
  "longContextThreshold": 60000
}
```

### POST /routes/:type

Update specific routing rule.

```
POST /routes/default
Content-Type: application/json

{
  "provider": "openai",
  "model": "gpt-4"
}
```

### GET /routes/current

Get the currently active route for context.

```
GET /routes/current
```

**Response:**
```json
{
  "route": "think",
  "provider": "openai",
  "model": "gpt-4",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Status & Monitoring

### GET /status

Get system status.

```
GET /status
```

**Response:**
```json
{
  "service": "running",
  "uptime": 3600,
  "memory": {
    "usage": 128000000,
    "limit": 512000000
  },
  "requestCount": 42,
  "activeConnections": 1,
  "providers": [
    {
      "name": "openai",
      "status": "healthy",
      "responseTime": 1200,
      "errorRate": 0.01
    }
  ]
}
```

### GET /logs

Get application logs.

```
GET /logs
```

**Query Parameters:**
- `level` (optional): Filter by log level (info, warn, error)
- `limit` (optional): Maximum number of log entries (default: 100)
- `search` (optional): Search string in logs

**Response:**
```json
[
  {
    "timestamp": "2024-01-01T12:00:00.000Z",
    "level": "info",
    "message": "Service started successfully",
    "details": {}
  },
  {
    "timestamp": "2024-01-01T12:00:01.000Z",
    "level": "info",
    "message": "Routing request to: openai,gpt-4",
    "details": {
      "prompt": "Explain...",
      "params": {}
    }
  }
]
```

### GET /metrics

Get performance metrics.

```
GET /metrics
```

**Response:**
```json
{
  "requests": {
    "total": 42,
    "successful": 40,
    "failed": 2,
    "averageResponseTime": 1234
  },
  "providers": {
    "openai": {
      "requests": 42,
      "averageResponseTime": 1234,
      "errorRate": 0.047
    }
  },
  "models": {
    "gpt-4": {
      "requests": 25,
      "averageResponseTime": 1500,
      "errorRate": 0.04
    },
    "gpt-3.5-turbo": {
      "requests": 17,
      "averageResponseTime": 800,
      "errorRate": 0.06
    }
  }
}
```

## Service Control

### POST /service/start

Start the router service.

```
POST /service/start
```

**Response:**
```json
{
  "success": true,
  "status": "started",
  "pid": 12345
}
```

### POST /service/stop

Stop the router service.

```
POST /service/stop
```

**Response:**
```json
{
  "success": true,
  "status": "stopped"
}
```

### POST /service/restart

Restart the router service.

```
POST /service/restart
```

### GET /service/logs/realtime

Subscribe to real-time logs (WebSocket).

```
GET /service/logs/realtime
```

## WebSocket Endpoints

### Log Streaming

Connect to real-time log stream:

```
ws://localhost:3000/logs/stream
```

### Conversation Management

Real-time conversation synchronization:

```
ws://localhost:3000/conversations/:id/live
```

## Error Responses

### Standard Error Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Missing required field: api_key",
    "details": {
      "field": "api_key",
      "provider": "openai"
    }
  }
}
```

### Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Invalid request data |
| `NOT_FOUND` | Resource not found |
| `UNAUTHORIZED` | Missing or invalid API key |
| `INTERNAL_ERROR` | Server error |
| `PROVIDER_ERROR` | Provider API error |
| `CONFIG_ERROR` | Configuration error |

## Rate Limiting

Rate limits apply per IP address:
- 100 requests per minute for configuration endpoints
- 1000 requests per minute for status/metrics endpoints

## SDK Examples

### Python

```python
import requests

api_key = "your-secret-key"
base_url = "http://localhost:3000"

# Check service health
response = requests.get(f"{base_url}/health")
print(response.json())

# Update configuration
config = {
    "providers": [
        {
            "name": "gpt4",
            "type": "openai",
            "apiKey": "sk-key",
            "models": ["gpt-4"]
        }
    ]
}

response = requests.post(
    f"{base_url}/config",
    json=config,
    headers={"Authorization": f"Bearer {api_key}"}
)
print(response.json())
```

### JavaScript/Node.js

```javascript
import fetch from 'node-fetch';

const API_BASE = 'http://localhost:3000';
const API_KEY = 'your-secret-key';

async function getStatus() {
  const response = await fetch(`${API_BASE}/status`, {
    headers: { 'Authorization': `Bearer ${API_KEY}` }
  });
  return await response.json();
}

async function addProvider(provider) {
  const response = await fetch(`${API_BASE}/providers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify(provider)
  });
  return await response.json();
}

getStatus().then(console.log);
```

### Go

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

type HealthCheck struct {
    Status    string    `json:"status"`
    Timestamp time.Time `json:"timestamp"`
    Uptime    int       `json:"uptime"`
}

func main() {
    resp, err := http.Get("http://localhost:3000/health")
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    var health HealthCheck
    json.NewDecoder(resp.Body).Decode(&health)
    fmt.Printf("Service status: %s\n", health.Status)
}
```