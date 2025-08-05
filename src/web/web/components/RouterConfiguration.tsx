import React, { useState } from 'react';
import { Config } from './App';

interface RouterConfigurationProps {
  config: Config;
  onSave: (config: Config) => void;
}

export const RouterConfiguration: React.FC<RouterConfigurationProps> = ({ config, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [localRouter, setLocalRouter] = useState(config.Router);
  const [showHelp, setShowHelp] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const getProviderOptions = () => {
    const options: { value: string; label: string }[] = [];
    
    config.Providers.forEach(provider => {
      provider.models.forEach(model => {
        options.push({
          value: `${provider.name},${model}`,
          label: `${provider.name} → ${model}`
        });
      });
    });
    
    return options;
  };

  const handleSave = () => {
    const newConfig = {
      ...config,
      Router: localRouter
    };
    onSave(newConfig);
    setEditMode(false);
    setUnsavedChanges(false);
  };

  const handleCancel = () => {
    if (unsavedChanges) {
      if (confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        setLocalRouter(config.Router);
        setEditMode(false);
        setUnsavedChanges(false);
      }
    } else {
      setLocalRouter(config.Router);
      setEditMode(false);
    }
  };
  
  const handleRouterChange = (field: string, value: string | number) => {
    setLocalRouter({ ...localRouter, [field]: value });
    setUnsavedChanges(true);
  };

  const providerOptions = getProviderOptions();

  return (
    <div className="card">
      <div className="card-header">
        <h2>Routing Rules</h2>
        <p>Configure intelligent routing rules for different scenarios</p>
      </div>
      <div className="card-content">
        {!editMode ? (
          <div>
            <div className="routing-rules stagger-animation">
              <RouteCard
                title="Default Route"
                description="Primary model used for most requests"
                route={config.Router.default}
                icon="🎯"
                isActive={!!config.Router.default}
              />
              <RouteCard
                title="Background Route"
                description="Faster model for background tasks (claude-3-5-haiku triggers this)"
                route={config.Router.background}
                icon="⚡"
                isActive={!!config.Router.background}
              />
              <RouteCard
                title="Thinking Route"
                description="Reasoning model for complex thinking tasks"
                route={config.Router.think}
                icon="🧠"
                isActive={!!config.Router.think}
              />
              <RouteCard
                title="Long Context Route"
                description={`Large context model (triggers when > ${config.Router.longContextThreshold.toLocaleString()} tokens)`}
                route={config.Router.longContext}
                icon="📚"
                isActive={!!config.Router.longContext}
              />
              <RouteCard
                title="Web Search Route"
                description="Model optimized for web search tasks"
                route={config.Router.webSearch}
                icon="🔍"
                isActive={!!config.Router.webSearch}
              />
            </div>
            
            {/* Route Statistics */}
            <div className="card" style={{ marginTop: '2rem', background: 'var(--gray-50)' }}>
              <div className="card-content" style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--gray-800)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  📊 Configuration Overview
                </h3>
                <div className="grid grid-cols-3" style={{ gap: '1rem' }}>
                  <div className="text-center">
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-600)' }}>
                      {[config.Router.default, config.Router.background, config.Router.think, config.Router.longContext, config.Router.webSearch].filter(Boolean).length}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Active Routes</div>
                  </div>
                  <div className="text-center">
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--success-600)' }}>
                      {config.Providers.length}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Available Providers</div>
                  </div>
                  <div className="text-center">
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--warning-600)' }}>
                      {config.Router.longContextThreshold.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Context Threshold</div>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              className="btn btn-primary attention-pulse" 
              onClick={() => setEditMode(true)}
              style={{ marginTop: '2rem' }}
            >
              ✏️ Edit Routing Rules
            </button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="form-label">🎯 Default Route</label>
                <select
                  className="form-select"
                  value={localRouter.default}
                  onChange={(e) => handleRouterChange('default', e.target.value)}
                  required
                >
                  <option value="">Select a provider and model</option>
                  {providerOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="form-help">
                  Primary model used for most requests
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">⚡ Background Route</label>
                <select
                  className="form-select"
                  value={localRouter.background}
                  onChange={(e) => handleRouterChange('background', e.target.value)}
                >
                  <option value="">No background route</option>
                  {providerOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="form-help">
                  Faster model for background tasks (auto-triggered by claude-3-5-haiku)
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">🧠 Thinking Route</label>
                <select
                  className="form-select"
                  value={localRouter.think}
                  onChange={(e) => handleRouterChange('think', e.target.value)}
                >
                  <option value="">No thinking route</option>
                  {providerOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="form-help">
                  Reasoning model for complex thinking tasks
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">📚 Long Context Route</label>
                <select
                  className="form-select"
                  value={localRouter.longContext}
                  onChange={(e) => handleRouterChange('longContext', e.target.value)}
                >
                  <option value="">No long context route</option>
                  {providerOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="form-help">
                  Large context model for lengthy conversations
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Long Context Threshold (tokens)</label>
                <input
                  type="number"
                  className="form-input"
                  min="1000"
                  max="1000000"
                  value={localRouter.longContextThreshold}
                  onChange={(e) => handleRouterChange('longContextThreshold', parseInt(e.target.value) || 60000)}
                />
                <div className="form-help">
                  Switch to long context model when conversation exceeds this token count
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">🔍 Web Search Route</label>
                <select
                  className="form-select"
                  value={localRouter.webSearch}
                  onChange={(e) => handleRouterChange('webSearch', e.target.value)}
                >
                  <option value="">No web search route</option>
                  {providerOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="form-help">
                  Model optimized for web search and research tasks
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button className="btn btn-success" onClick={handleSave}>
                💾 Save Routing Rules
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>
                ❌ Cancel
              </button>
            </div>
          </div>
        )}

        <div className="accordion" style={{ marginTop: '2rem' }}>
          <div className="accordion-item">
            <div className="accordion-header" onClick={() => setShowHelp(!showHelp)}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                ℹ️ How Routing Works
              </span>
              <svg className="accordion-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6,9 12,15 18,9"/>
              </svg>
            </div>
            <div className={`accordion-content ${showHelp ? 'active' : ''}`}>
              <div className="accordion-body">
                <div className="routing-info">
                  <div className="routing-rule">
                    <strong>🎯 Default:</strong> Used for standard requests when no special conditions are met. This should always be configured as your primary model.
                  </div>
                  <div className="routing-rule">
                    <strong>⚡ Background:</strong> Automatically triggered when the model name contains "claude-3-5-haiku". Ideal for faster, lightweight tasks.
                  </div>
                  <div className="routing-rule">
                    <strong>🧠 Thinking:</strong> Used when the request includes thinking/reasoning parameters. Best with models optimized for complex reasoning.
                  </div>
                  <div className="routing-rule">
                    <strong>📚 Long Context:</strong> Automatically triggered when conversation exceeds the token threshold. Use models with large context windows.
                  </div>
                  <div className="routing-rule">
                    <strong>🔍 Web Search:</strong> Used when the request includes web_search tools. Should be a model good at processing and synthesizing web content.
                  </div>
                </div>
                
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--info-50)', borderRadius: '8px', border: '1px solid var(--info-200)' }}>
                  <h4 style={{ color: 'var(--info-700)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    💡 Pro Tips
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--info-600)' }}>
                    <li>Always configure a default route - it's your fallback for all requests</li>
                    <li>Use background routes for faster models to improve response times</li>
                    <li>Set thinking routes to specialized reasoning models for better complex task handling</li>
                    <li>Configure long context routes with high-capacity models for lengthy conversations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface RouteCardProps {
  title: string;
  description: string;
  route: string;
  icon: string;
  isActive?: boolean;
}

const RouteCard: React.FC<RouteCardProps> = ({ title, description, route, icon, isActive = false }) => {
  return (
    <div className="route-card tooltip clickable" data-tooltip={route || 'Not configured'} style={{
      border: `2px solid ${isActive ? 'var(--success-200)' : 'var(--gray-200)'}`,
      borderRadius: '12px',
      padding: '1.5rem',
      background: isActive ? 'var(--success-50)' : 'white',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '1.2rem' }}>{icon}</span>
        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#2d3748' }}>
          {title}
        </h4>
      </div>
      <p style={{ fontSize: '0.875rem', color: '#718096', marginBottom: '0.5rem' }}>
        {description}
      </p>
      <div style={{ 
        fontSize: '0.8rem', 
        color: route ? '#38a169' : '#a0aec0',
        fontWeight: '500',
        padding: '0.25rem 0.5rem',
        background: route ? '#c6f6d5' : '#f7fafc',
        borderRadius: '4px',
        display: 'inline-block'
      }}>
        {route || 'Not configured'}
      </div>
    </div>
  );
};

// Add some CSS for the routing rules
const style = document.createElement('style');
style.textContent = `
  .routing-rules {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .routing-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .routing-rule {
    font-size: 0.875rem;
    color: #4a5568;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .routing-rule:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    .routing-rules {
      grid-template-columns: 1fr;
    }
  }
`;
document.head.appendChild(style);