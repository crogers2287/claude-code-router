import React, { useState } from 'react';
import { Config } from './App';

interface ConfigProviderProps {
  config: Config;
  onSave: (config: Config) => void;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ config, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [localConfig, setLocalConfig] = useState(config);

  const handleSave = () => {
    onSave(localConfig);
    setEditMode(false);
  };

  const handleCancel = () => {
    setLocalConfig(config);
    setEditMode(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Global Configuration</h2>
        <p>Configure global settings for the Claude Code Router</p>
      </div>
      <div className="card-content">
        {!editMode ? (
          <div>
            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="form-label">API Key</label>
                <div className="form-input" style={{ background: '#f8f9fa' }}>
                  {config.APIKEY ? '••••••••••••••••' : 'Not set'}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Host</label>
                <div className="form-input" style={{ background: '#f8f9fa' }}>
                  {config.HOST}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">API Timeout (ms)</label>
                <div className="form-input" style={{ background: '#f8f9fa' }}>
                  {config.API_TIMEOUT_MS ? config.API_TIMEOUT_MS.toLocaleString() : '600,000'}
                </div>
              </div>
            </div>
            <button 
              className="btn btn-primary" 
              onClick={() => setEditMode(true)}
            >
              ✏️ Edit Configuration
            </button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="form-label">API Key</label>
                <input
                  type="password"
                  className="form-input"
                  value={localConfig.APIKEY}
                  onChange={(e) => setLocalConfig({ ...localConfig, APIKEY: e.target.value })}
                  placeholder="Enter API key for authentication"
                />
                <div className="form-help">
                  This key is used to authenticate requests to the router API
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Host</label>
                <input
                  type="text"
                  className="form-input"
                  value={localConfig.HOST}
                  onChange={(e) => setLocalConfig({ ...localConfig, HOST: e.target.value })}
                  placeholder="0.0.0.0"
                />
                <div className="form-help">
                  Host address to bind the server to (use 127.0.0.1 for local only)
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">API Timeout (ms)</label>
                <input
                  type="number"
                  className="form-input"
                  min="1000"
                  max="3600000"
                  value={localConfig.API_TIMEOUT_MS}
                  onChange={(e) => setLocalConfig({ ...localConfig, API_TIMEOUT_MS: parseInt(e.target.value) || 600000 })}
                />
                <div className="form-help">
                  Maximum time to wait for API responses (1000-3600000 ms)
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button className="btn btn-success" onClick={handleSave}>
                💾 Save Changes
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>
                ❌ Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};