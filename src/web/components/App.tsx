import React, { useState, useEffect } from 'react';
import { ConfigProvider } from './ConfigProvider';
import { ProviderManager } from './ProviderManager';
import { RouterConfiguration } from './RouterConfiguration';
import { TestingPanel } from './TestingPanel';
import { CommandGenerator } from './CommandGenerator';
import styles from './styles.css';

export interface Provider {
  name: string;
  api_base_url: string;
  api_key: string;
  models: string[];
  transformer?: {
    use: Array<string | [string, any]>;
    [key: string]: any;
  };
}

export interface RouterConfig {
  default: string;
  background: string;
  think: string;
  longContext: string;
  longContextThreshold: number;
  webSearch: string;
}

export interface Config {
  Providers: Provider[];
  Router: RouterConfig;
  APIKEY: string;
  HOST: string;
  API_TIMEOUT_MS: number;
}

const App: React.FC = () => {
  const [config, setConfig] = useState<Config | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'providers' | 'routing' | 'testing' | 'commands'>('providers');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [pageTransition, setPageTransition] = useState(false);
  
  // Toast notification system
  const [toasts, setToasts] = useState<Array<{
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    title: string;
    message: string;
  }>>([]);

  const showToast = (toast: Omit<typeof toasts[0], 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);
    
    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    // Inject styles
    if (typeof styles === 'string' && !document.getElementById('app-styles')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'app-styles';
      styleElement.textContent = styles;
      document.head.appendChild(styleElement);
    }
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const response = await fetch(window.location.origin + '/api/config');
      const data = await response.json();
      setConfig(data);
    } catch (error) {
      console.error('Failed to load config:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async (newConfig: Config) => {
    setSaveStatus('saving');
    try {
      const response = await fetch(window.location.origin + '/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig)
      });

      if (response.ok) {
        setConfig(newConfig);
        setSaveStatus('saved');
        
        // Show success toast
        showToast({
          type: 'success',
          title: 'Configuration Saved',
          message: 'Your router configuration has been updated successfully.'
        });
        
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        setSaveStatus('error');
        
        // Show error toast
        showToast({
          type: 'error',
          title: 'Save Failed',
          message: 'Could not save configuration. Please try again.'
        });
        
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Failed to save config:', error);
      setSaveStatus('error');
      
      // Show error toast
      showToast({
        type: 'error',
        title: 'Network Error',
        message: 'Unable to connect to the server. Check your connection.'
      });
      
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <header className="app-header">
          <div className="container">
            <h1>
              <span className="logo">⚡</span>
              Claude Code Router
            </h1>
            <p>Loading your intelligent routing configuration...</p>
          </div>
        </header>

        <nav className="app-nav">
          <div className="container">
            <div className="nav-tabs">
              <div className="nav-tab skeleton" style={{ width: '120px', height: '48px' }}></div>
              <div className="nav-tab skeleton" style={{ width: '140px', height: '48px' }}></div>
              <div className="nav-tab skeleton" style={{ width: '100px', height: '48px' }}></div>
            </div>
          </div>
        </nav>

        <main className="app-main">
          <div className="container">
            <div className="skeleton-card">
              <div className="skeleton-text-lg" style={{ width: '300px' }}></div>
              <div className="skeleton-text" style={{ width: '500px' }}></div>
              <div className="skeleton-text" style={{ width: '200px' }}></div>
            </div>
            
            <div className="skeleton-card">
              <div className="skeleton-provider">
                <div className="skeleton-provider-header">
                  <div className="skeleton-provider-name"></div>
                  <div className="skeleton-provider-actions">
                    <div className="skeleton skeleton-btn"></div>
                    <div className="skeleton skeleton-btn"></div>
                    <div className="skeleton skeleton-btn"></div>
                  </div>
                </div>
                <div className="skeleton-provider-details">
                  <div className="skeleton-detail">
                    <div className="skeleton skeleton-detail-label"></div>
                    <div className="skeleton skeleton-detail-value"></div>
                  </div>
                  <div className="skeleton-detail">
                    <div className="skeleton skeleton-detail-label"></div>
                    <div className="skeleton skeleton-detail-value"></div>
                  </div>
                  <div className="skeleton-detail">
                    <div className="skeleton skeleton-detail-label"></div>
                    <div className="skeleton skeleton-detail-value"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="skeleton-card">
              <div className="skeleton-provider">
                <div className="skeleton-provider-header">
                  <div className="skeleton-provider-name"></div>
                  <div className="skeleton-provider-actions">
                    <div className="skeleton skeleton-btn"></div>
                    <div className="skeleton skeleton-btn"></div>
                    <div className="skeleton skeleton-btn"></div>
                  </div>
                </div>
                <div className="skeleton-provider-details">
                  <div className="skeleton-detail">
                    <div className="skeleton skeleton-detail-label"></div>
                    <div className="skeleton skeleton-detail-value"></div>
                  </div>
                  <div className="skeleton-detail">
                    <div className="skeleton skeleton-detail-label"></div>
                    <div className="skeleton skeleton-detail-value"></div>
                  </div>
                  <div className="skeleton-detail">
                    <div className="skeleton skeleton-detail-label"></div>
                    <div className="skeleton skeleton-detail-value"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="app">
        <header className="app-header">
          <div className="container">
            <h1>
              <span className="logo">⚡</span>
              Claude Code Router
            </h1>
            <p>Intelligent LLM routing and configuration management</p>
          </div>
        </header>
        
        <main className="app-main">
          <div className="container">
            <div className="error-container">
              <div className="empty-state-icon">⚠️</div>
              <h2 className="empty-state-title">Configuration Loading Failed</h2>
              <p className="empty-state-description">
                We couldn't load your router configuration. This might be due to a connection issue or server problem.
              </p>
              <button onClick={loadConfig} className="empty-state-action">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 4v6h-6"/>
                  <path d="M1 20v-6h6"/>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                </svg>
                Retry Loading
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>
            <span className="logo">⚡</span>
            Claude Code Router
          </h1>
          <p>Intelligent LLM routing and configuration management for modern AI workflows</p>
          
          <div className="save-status">
            {saveStatus === 'saving' && (
              <span className="status saving">
                <div className="spinner" style={{ width: '16px', height: '16px', marginRight: '8px' }}></div>
                Saving configuration...
              </span>
            )}
            {saveStatus === 'saved' && (
              <span className="status saved success-animation">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
                Configuration saved successfully!
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="status error error-animation">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                Failed to save configuration
              </span>
            )}
          </div>
        </div>
      </header>

      <nav className="app-nav">
        <div className="container">
          <div className="nav-tabs">
            <button
              className={`nav-tab ${activeTab === 'providers' ? 'active' : ''}`}
              onClick={() => {
                if (activeTab !== 'providers') {
                  setPageTransition(true);
                  setTimeout(() => {
                    setActiveTab('providers');
                    setPageTransition(false);
                  }, 150);
                }
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              Providers
            </button>
            <button
              className={`nav-tab ${activeTab === 'routing' ? 'active' : ''}`}
              onClick={() => {
                if (activeTab !== 'routing') {
                  setPageTransition(true);
                  setTimeout(() => {
                    setActiveTab('routing');
                    setPageTransition(false);
                  }, 150);
                }
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4,17 10,11 4,5"/>
                <line x1="12" y1="19" x2="20" y2="19"/>
              </svg>
              Routing Rules
            </button>
            <button
              className={`nav-tab ${activeTab === 'testing' ? 'active' : ''}`}
              onClick={() => {
                if (activeTab !== 'testing') {
                  setPageTransition(true);
                  setTimeout(() => {
                    setActiveTab('testing');
                    setPageTransition(false);
                  }, 150);
                }
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9,11 12,14 22,4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
              Testing
            </button>
            <button
              className={`nav-tab ${activeTab === 'commands' ? 'active' : ''}`}
              onClick={() => {
                if (activeTab !== 'commands') {
                  setPageTransition(true);
                  setTimeout(() => {
                    setActiveTab('commands');
                    setPageTransition(false);
                  }, 150);
                }
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
              Commands
            </button>
          </div>
        </div>
      </nav>

      <main className="app-main">
        <div className="container">
          <div className={pageTransition ? 'page-transition-exit page-transition-exit-active' : 'page-transition-enter page-transition-enter-active'}>
            {activeTab === 'providers' && (
              <>
                <ConfigProvider config={config} onSave={saveConfig} />
                <ProviderManager config={config} onSave={saveConfig} />
              </>
            )}
            {activeTab === 'routing' && (
              <RouterConfiguration config={config} onSave={saveConfig} />
            )}
            {activeTab === 'testing' && (
              <TestingPanel config={config} />
            )}
            {activeTab === 'commands' && (
              <CommandGenerator config={config} />
            )}
          </div>
        </div>
      </main>
      
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`} onClick={() => removeToast(toast.id)}>
            <div className="toast-icon">
              {toast.type === 'success' && '✅'}
              {toast.type === 'error' && '❌'}
              {toast.type === 'info' && 'ℹ️'}
              {toast.type === 'warning' && '⚠️'}
            </div>
            <div className="toast-content">
              <div className="toast-title">{toast.title}</div>
              <div className="toast-message">{toast.message}</div>
            </div>
            <button className="toast-close" onClick={(e) => { e.stopPropagation(); removeToast(toast.id); }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;