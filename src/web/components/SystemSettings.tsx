import React, { useState, useEffect } from 'react';
import { Config } from './App';

interface SystemSettingsProps {
  config: Config;
  onSave: (config: Config) => void;
  onExport: () => void;
  onImport: () => void;
}

interface ClaudeExecutable {
  path: string;
  version: string;
  isValid: boolean;
}

type LoadingState = 'idle' | 'scanning' | 'validating' | 'saving';
type FeedbackType = 'success' | 'error' | 'warning' | 'info';

interface Feedback {
  type: FeedbackType;
  message: string;
  timeout?: number;
}

export const SystemSettings: React.FC<SystemSettingsProps> = ({ config, onSave, onExport, onImport }) => {
  const [claudeExecutables, setClaudeExecutables] = useState<ClaudeExecutable[]>([]);
  const [selectedExecutable, setSelectedExecutable] = useState<string>('');
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [customPath, setCustomPath] = useState('');
  const [showCustomPath, setShowCustomPath] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Helper function to show feedback with auto-dismiss
  const showFeedback = (feedback: Feedback) => {
    setFeedback(feedback);
    const timeout = feedback.timeout || 5000;
    if (timeout > 0) {
      setTimeout(() => {
        setFeedback(null);
      }, timeout);
    }
  };

  // Load current claude executable path from config
  useEffect(() => {
    const currentPath = (config as any).CLAUDE_EXECUTABLE_PATH || '';
    setSelectedExecutable(currentPath);
    if (currentPath && !claudeExecutables.find(exe => exe.path === currentPath)) {
      // If there's a custom path set, add it to the scan
      setCustomPath(currentPath);
    }
  }, [config, claudeExecutables]);

  const scanForClaudeExecutables = async () => {
    setLoadingState('scanning');
    setValidationErrors([]);
    try {
      const response = await fetch(window.location.origin + '/api/system/scan-claude');
      const data = await response.json();
      
      if (data.success) {
        const executables = data.executables || [];
        setClaudeExecutables(executables);
        showFeedback({
          type: 'success',
          message: `Found ${executables.length} Claude executable${executables.length !== 1 ? 's' : ''}`
        });
      } else {
        setValidationErrors([data.error || 'Failed to scan for Claude executables']);
        showFeedback({
          type: 'error',
          message: 'Failed to scan for Claude executables. Please try again.'
        });
      }
    } catch (error) {
      setValidationErrors(['Network error occurred while scanning']);
      showFeedback({
        type: 'error',
        message: 'Network error occurred while scanning. Check your connection.'
      });
    } finally {
      setLoadingState('idle');
    }
  };

  const validateCustomPath = async (path: string): Promise<ClaudeExecutable | null> => {
    setLoadingState('validating');
    try {
      const response = await fetch(window.location.origin + '/api/system/validate-claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path })
      });
      const data = await response.json();
      
      if (data.success) {
        showFeedback({
          type: 'success',
          message: `Valid Claude executable found at ${path}`
        });
        return data.executable;
      } else {
        showFeedback({
          type: 'error',
          message: data.error || 'Invalid Claude executable path'
        });
      }
      return null;
    } catch (error) {
      showFeedback({
        type: 'error',
        message: 'Network error occurred while validating path'
      });
      return null;
    } finally {
      setLoadingState('idle');
    }
  };

  const addCustomPath = async () => {
    if (!customPath.trim()) {
      showFeedback({
        type: 'warning',
        message: 'Please enter a path to validate'
      });
      return;
    }
    
    const executable = await validateCustomPath(customPath.trim());
    if (executable) {
      setClaudeExecutables(prev => {
        const filtered = prev.filter(exe => exe.path !== executable.path);
        return [...filtered, executable];
      });
      setSelectedExecutable(executable.path);
      setCustomPath('');
      setShowCustomPath(false);
      
      // Auto-save the new selection
      await updateClaudeExecutable(executable.path);
    }
  };

  const updateClaudeExecutable = async (path: string) => {
    setLoadingState('saving');
    try {
      const updatedConfig = {
        ...config,
        CLAUDE_EXECUTABLE_PATH: path
      } as any;
      
      // Save the config with the new Claude executable path
      onSave(updatedConfig);
      setSelectedExecutable(path);
      
      // Hot reload the ccr command wrapper
      try {
        await fetch(window.location.origin + '/api/system/reload-claude-path', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path })
        });
        
        showFeedback({
          type: 'success',
          message: 'Claude executable updated successfully and hot-reloaded'
        });
      } catch (reloadError) {
        showFeedback({
          type: 'warning',
          message: 'Configuration saved but hot-reload failed. Restart may be required.'
        });
      }
    } catch (error) {
      showFeedback({
        type: 'error',
        message: 'Failed to update Claude executable configuration'
      });
    } finally {
      setLoadingState('idle');
    }
  };

  // Auto-scan on component mount
  useEffect(() => {
    scanForClaudeExecutables();
  }, []);

  const dismissFeedback = () => {
    setFeedback(null);
  };

  const isLoading = loadingState !== 'idle';

  return (
    <div className="system-settings">
      {/* Feedback Banner */}
      {feedback && (
        <div className={`feedback-banner feedback-${feedback.type}`}>
          <div className="feedback-content">
            <div className="feedback-icon">
              {feedback.type === 'success' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
              )}
              {feedback.type === 'error' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
              )}
              {feedback.type === 'warning' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                  <path d="M12 9v4"/>
                  <path d="m12 17 .01 0"/>
                </svg>
              )}
              {feedback.type === 'info' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m12 16-4-4 4-4"/>
                  <path d="M16 12H8"/>
                </svg>
              )}
            </div>
            <span className="feedback-message">{feedback.message}</span>
          </div>
          <button className="feedback-dismiss" onClick={dismissFeedback}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      )}

      {/* Configuration Management Section */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Configuration Management
          </div>
          <div className="card-subtitle">
            Import and export your router configuration for backup or sharing
          </div>
        </div>

        <div className="card-content">
          <div className="config-actions">
            <div className="config-action-item">
              <div className="config-action-info">
                <h4>Export Configuration</h4>
                <p>Download your current router configuration as a JSON file for backup or sharing.</p>
              </div>
              <button className="btn btn-secondary" onClick={onExport}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7,10 12,15 17,10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Export Config
              </button>
            </div>
            
            <div className="config-action-item">
              <div className="config-action-info">
                <h4>Import Configuration</h4>
                <p>Load a previously exported configuration file to restore your settings.</p>
              </div>
              <button className="btn btn-primary" onClick={onImport}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17,8 12,3 7,8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                Import Config
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Claude Executable Configuration */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            Claude Code Executable
          </div>
          <div className="card-subtitle">
            Configure which Claude Code executable the ccr command should use
          </div>
        </div>

        <div className="card-content">
          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="validation-errors">
              <div className="error-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                <span>Configuration Issues</span>
              </div>
              <ul className="error-list">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Discovery Actions */}
          <div className="discovery-section">
            <div className="discovery-header">
              <h4>Discover Claude Executables</h4>
              <p>Find Claude Code installations on your system or add a custom path</p>
            </div>
            
            <div className="discovery-actions">
              <button
                className={`btn btn-secondary discovery-btn ${loadingState === 'scanning' ? 'loading' : ''}`}
                onClick={scanForClaudeExecutables}
                disabled={isLoading}
                title="Scan system for Claude executables"
              >
                {loadingState === 'scanning' ? (
                  <>
                    <div className="spinner"></div>
                    Scanning System...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                    Scan for Claude
                  </>
                )}
              </button>
              
              <button
                className={`btn btn-outline discovery-btn ${showCustomPath ? 'active' : ''}`}
                onClick={() => setShowCustomPath(!showCustomPath)}
                disabled={isLoading}
                title="Add custom Claude executable path"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                {showCustomPath ? 'Hide Custom Path' : 'Add Custom Path'}
              </button>
            </div>
          </div>

          {/* Custom Path Input */}
          {showCustomPath && (
            <div className="custom-path-section">
              <div className="custom-path-header">
                <h5>Add Custom Executable Path</h5>
                <p>Enter the full path to your Claude Code executable</p>
              </div>
              
              <div className="custom-path-form">
                <div className="form-group">
                  <label htmlFor="custom-claude-path" className="form-label">
                    Executable Path
                  </label>
                  <div className="input-group">
                    <input
                      id="custom-claude-path"
                      type="text"
                      value={customPath}
                      onChange={(e) => setCustomPath(e.target.value)}
                      placeholder="e.g., /usr/local/bin/claude or C:\Program Files\Claude\claude.exe"
                      className="form-input"
                      disabled={isLoading}
                    />
                    <button
                      className={`btn btn-primary ${loadingState === 'validating' ? 'loading' : ''}`}
                      onClick={addCustomPath}
                      disabled={!customPath.trim() || isLoading}
                    >
                      {loadingState === 'validating' ? (
                        <>
                          <div className="spinner"></div>
                          Validating...
                        </>
                      ) : (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22,4 12,14.01 9,11.01"/>
                          </svg>
                          Validate & Add
                        </>
                      )}
                    </button>
                  </div>
                  <small className="form-help">
                    The path will be validated before being added to your available executables
                  </small>
                </div>
              </div>
            </div>
          )}

          {/* Executables List */}
          <div className="executables-section">
            <div className="executables-header">
              <h4>Available Claude Executables</h4>
              <p>Select which executable the ccr command should use</p>
            </div>
            
            {claudeExecutables.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <h4>No Claude Executables Found</h4>
                <p>Use the "Scan for Claude" button to search your system, or add a custom path manually.</p>
                {!isLoading && (
                  <button className="btn btn-primary" onClick={scanForClaudeExecutables}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                    Scan Now
                  </button>
                )}
              </div>
            ) : (
              <div className="executable-grid">
                {claudeExecutables.map((executable, index) => (
                  <div
                    key={index}
                    className={`executable-card ${
                      selectedExecutable === executable.path ? 'selected' : ''
                    } ${!executable.isValid ? 'invalid' : ''} ${
                      isLoading ? 'disabled' : ''
                    }`}
                    onClick={() => {
                      if (executable.isValid && !isLoading) {
                        updateClaudeExecutable(executable.path);
                      }
                    }}
                  >
                    <div className="executable-status">
                      {executable.isValid ? (
                        <div className="status-icon valid">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22,4 12,14.01 9,11.01"/>
                          </svg>
                        </div>
                      ) : (
                        <div className="status-icon invalid">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="15" y1="9" x2="9" y2="15"/>
                            <line x1="9" y1="9" x2="15" y2="15"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    <div className="executable-info">
                      <div className="executable-path" title={executable.path}>
                        {executable.path}
                      </div>
                      <div className="executable-meta">
                        {executable.isValid ? (
                          <span className="version">Version: {executable.version}</span>
                        ) : (
                          <span className="error">Invalid executable</span>
                        )}
                      </div>
                    </div>
                    
                    {selectedExecutable === executable.path && (
                      <div className="selection-indicator">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        <span>Active</span>
                      </div>
                    )}
                    
                    {loadingState === 'saving' && selectedExecutable === executable.path && (
                      <div className="loading-overlay">
                        <div className="spinner"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Current Selection Summary */}
          {selectedExecutable && (
            <div className="current-selection">
              <div className="selection-header">
                <div className="selection-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <div className="selection-info">
                  <h5>Currently Active</h5>
                  <p>The ccr command will use this Claude executable for all operations</p>
                </div>
              </div>
              
              <div className="selection-path">
                <code>{selectedExecutable}</code>
              </div>
              
              {claudeExecutables.find(exe => exe.path === selectedExecutable) && (
                <div className="selection-details">
                  <span className="selection-version">
                    Version: {claudeExecutables.find(exe => exe.path === selectedExecutable)?.version}
                  </span>
                  <span className="selection-status valid">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22,4 12,14.01 9,11.01"/>
                    </svg>
                    Validated
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};