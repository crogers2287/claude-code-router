import React, { useState } from 'react';
import { Config, Provider } from './App';
import { ProviderTemplates } from './ProviderTemplates';

interface ProviderManagerProps {
  config: Config;
  onSave: (config: Config) => void;
}

interface ProviderStatus {
  [key: string]: 'idle' | 'testing' | 'online' | 'offline';
}

interface ValidationErrors {
  [key: string]: string[];
}

interface FormTouched {
  [key: string]: boolean;
}

export const ProviderManager: React.FC<ProviderManagerProps> = ({ config, onSave }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProvider, setEditingProvider] = useState<string | null>(null);
  const [providerStatus, setProviderStatus] = useState<ProviderStatus>({});

  const addProvider = (provider: Provider) => {
    const newConfig = {
      ...config,
      Providers: [...config.Providers, provider]
    };
    onSave(newConfig);
    setShowAddForm(false);
  };

  const updateProvider = (index: number, provider: Provider) => {
    const newProviders = [...config.Providers];
    newProviders[index] = provider;
    const newConfig = {
      ...config,
      Providers: newProviders
    };
    onSave(newConfig);
    setEditingProvider(null);
  };

  const deleteProvider = (index: number) => {
    if (confirm('Are you sure you want to delete this provider?')) {
      const newProviders = config.Providers.filter((_, i) => i !== index);
      const newConfig = {
        ...config,
        Providers: newProviders
      };
      onSave(newConfig);
    }
  };

  const testProvider = async (provider: Provider) => {
    setProviderStatus(prev => ({ ...prev, [provider.name]: 'testing' }));
    
    try {
      const response = await fetch(window.location.origin + '/api/test-provider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider })
      });
      
      if (!response.ok) {
        console.error(`Test provider error: ${response.status} ${response.statusText}`);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      setProviderStatus(prev => ({ 
        ...prev, 
        [provider.name]: result.success ? 'online' : 'offline' 
      }));
    } catch (error) {
      console.error('Provider test failed:', error);
      setProviderStatus(prev => ({ ...prev, [provider.name]: 'offline' }));
    }
  };

  const getStatusIndicator = (providerName: string) => {
    const status = providerStatus[providerName];
    switch (status) {
      case 'testing':
        return <span className="status-indicator status-testing">🔄 Testing...</span>;
      case 'online':
        return <span className="status-indicator status-online">✅ Online</span>;
      case 'offline':
        return <span className="status-indicator status-offline">❌ Offline</span>;
      default:
        return null;
    }
  };

  const exportConfig = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `claude-code-router-config-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportProviders = () => {
    const providersData = { Providers: config.Providers };
    const dataStr = JSON.stringify(providersData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `claude-code-router-providers-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedConfig = JSON.parse(e.target?.result as string);
        
        // Validate the imported config has required structure
        if (!importedConfig.Providers || !Array.isArray(importedConfig.Providers)) {
          alert('Invalid configuration file: missing or invalid Providers array');
          return;
        }
        
        if (confirm('This will replace your current configuration. Are you sure you want to continue?')) {
          // Merge with current config to preserve server settings
          const mergedConfig = {
            ...config,
            ...importedConfig,
            // Preserve critical server settings
            APIKEY: config.APIKEY,
            HOST: config.HOST,
            API_TIMEOUT_MS: importedConfig.API_TIMEOUT_MS || config.API_TIMEOUT_MS
          };
          onSave(mergedConfig);
        }
      } catch (error) {
        alert('Error parsing configuration file. Please check the file format.');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
    // Reset input value so same file can be selected again
    event.target.value = '';
  };

  const importProviders = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        let providersToImport: Provider[] = [];
        
        // Handle different import formats
        if (importedData.Providers && Array.isArray(importedData.Providers)) {
          providersToImport = importedData.Providers;
        } else if (Array.isArray(importedData)) {
          providersToImport = importedData;
        } else {
          alert('Invalid file format. Expected JSON with Providers array or array of providers.');
          return;
        }
        
        // Validate provider structure
        const isValid = providersToImport.every(provider => 
          provider.name && provider.api_base_url && Array.isArray(provider.models)
        );
        
        if (!isValid) {
          alert('Invalid provider data. Each provider must have name, api_base_url, and models array.');
          return;
        }
        
        const action = confirm(
          `Import ${providersToImport.length} provider(s)?\n\n` +
          `Click OK to REPLACE current providers, or Cancel to MERGE with existing providers.`
        );
        
        if (action === null) return; // User cancelled
        
        let newProviders: Provider[];
        if (action) {
          // Replace existing providers
          newProviders = providersToImport;
        } else {
          // Merge with existing providers (avoiding duplicates by name)
          const existingNames = new Set(config.Providers.map(p => p.name));
          const uniqueImported = providersToImport.filter(p => !existingNames.has(p.name));
          newProviders = [...config.Providers, ...uniqueImported];
        }
        
        const newConfig = { ...config, Providers: newProviders };
        onSave(newConfig);
      } catch (error) {
        alert('Error parsing providers file. Please check the file format.');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
    // Reset input value so same file can be selected again
    event.target.value = '';
  };

  return (
    <div className="card">
      <div className="card-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2>Provider Management</h2>
            <p>Configure LLM providers and their models</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {/* Export/Import Buttons */}
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <button 
                className="btn btn-secondary btn-small" 
                onClick={exportProviders}
                title="Export only providers"
              >
                📤 Export Providers
              </button>
              <button 
                className="btn btn-secondary btn-small" 
                onClick={exportConfig}
                title="Export complete configuration"
              >
                📦 Export Config
              </button>
            </div>
            
            {/* Import Buttons */}
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <label className="btn btn-secondary btn-small" style={{ cursor: 'pointer' }}>
                📥 Import Providers
                <input
                  type="file"
                  accept=".json"
                  onChange={importProviders}
                  style={{ display: 'none' }}
                />
              </label>
              <label className="btn btn-secondary btn-small" style={{ cursor: 'pointer' }}>
                📦 Import Config
                <input
                  type="file"
                  accept=".json"
                  onChange={importConfig}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            
            <button 
              className="btn btn-primary" 
              onClick={() => setShowAddForm(true)}
            >
              ➕ Add Provider
            </button>
          </div>
        </div>
      </div>
      <div className="card-content">
        {config.Providers.length === 0 ? (
          <div className="empty-state-enhanced">
            <div className="empty-state-icon">🤖</div>
            <h3 className="empty-state-title">No providers configured</h3>
            <p className="empty-state-description">
              Get started by adding your first LLM provider. Choose from popular services like OpenAI, Anthropic, or set up your own custom endpoint.
            </p>
            <button className="empty-state-action" onClick={() => setShowAddForm(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              Add Your First Provider
            </button>
          </div>
        ) : (
          <div className="provider-list stagger-animation">
            {config.Providers.map((provider, index) => (
              <div key={index} className="provider-item">
                {editingProvider === provider.name ? (
                  <ProviderForm
                    provider={provider}
                    onSave={(p) => updateProvider(index, p)}
                    onCancel={() => setEditingProvider(null)}
                  />
                ) : (
                  <div>
                    <div className="provider-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span className="provider-name">{provider.name}</span>
                        {getStatusIndicator(provider.name)}
                      </div>
                      <div className="provider-actions">
                        <button
                          className="btn btn-secondary btn-small"
                          onClick={() => testProvider(provider)}
                          disabled={providerStatus[provider.name] === 'testing'}
                        >
                          🧪 Test
                        </button>
                        <button
                          className="btn btn-secondary btn-small"
                          onClick={() => setEditingProvider(provider.name)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-danger btn-small"
                          onClick={() => deleteProvider(index)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                    <div className="provider-details">
                      <div className="provider-detail">
                        <div className="provider-detail-label">API URL</div>
                        <div className="provider-detail-value">{provider.api_base_url}</div>
                      </div>
                      <div className="provider-detail">
                        <div className="provider-detail-label">API Key</div>
                        <div className="provider-detail-value">
                          {provider.api_key ? '••••••••••••••••' : 'Not set'}
                        </div>
                      </div>
                      <div className="provider-detail">
                        <div className="provider-detail-label">Models ({provider.models.length})</div>
                        <div className="provider-models">
                          {provider.models.map((model, i) => (
                            <span key={i} className="model-tag">{model}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {showAddForm && (
          <div className="card" style={{ marginTop: '2rem' }}>
            <div className="card-header">
              <h3>Add New Provider</h3>
            </div>
            <div className="card-content">
              <ProviderTemplates onSelect={addProvider} />
              <div style={{ margin: '2rem 0', textAlign: 'center', color: '#718096' }}>
                — OR —
              </div>
              <ProviderForm
                onSave={addProvider}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface ProviderFormProps {
  provider?: Provider;
  onSave: (provider: Provider) => void;
  onCancel: () => void;
}

const ProviderForm: React.FC<ProviderFormProps> = ({ provider, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Provider>(provider || {
    name: '',
    api_base_url: '',
    api_key: '',
    models: [],
    transformer: { use: [] }
  });
  const [modelsText, setModelsText] = useState(
    provider ? provider.models.join('\n') : ''
  );
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [isValidating, setIsValidating] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [validationProgress, setValidationProgress] = useState(0);
  const [ollamaModels, setOllamaModels] = useState<string[]>([]);
  const [loadingOllamaModels, setLoadingOllamaModels] = useState(false);
  const [showOllamaModels, setShowOllamaModels] = useState(false);

  // Client-side validation
  const validateField = (name: string, value: string) => {
    const fieldErrors: string[] = [];
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          fieldErrors.push('Provider name is required');
        } else if (value.length < 2) {
          fieldErrors.push('Provider name must be at least 2 characters');
        } else if (!/^[a-zA-Z0-9._-]+$/.test(value)) {
          fieldErrors.push('Provider name can only contain letters, numbers, dots, hyphens, and underscores');
        }
        break;
      
      case 'api_base_url':
        if (!value.trim()) {
          fieldErrors.push('API base URL is required');
        } else {
          try {
            new URL(value);
            if (!value.startsWith('http://') && !value.startsWith('https://')) {
              fieldErrors.push('URL must start with http:// or https://');
            }
          } catch {
            fieldErrors.push('Please enter a valid URL');
          }
        }
        break;
      
      case 'api_key':
        // API key validation is optional but if provided, should have minimum length
        // Special case for Ollama which doesn't require an API key
        if (value && value !== 'ollama' && value.length < 10) {
          fieldErrors.push('API key seems too short (minimum 10 characters)');
        }
        break;
    }
    
    return fieldErrors;
  };

  const validateModels = (modelsText: string) => {
    const models = modelsText.split('\n').filter(m => m.trim()).map(m => m.trim());
    const fieldErrors: string[] = [];
    
    if (models.length === 0) {
      fieldErrors.push('At least one model is required');
    } else {
      models.forEach((model, index) => {
        if (model.length < 2) {
          fieldErrors.push(`Model ${index + 1}: Name too short (minimum 2 characters)`);
        }
        // Allow periods, hyphens, underscores, colons, slashes in model names
        // This supports models like "glm-4.5", "qwen2.5-coder:latest", "anthropic/claude-3.5-sonnet"
        if (!/^[a-zA-Z0-9._\-:\/]+$/.test(model)) {
          fieldErrors.push(`Model ${index + 1}: "${model}" contains invalid characters. Only letters, numbers, periods, hyphens, underscores, colons, and slashes are allowed.`);
        }
      });
      
      // Check for duplicates
      const duplicates = models.filter((model, index) => models.indexOf(model) !== index);
      if (duplicates.length > 0) {
        fieldErrors.push(`Duplicate models found: ${duplicates.join(', ')}`);
      }
    }
    
    return fieldErrors;
  };

  const handleFieldChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    
    // Real-time validation for touched fields
    if (touched[name]) {
      const fieldErrors = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: fieldErrors }));
    }
  };

  const handleFieldBlur = (name: string, value: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const fieldErrors = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: fieldErrors }));
  };

  const handleModelsChange = (value: string) => {
    setModelsText(value);
    
    // Real-time validation for models
    if (touched.models) {
      const fieldErrors = validateModels(value);
      setErrors(prev => ({ ...prev, models: fieldErrors }));
    }
  };

  const handleModelsBlur = () => {
    setTouched(prev => ({ ...prev, models: true }));
    const fieldErrors = validateModels(modelsText);
    setErrors(prev => ({ ...prev, models: fieldErrors }));
  };

  // Discover Ollama models
  const discoverOllamaModels = async () => {
    setLoadingOllamaModels(true);
    try {
      const ollamaUrl = formData.api_base_url.replace('/v1/chat/completions', '').replace('/api/chat', '');
      const response = await fetch(`${ollamaUrl}/api/tags`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      const modelNames = data.models?.map((model: any) => model.name) || [];
      setOllamaModels(modelNames);
      setShowOllamaModels(true);
    } catch (error) {
      console.error('Failed to fetch Ollama models:', error);
      alert(`Failed to discover Ollama models: ${error.message}\n\nMake sure Ollama is running and accessible at: ${formData.api_base_url}`);
    } finally {
      setLoadingOllamaModels(false);
    }
  };

  // Add selected Ollama models to the text area
  const addOllamaModel = (modelName: string) => {
    const currentModels = modelsText.split('\n').filter(m => m.trim()).map(m => m.trim());
    if (!currentModels.includes(modelName)) {
      const newModelsText = currentModels.concat(modelName).join('\n');
      setModelsText(newModelsText);
      handleModelsChange(newModelsText);
    }
  };

  // Check if URL looks like Ollama
  const isOllamaUrl = (url: string) => {
    return url.includes('11434') || url.includes('ollama') || url.includes('localhost');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);
    setValidationProgress(0);
    
    // Mark all fields as touched
    setTouched({
      name: true,
      api_base_url: true,
      api_key: true,
      models: true
    });
    
    // Validate all fields
    const allErrors: ValidationErrors = {
      name: validateField('name', formData.name),
      api_base_url: validateField('api_base_url', formData.api_base_url),
      api_key: validateField('api_key', formData.api_key),
      models: validateModels(modelsText)
    };
    
    setErrors(allErrors);
    setValidationProgress(25);
    
    // Check if there are any validation errors
    const hasErrors = Object.values(allErrors).some(fieldErrors => fieldErrors.length > 0);
    
    if (hasErrors) {
      setIsValidating(false);
      return;
    }
    
    const models = modelsText.split('\n').filter(m => m.trim()).map(m => m.trim());
    const finalProvider = { ...formData, models };
    
    setValidationProgress(50);
    
    try {
      // Server-side validation
      const response = await fetch(window.location.origin + '/api/validate-provider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: finalProvider })
      });
      
      setValidationProgress(75);
      
      const result = await response.json();
      setValidationProgress(100);
      
      if (result.valid) {
        onSave(finalProvider);
      } else {
        setErrors({ general: result.errors || ['Validation failed'] });
      }
    } catch (error) {
      setErrors({ general: ['Network error. Please try again.'] });
    } finally {
      setIsValidating(false);
      setTimeout(() => setValidationProgress(0), 1000);
    }
  };
  
  const getFieldError = (fieldName: string) => {
    return touched[fieldName] && errors[fieldName] && errors[fieldName].length > 0 ? errors[fieldName][0] : '';
  };
  
  const hasFieldError = (fieldName: string) => {
    return touched[fieldName] && errors[fieldName] && errors[fieldName].length > 0;
  };
  
  const isFieldValid = (fieldName: string) => {
    return touched[fieldName] && (!errors[fieldName] || errors[fieldName].length === 0);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Progress Indicator */}
      {isValidating && (
        <div className="progress-steps">
          <div className={`progress-step ${validationProgress >= 25 ? 'completed' : validationProgress > 0 ? 'active' : ''}`}>
            <div className="progress-step-circle">1</div>
            <div className="progress-step-label">Validate Form</div>
          </div>
          <div className={`progress-step ${validationProgress >= 50 ? 'completed' : validationProgress >= 25 ? 'active' : ''}`}>
            <div className="progress-step-circle">2</div>
            <div className="progress-step-label">Process Data</div>
          </div>
          <div className={`progress-step ${validationProgress >= 75 ? 'completed' : validationProgress >= 50 ? 'active' : ''}`}>
            <div className="progress-step-circle">3</div>
            <div className="progress-step-label">Server Check</div>
          </div>
          <div className={`progress-step ${validationProgress >= 100 ? 'completed' : validationProgress >= 75 ? 'active' : ''}`}>
            <div className="progress-step-circle">4</div>
            <div className="progress-step-label">Complete</div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2">
        <div className="form-group">
          <label className="form-label">Provider Name *</label>
          <input
            type="text"
            className={`form-input ${
              hasFieldError('name') ? 'error' : 
              isFieldValid('name') ? 'success' : ''
            }`}
            value={formData.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            onBlur={(e) => handleFieldBlur('name', e.target.value)}
            placeholder="e.g., openrouter, ollama, custom-provider"
            disabled={isValidating}
            autoComplete="off"
          />
          {hasFieldError('name') && (
            <div className="form-error-container">
              <div className="form-error-title">Invalid Provider Name</div>
              <ul className="form-error-list">
                {errors.name?.map((error, i) => (
                  <li key={i} className="form-error-item">{error}</li>
                ))}
              </ul>
            </div>
          )}
          {isFieldValid('name') && (
            <div className="form-help" style={{ color: 'var(--success-600)' }}>
              ✓ Valid provider name
            </div>
          )}
        </div>
        <div className="form-group">
          <label className="form-label">API Base URL *</label>
          <input
            type="url"
            className={`form-input ${
              hasFieldError('api_base_url') ? 'error' : 
              isFieldValid('api_base_url') ? 'success' : ''
            }`}
            value={formData.api_base_url}
            onChange={(e) => handleFieldChange('api_base_url', e.target.value)}
            onBlur={(e) => handleFieldBlur('api_base_url', e.target.value)}
            placeholder="https://api.provider.com/v1/chat/completions"
            disabled={isValidating}
            autoComplete="url"
          />
          {hasFieldError('api_base_url') && (
            <div className="form-error-container">
              <div className="form-error-title">Invalid API URL</div>
              <ul className="form-error-list">
                {errors.api_base_url?.map((error, i) => (
                  <li key={i} className="form-error-item">{error}</li>
                ))}
              </ul>
            </div>
          )}
          {isFieldValid('api_base_url') && (
            <div className="form-help" style={{ color: 'var(--success-600)' }}>
              ✓ Valid API endpoint URL
            </div>
          )}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">API Key</label>
        <input
          type="password"
          className={`form-input ${
            hasFieldError('api_key') ? 'error' : 
            isFieldValid('api_key') ? 'success' : ''
          }`}
          value={formData.api_key}
          onChange={(e) => handleFieldChange('api_key', e.target.value)}
          onBlur={(e) => handleFieldBlur('api_key', e.target.value)}
          placeholder="Enter your API key (optional)"
          disabled={isValidating}
          autoComplete="new-password"
        />
        {hasFieldError('api_key') && (
          <div className="form-error-container">
            <div className="form-error-title">API Key Issue</div>
            <ul className="form-error-list">
              {errors.api_key?.map((error, i) => (
                <li key={i} className="form-error-item">{error}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="form-help">
          Leave empty if the provider doesn't require authentication. For Ollama, use "ollama" as the API key.
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Models (one per line) *</label>
        <textarea
          className={`form-textarea ${
            hasFieldError('models') ? 'error' : 
            isFieldValid('models') ? 'success' : ''
          }`}
          value={modelsText}
          onChange={(e) => handleModelsChange(e.target.value)}
          onBlur={handleModelsBlur}
          placeholder="gpt-4\ngpt-3.5-turbo\nclaude-3-sonnet"
          rows={5}
          disabled={isValidating}
        />
        {hasFieldError('models') && (
          <div className="form-error-container">
            <div className="form-error-title">Model Configuration Issues</div>
            <ul className="form-error-list">
              {errors.models?.map((error, i) => (
                <li key={i} className="form-error-item">{error}</li>
              ))}
            </ul>
          </div>
        )}
        {isFieldValid('models') && (
          <div className="form-help" style={{ color: 'var(--success-600)' }}>
            ✓ {modelsText.split('\n').filter(m => m.trim()).length} models configured
          </div>
        )}
        {!hasFieldError('models') && !isFieldValid('models') && (
          <div className="form-help">
            Enter each model name on a separate line
          </div>
        )}
      </div>

      {/* Ollama Model Discovery */}
      {isOllamaUrl(formData.api_base_url) && (
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, var(--primary-50) 0%, var(--gray-50) 100%)',
            border: '1px solid var(--primary-200)',
            borderRadius: '12px',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Glassmorphism overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              pointerEvents: 'none'
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, var(--primary-500), var(--primary-600))',
                  borderRadius: '8px',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>🦙</span>
                </div>
                <div>
                  <h4 style={{ 
                    color: 'var(--gray-800)', 
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    margin: 0
                  }}>
                    Ollama Model Discovery
                  </h4>
                  <p style={{ 
                    color: 'var(--gray-600)', 
                    fontSize: '0.875rem',
                    margin: 0,
                    marginTop: '0.25rem'
                  }}>
                    Automatically discover and add models from your Ollama instance
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-small"
                onClick={discoverOllamaModels}
                disabled={loadingOllamaModels}
                style={{ 
                  marginBottom: showOllamaModels ? '1.5rem' : '0',
                  background: loadingOllamaModels ? 'var(--gray-400)' : undefined,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {loadingOllamaModels ? (
                  <>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid var(--gray-300)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Discovering Models...
                  </>
                ) : (
                  <>
                    🔍 Discover Ollama Models
                  </>
                )}
              </button>

              {/* Model Selection Grid */}
              {showOllamaModels && (
                <div style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '8px',
                  padding: '1rem',
                  backdropFilter: 'blur(5px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}>
                    <h5 style={{ 
                      color: 'var(--gray-800)', 
                      fontWeight: '600',
                      margin: 0,
                      fontSize: '1rem'
                    }}>
                      Available Models ({ollamaModels.length})
                    </h5>
                    <button
                      type="button"
                      onClick={() => setShowOllamaModels(false)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--gray-500)',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        borderRadius: '4px',
                        fontSize: '1.25rem',
                        lineHeight: 1
                      }}
                    >
                      ×
                    </button>
                  </div>
                  
                  {ollamaModels.length === 0 ? (
                    <div style={{
                      textAlign: 'center',
                      color: 'var(--gray-500)',
                      padding: '2rem',
                      fontStyle: 'italic'
                    }}>
                      No models found. Make sure Ollama is running and has models installed.
                    </div>
                  ) : (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
                      gap: '0.75rem'
                    }}>
                      {ollamaModels.map((model, index) => {
                        const isAlreadySelected = modelsText.split('\n')
                          .filter(m => m.trim())
                          .map(m => m.trim())
                          .includes(model);
                        
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => addOllamaModel(model)}
                            disabled={isAlreadySelected}
                            style={{
                              background: isAlreadySelected 
                                ? 'linear-gradient(135deg, var(--success-50), var(--success-100))'
                                : 'linear-gradient(135deg, var(--gray-50), white)',
                              border: isAlreadySelected 
                                ? '2px solid var(--success-300)'
                                : '2px solid var(--gray-200)',
                              borderRadius: '8px',
                              padding: '0.875rem',
                              textAlign: 'left',
                              cursor: isAlreadySelected ? 'default' : 'pointer',
                              transition: 'all 0.2s ease',
                              backdropFilter: 'blur(5px)',
                              position: 'relative',
                              overflow: 'hidden'
                            }}
                            onMouseEnter={(e) => {
                              if (!isAlreadySelected) {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                                e.currentTarget.style.borderColor = 'var(--primary-300)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isAlreadySelected) {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.borderColor = 'var(--gray-200)';
                              }
                            }}
                          >
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '0.75rem' 
                            }}>
                              <div style={{
                                background: isAlreadySelected 
                                  ? 'var(--success-500)'
                                  : 'linear-gradient(135deg, var(--primary-400), var(--primary-500))',
                                borderRadius: '6px',
                                padding: '0.375rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: '32px',
                                height: '32px'
                              }}>
                                <span style={{ 
                                  fontSize: '1rem',
                                  color: 'white'
                                }}>
                                  {isAlreadySelected ? '✓' : '🤖'}
                                </span>
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ 
                                  color: 'var(--gray-800)', 
                                  fontWeight: '500',
                                  fontSize: '0.875rem',
                                  wordBreak: 'break-all',
                                  lineHeight: '1.3'
                                }}>
                                  {model}
                                </div>
                                <div style={{ 
                                  color: isAlreadySelected ? 'var(--success-600)' : 'var(--gray-500)', 
                                  fontSize: '0.75rem',
                                  marginTop: '0.25rem',
                                  fontWeight: '500'
                                }}>
                                  {isAlreadySelected ? 'Already added' : 'Click to add'}
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Advanced Options Toggle */}
      <div className="form-group">
        <button
          type="button"
          className="btn btn-secondary btn-small"
          onClick={() => setShowAdvanced(!showAdvanced)}
          style={{ marginBottom: '1rem' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ 
            transform: showAdvanced ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }}>
            <polyline points="6,9 12,15 18,9"/>
          </svg>
          {showAdvanced ? 'Hide' : 'Show'} Advanced Options
        </button>
        
        {showAdvanced && (
          <div className="accordion-content active">
            <div className="accordion-body">
              <div className="form-help" style={{ marginBottom: '1rem' }}>
                Advanced configuration options for transformer settings and custom parameters.
              </div>
              
              <div className="form-group">
                <label className="form-label">Transformer Settings (JSON)</label>
                <textarea
                  className="form-textarea"
                  value={JSON.stringify(formData.transformer, null, 2)}
                  onChange={(e) => {
                    try {
                      const transformer = JSON.parse(e.target.value);
                      setFormData({ ...formData, transformer });
                    } catch {
                      // Invalid JSON, keep the text for user to fix
                    }
                  }}
                  placeholder='{\n  "use": ["openrouter"]\n}'
                  rows={4}
                  disabled={isValidating}
                />
                <div className="form-help">
                  Configure request/response transformers for this provider
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {errors.general && errors.general.length > 0 && (
        <div className="form-error-container">
          <div className="form-error-title">Server Validation Errors</div>
          <ul className="form-error-list">
            {errors.general.map((error, i) => (
              <li key={i} className="form-error-item">{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', alignItems: 'center' }}>
        <button 
          type="submit" 
          className="btn btn-success"
          disabled={isValidating}
          style={{ position: 'relative' }}
        >
          {isValidating ? (
            <>
              <div className="spinner" style={{ width: '16px', height: '16px', marginRight: '8px' }}></div>
              Validating...
            </>
          ) : (
            <>
              💾 {provider ? 'Update' : 'Add'} Provider
            </>
          )}
        </button>
        <button 
          type="button" 
          className="btn btn-secondary" 
          onClick={onCancel}
          disabled={isValidating}
        >
          ❌ Cancel
        </button>
        
        {isValidating && validationProgress > 0 && (
          <div style={{ flex: 1, marginLeft: '1rem' }}>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${validationProgress}%` }}
              ></div>
            </div>
            <div className="form-help" style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
              {validationProgress < 25 && 'Validating form fields...'}
              {validationProgress >= 25 && validationProgress < 50 && 'Processing configuration...'}
              {validationProgress >= 50 && validationProgress < 75 && 'Checking with server...'}
              {validationProgress >= 75 && validationProgress < 100 && 'Finalizing...'}
              {validationProgress >= 100 && 'Complete!'}
            </div>
          </div>
        )}
      </div>
    </form>
  );
};