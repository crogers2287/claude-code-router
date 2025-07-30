import React, { useState } from 'react';
import { Config } from './App';

interface TestingPanelProps {
  config: Config;
}

interface TestResult {
  provider: string;
  model: string;
  status: 'success' | 'error' | 'testing';
  latency?: number;
  error?: string;
  timestamp: number;
  progress?: number;
}

interface TestProgress {
  [key: string]: {
    current: number;
    total: number;
    stage: string;
  };
}

export const TestingPanel: React.FC<TestingPanelProps> = ({ config }) => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isTestingAll, setIsTestingAll] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [testProgress, setTestProgress] = useState<TestProgress>({});
  const [showDetails, setShowDetails] = useState<{[key: string]: boolean}>({});
  const [autoRefresh, setAutoRefresh] = useState(false);

  const testProvider = async (providerName: string, model?: string) => {
    const provider = config.Providers.find(p => p.name === providerName);
    if (!provider) return;

    const modelsToTest = model ? [model] : provider.models;
    const totalModels = modelsToTest.length;
    
    // Initialize progress tracking
    setTestProgress(prev => ({
      ...prev,
      [providerName]: {
        current: 0,
        total: totalModels,
        stage: 'Initializing...'
      }
    }));
    
    for (let i = 0; i < modelsToTest.length; i++) {
      const testModel = modelsToTest[i];
      const testId = `${providerName}-${testModel}`;
      
      // Update progress
      setTestProgress(prev => ({
        ...prev,
        [providerName]: {
          current: i,
          total: totalModels,
          stage: `Testing ${testModel}...`
        }
      }));
      
      // Add testing result with progress
      setTestResults(prev => [
        ...prev.filter(r => `${r.provider}-${r.model}` !== testId),
        {
          provider: providerName,
          model: testModel,
          status: 'testing',
          timestamp: Date.now(),
          progress: Math.round((i / totalModels) * 100)
        }
      ]);

      try {
        const startTime = Date.now();
        
        // Simulate connection stages for better UX
        setTestProgress(prev => ({
          ...prev,
          [providerName]: {
            ...prev[providerName],
            stage: `Connecting to ${testModel}...`
          }
        }));
        
        const response = await fetch(window.location.origin + '/api/test-provider', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            provider: {
              ...provider,
              models: [testModel] // Test specific model
            }
          })
        });

        const result = await response.json();
        const latency = Date.now() - startTime;
        
        // Update progress to show completion
        setTestProgress(prev => ({
          ...prev,
          [providerName]: {
            current: i + 1,
            total: totalModels,
            stage: result.success ? `✓ ${testModel} (${latency}ms)` : `✗ ${testModel} failed`
          }
        }));

        setTestResults(prev => [
          ...prev.filter(r => `${r.provider}-${r.model}` !== testId),
          {
            provider: providerName,
            model: testModel,
            status: result.success ? 'success' : 'error',
            latency,
            error: result.success ? undefined : result.message,
            timestamp: Date.now(),
            progress: 100
          }
        ]);
      } catch (error) {
        setTestResults(prev => [
          ...prev.filter(r => `${r.provider}-${r.model}` !== testId),
          {
            provider: providerName,
            model: testModel,
            status: 'error',
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: Date.now(),
            progress: 100
          }
        ]);
        
        setTestProgress(prev => ({
          ...prev,
          [providerName]: {
            current: i + 1,
            total: totalModels,
            stage: `✗ ${testModel} failed`
          }
        }));
      }
      
      // Small delay between tests for better UX
      if (i < modelsToTest.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    // Final progress update
    setTestProgress(prev => ({
      ...prev,
      [providerName]: {
        current: totalModels,
        total: totalModels,
        stage: 'Testing complete'
      }
    }));
    
    // Clear progress after delay
    setTimeout(() => {
      setTestProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[providerName];
        return newProgress;
      });
    }, 3000);
  };

  const testAllProviders = async () => {
    setIsTestingAll(true);
    setTestResults([]);
    
    const totalProviders = config.Providers.length;
    
    for (let i = 0; i < config.Providers.length; i++) {
      const provider = config.Providers[i];
      
      // Update global progress
      setTestProgress(prev => ({
        ...prev,
        '__global__': {
          current: i,
          total: totalProviders,
          stage: `Testing provider ${i + 1} of ${totalProviders}: ${provider.name}`
        }
      }));
      
      await testProvider(provider.name);
    }
    
    // Final global progress
    setTestProgress(prev => ({
      ...prev,
      '__global__': {
        current: totalProviders,
        total: totalProviders,
        stage: 'All providers tested successfully!'
      }
    }));
    
    setIsTestingAll(false);
    
    // Clear global progress
    setTimeout(() => {
      setTestProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress['__global__'];
        return newProgress;
      });
    }, 3000);
  };

  const clearResults = () => {
    setTestResults([]);
    setTestProgress({});
  };
  
  const toggleDetails = (resultId: string) => {
    setShowDetails(prev => ({
      ...prev,
      [resultId]: !prev[resultId]
    }));
  };
  
  const exportResults = () => {
    const data = {
      timestamp: new Date().toISOString(),
      results: testResults,
      summary: {
        total: testResults.length,
        successful: testResults.filter(r => r.status === 'success').length,
        failed: testResults.filter(r => r.status === 'error').length,
        averageLatency: testResults.filter(r => r.latency).reduce((acc, r) => acc + (r.latency || 0), 0) / testResults.filter(r => r.latency).length || 0
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `provider-test-results-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Auto-refresh effect
  React.useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      if (!isTestingAll && selectedProvider) {
        testProvider(selectedProvider);
      }
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [autoRefresh, selectedProvider, isTestingAll]);

  const getRouteInfo = () => {
    const routes = [];
    if (config.Router.default) routes.push({ name: 'Default', route: config.Router.default, icon: '🎯' });
    if (config.Router.background) routes.push({ name: 'Background', route: config.Router.background, icon: '⚡' });
    if (config.Router.think) routes.push({ name: 'Thinking', route: config.Router.think, icon: '🧠' });
    if (config.Router.longContext) routes.push({ name: 'Long Context', route: config.Router.longContext, icon: '📚' });
    if (config.Router.webSearch) routes.push({ name: 'Web Search', route: config.Router.webSearch, icon: '🔍' });
    return routes;
  };

  const getStatusIcon = (status: 'success' | 'error' | 'testing') => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'testing': return '🔄';
    }
  };

  const getStatusColor = (status: 'success' | 'error' | 'testing') => {
    switch (status) {
      case 'success': return '#22543d';
      case 'error': return '#742a2a';
      case 'testing': return '#744210';
    }
  };

  const getStatusBackground = (status: 'success' | 'error' | 'testing') => {
    switch (status) {
      case 'success': return '#c6f6d5';
      case 'error': return '#fed7d7';
      case 'testing': return '#fef5e7';
    }
  };

  return (
    <div>
      {/* Route Overview */}
      <div className="card">
        <div className="card-header">
          <h2>Current Routing Configuration</h2>
          <p>Overview of your configured routes</p>
        </div>
        <div className="card-content">
          {getRouteInfo().length === 0 ? (
            <div className="empty-state-enhanced">
              <div className="empty-state-icon">📋</div>
              <h3 className="empty-state-title">No routes configured</h3>
              <p className="empty-state-description">
                Set up routing rules to intelligently direct requests to different providers based on context and requirements.
              </p>
              <button className="empty-state-action" onClick={() => window.location.hash = '#routing'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4,17 10,11 4,5"/>
                  <line x1="12" y1="19" x2="20" y2="19"/>
                </svg>
                Configure Routing Rules
              </button>
            </div>
          ) : (
            <div className="routing-overview stagger-animation">
              {getRouteInfo().map((route, index) => (
                <div key={index} className="route-overview-item tooltip clickable" data-tooltip={`Route: ${route.route}`}>
                  <span className="route-icon">{route.icon}</span>
                  <div className="route-info">
                    <div className="route-name">{route.name}</div>
                    <div className="route-destination">{route.route}</div>
                  </div>
                  <div className="badge badge-primary">
                    Active
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Provider Testing */}
      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2>Provider Connection Testing</h2>
              <p>Test connectivity and latency to your configured providers</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className="btn btn-secondary btn-small"
                  onClick={exportResults}
                  disabled={testResults.length === 0}
                  title="Export test results as JSON"
                >
                  📄 Export
                </button>
                <button
                  className={`btn btn-secondary btn-small ${autoRefresh ? 'attention-pulse' : ''}`}
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  title="Auto-refresh every 30 seconds"
                >
                  {autoRefresh ? '⏸️' : '🔄'} Auto
                </button>
                <button
                  className="btn btn-secondary btn-small"
                  onClick={clearResults}
                  disabled={testResults.length === 0}
                >
                  🗑️ Clear
                </button>
              </div>
              <button
                className="btn btn-primary"
                onClick={testAllProviders}
                disabled={isTestingAll || config.Providers.length === 0}
              >
                {isTestingAll ? '🔄 Testing...' : '🧪 Test All Providers'}
              </button>
            </div>
          </div>
        </div>
        <div className="card-content">
          {config.Providers.length === 0 ? (
            <div className="empty-state-enhanced">
              <div className="empty-state-icon">🔌</div>
              <h3 className="empty-state-title">No providers to test</h3>
              <p className="empty-state-description">
                Add some LLM providers first, then return here to test their connectivity and performance.
              </p>
              <button className="empty-state-action" onClick={() => window.location.hash = '#providers'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="16"/>
                  <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
                Add Providers
              </button>
            </div>
          ) : (
            <div>
              {/* Individual provider testing */}
              <div className="provider-test-controls">
                <div className="form-group">
                  <label className="form-label">Test Individual Provider</label>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <select
                      className="form-select"
                      value={selectedProvider}
                      onChange={(e) => setSelectedProvider(e.target.value)}
                      style={{ flex: 1 }}
                    >
                      <option value="">Select a provider</option>
                      {config.Providers.map(provider => (
                        <option key={provider.name} value={provider.name}>
                          {provider.name} ({provider.models.length} models)
                        </option>
                      ))}
                    </select>
                    <button
                      className="btn btn-secondary"
                      onClick={() => selectedProvider && testProvider(selectedProvider)}
                      disabled={!selectedProvider || isTestingAll}
                    >
                      🧪 Test Provider
                    </button>
                  </div>
                </div>
              </div>

              {/* Global Progress */}
              {testProgress['__global__'] && (
                <div className="card" style={{ marginBottom: '1rem', background: 'var(--primary-50)', border: '2px solid var(--primary-200)' }}>
                  <div className="card-content" style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                      <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                      <div>
                        <div style={{ fontWeight: '600', color: 'var(--primary-700)' }}>Global Testing Progress</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--primary-600)' }}>{testProgress['__global__'].stage}</div>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${(testProgress['__global__'].current / testProgress['__global__'].total) * 100}%` }}
                      ></div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary-600)', marginTop: '0.5rem' }}>
                      {testProgress['__global__'].current} of {testProgress['__global__'].total} providers tested
                    </div>
                  </div>
                </div>
              )}
              
              {/* Provider-specific Progress */}
              {Object.entries(testProgress).filter(([key]) => key !== '__global__').map(([providerName, progress]) => (
                <div key={providerName} className="card" style={{ marginBottom: '1rem', background: 'var(--warning-50)', border: '2px solid var(--warning-200)' }}>
                  <div className="card-content" style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                      <div className="spinner" style={{ width: '16px', height: '16px' }}></div>
                      <div>
                        <div style={{ fontWeight: '600', color: 'var(--warning-700)' }}>Testing {providerName}</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--warning-600)' }}>{progress.stage}</div>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-bar-fill" 
                        style={{ 
                          width: `${(progress.current / progress.total) * 100}%`,
                          background: 'linear-gradient(90deg, var(--warning-500), var(--warning-600))'
                        }}
                      ></div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--warning-600)', marginTop: '0.5rem' }}>
                      {progress.current} of {progress.total} models tested
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Test Results */}
              {testResults.length > 0 && (
                <div className="test-results">
                  <h3 style={{ marginBottom: '1rem', color: '#4a5568' }}>Test Results</h3>
                  <div className="results-grid stagger-animation">
                    {testResults
                      .sort((a, b) => b.timestamp - a.timestamp)
                      .map((result, index) => {
                        const resultId = `${result.provider}-${result.model}-${result.timestamp}`;
                        const showDetail = showDetails[resultId];
                        
                        return (
                          <div key={index} className="result-item clickable" onClick={() => toggleDetails(resultId)}>
                            <div className="result-header">
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '1.2rem' }}>
                                  {result.status === 'testing' ? (
                                    <div className="spinner" style={{ width: '16px', height: '16px' }}></div>
                                  ) : (
                                    getStatusIcon(result.status)
                                  )}
                                </span>
                                <span className="result-provider">{result.provider}</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div 
                                  className={`result-status badge ${
                                    result.status === 'success' ? 'badge-success' :
                                    result.status === 'error' ? 'badge-error' : 'badge-warning'
                                  }`}
                                >
                                  {result.status.toUpperCase()}
                                </div>
                                <svg 
                                  width="16" 
                                  height="16" 
                                  viewBox="0 0 24 24" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  strokeWidth="2" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round"
                                  style={{
                                    transform: showDetail ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease',
                                    opacity: 0.6
                                  }}
                                >
                                  <polyline points="6,9 12,15 18,9"/>
                                </svg>
                              </div>
                            </div>
                            
                            <div className="result-model" style={{ fontWeight: '600', color: 'var(--gray-800)' }}>
                              {result.model}
                            </div>
                            
                            {result.status === 'testing' && result.progress !== undefined && (
                              <div style={{ margin: '0.5rem 0' }}>
                                <div className="progress-bar" style={{ height: '4px' }}>
                                  <div 
                                    className="progress-bar-fill" 
                                    style={{ width: `${result.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                              {result.latency && (
                                <div className="result-latency">
                                  ⏱️ {result.latency}ms
                                </div>
                              )}
                              <div className="result-timestamp" style={{ marginLeft: 'auto' }}>
                                {new Date(result.timestamp).toLocaleTimeString()}
                              </div>
                            </div>
                            
                            {showDetail && (
                              <div className="accordion-content active" style={{ marginTop: '1rem' }}>
                                <div className="accordion-body" style={{ padding: '0.5rem', background: 'var(--gray-50)', borderRadius: '6px' }}>
                                  <div style={{ fontSize: '0.875rem' }}>
                                    <div><strong>Provider:</strong> {result.provider}</div>
                                    <div><strong>Model:</strong> {result.model}</div>
                                    <div><strong>Status:</strong> {result.status}</div>
                                    {result.latency && <div><strong>Latency:</strong> {result.latency}ms</div>}
                                    <div><strong>Tested:</strong> {new Date(result.timestamp).toLocaleString()}</div>
                                    {result.error && (
                                      <div style={{ marginTop: '0.5rem' }}>
                                        <strong>Error Details:</strong>
                                        <div className="result-error" style={{ marginTop: '0.25rem' }}>
                                          {result.error}
                                        </div>
                                      </div>
                                    )}
                                    {result.status === 'success' && result.latency && (
                                      <div style={{ marginTop: '0.5rem' }}>
                                        <strong>Performance:</strong>
                                        <div style={{ color: result.latency < 1000 ? 'var(--success-600)' : result.latency < 3000 ? 'var(--warning-600)' : 'var(--error-600)' }}>
                                          {result.latency < 1000 ? 'Excellent' : result.latency < 3000 ? 'Good' : 'Slow'} response time
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Add CSS for the testing panel
const style = document.createElement('style');
style.textContent = `
  .routing-overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .route-overview-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: white;
  }
  
  .route-icon {
    font-size: 1.5rem;
  }
  
  .route-info {
    flex: 1;
  }
  
  .route-name {
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.25rem;
  }
  
  .route-destination {
    font-size: 0.875rem;
    color: #718096;
  }
  
  .provider-test-controls {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .test-results {
    margin-top: 2rem;
  }
  
  .results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }
  
  .result-item {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
    background: white;
  }
  
  .result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .result-provider {
    font-weight: 600;
    color: #2d3748;
  }
  
  .result-model {
    font-size: 0.875rem;
    color: #718096;
    margin-bottom: 0.5rem;
  }
  
  .result-latency {
    font-size: 0.8rem;
    color: #38a169;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  
  .result-error {
    font-size: 0.8rem;
    color: #e53e3e;
    background: #fed7d7;
    padding: 0.5rem;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }
  
  .result-timestamp {
    font-size: 0.75rem;
    color: #a0aec0;
  }
  
  @media (max-width: 768px) {
    .routing-overview {
      grid-template-columns: 1fr;
    }
    
    .results-grid {
      grid-template-columns: 1fr;
    }
  }
`;
document.head.appendChild(style);