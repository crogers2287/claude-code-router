import React from 'react';
import { Provider } from './App';

interface ProviderTemplatesProps {
  onSelect: (provider: Provider) => void;
}

interface TemplateWithMetadata extends Provider {
  displayName: string;
  description: string;
  icon: string;
  category: string;
  popularity: number;
  difficulty: 'easy' | 'medium' | 'advanced';
  features: string[];
}

const templates: { [key: string]: Provider } = {
  openrouter: {
    name: 'openrouter',
    api_base_url: 'https://openrouter.ai/api/v1/chat/completions',
    api_key: '',
    models: [
      'google/gemini-2.5-pro-preview',
      'anthropic/claude-sonnet-4',
      'anthropic/claude-3.5-sonnet',
      'anthropic/claude-3.7-sonnet:thinking',
      'openai/gpt-4o',
      'openai/gpt-4o-mini',
      'openai/o1-preview',
      'openai/o1-mini',
      'deepseek/deepseek-chat',
      'deepseek/deepseek-reasoner',
      'meta-llama/llama-3.3-70b-instruct',
      'meta-llama/llama-3.2-90b-vision-instruct',
      'google/gemini-flash-1.5-8b',
      'x-ai/grok-2-vision-1212',
      'qwen/qwen-2.5-72b-instruct',
      'mistralai/mistral-large',
      'anthropic/claude-3-haiku',
      'cohere/command-r-plus'
    ],
    transformer: {
      use: ['openrouter']
    }
  },
  
  ollama: {
    name: 'ollama',
    api_base_url: 'http://localhost:11434/v1/chat/completions',
    api_key: 'ollama',
    models: [
      'qwen2.5-coder:latest',
      'llama3.1:8b',
      'llama3.1:70b',
      'codellama:latest',
      'deepseek-coder:latest',
      'phi3:latest'
    ],
    transformer: {
      use: []
    }
  },
  
  gemini: {
    name: 'gemini',
    api_base_url: 'https://generativelanguage.googleapis.com/v1beta/models/',
    api_key: '',
    models: [
      'gemini-2.5-flash',
      'gemini-2.5-pro',
      'gemini-1.5-pro',
      'gemini-1.5-flash'
    ],
    transformer: {
      use: ['gemini']
    }
  },
  
  deepseek: {
    name: 'deepseek',
    api_base_url: 'https://api.deepseek.com/chat/completions',
    api_key: '',
    models: [
      'deepseek-chat',
      'deepseek-reasoner'
    ],
    transformer: {
      use: ['deepseek'],
      'deepseek-chat': {
        use: ['tooluse']
      }
    }
  },
  
  moonshot: {
    name: 'moonshot',
    api_base_url: 'https://api.moonshot.cn/v1/chat/completions',
    api_key: '',
    models: [
      'moonshot-v1-8k',
      'moonshot-v1-32k',
      'moonshot-v1-128k'
    ],
    transformer: {
      use: []
    }
  },
  
  'z.ai': {
    name: 'z.ai',
    api_base_url: 'https://api.z.ai/api/paas/v4/chat/completions',
    api_key: '',
    models: [
      'z1-preview'
    ],
    transformer: {
      use: []
    }
  },
  
  volcengine: {
    name: 'volcengine',
    api_base_url: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
    api_key: '',
    models: [
      'deepseek-v3-250324',
      'deepseek-r1-250528'
    ],
    transformer: {
      use: ['deepseek']
    }
  },
  
  siliconflow: {
    name: 'siliconflow',
    api_base_url: 'https://api.siliconflow.cn/v1/chat/completions',
    api_key: '',
    models: [
      'moonshotai/Kimi-K2-Instruct',
      'Qwen/Qwen2.5-72B-Instruct',
      'deepseek-ai/DeepSeek-V2.5'
    ],
    transformer: {
      use: [
        ['maxtoken', { max_tokens: 16384 }]
      ]
    }
  },
  
  modelscope: {
    name: 'modelscope',
    api_base_url: 'https://api-inference.modelscope.cn/v1/chat/completions',
    api_key: '',
    models: [
      'Qwen/Qwen3-Coder-480B-A35B-Instruct',
      'Qwen/Qwen3-235B-A22B-Thinking-2507'
    ],
    transformer: {
      use: [
        ['maxtoken', { max_tokens: 65536 }],
        'enhancetool'
      ],
      'Qwen/Qwen3-235B-A22B-Thinking-2507': {
        use: ['reasoning']
      }
    }
  },
  
  dashscope: {
    name: 'dashscope',
    api_base_url: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
    api_key: '',
    models: [
      'qwen3-coder-plus',
      'qwen-max',
      'qwen-plus'
    ],
    transformer: {
      use: [
        ['maxtoken', { max_tokens: 65536 }],
        'enhancetool'
      ]
    }
  },
  
  openai: {
    name: 'openai',
    api_base_url: 'https://api.openai.com/v1/chat/completions',
    api_key: '',
    models: [
      'gpt-4o',
      'gpt-4o-mini',
      'gpt-4-turbo',
      'gpt-3.5-turbo',
      'o1-preview',
      'o1-mini'
    ],
    transformer: {
      use: []
    }
  },
  
  anthropic: {
    name: 'anthropic',
    api_base_url: 'https://api.anthropic.com/v1/messages',
    api_key: '',
    models: [
      'claude-3-5-sonnet-20241022',
      'claude-3-5-haiku-20241022',
      'claude-3-opus-20240229'
    ],
    transformer: {
      use: ['anthropic']
    }
  },
  
  'local-tgi': {
    name: 'local-tgi',
    api_base_url: 'http://localhost:8080/v1/chat/completions',
    api_key: '',
    models: [
      'tgi-model'
    ],
    transformer: {
      use: []
    }
  },
  
  'openai-compatible': {
    name: 'custom-openai-compatible',
    api_base_url: 'http://localhost:8000/v1/chat/completions',
    api_key: '',
    models: [
      'custom-model'
    ],
    transformer: {
      use: []
    }
  }
};

export const ProviderTemplates: React.FC<ProviderTemplatesProps> = ({ onSelect }) => {
  const [filter, setFilter] = React.useState<'all' | 'cloud' | 'local' | 'enterprise'>('all');
  const [search, setSearch] = React.useState('');
  
  const getTemplateMetadata = (key: string, template: Provider): TemplateWithMetadata => ({
    ...template,
    displayName: getDisplayName(key),
    description: getDescription(key),
    icon: getIcon(key),
    category: getCategory(key),
    popularity: getPopularity(key),
    difficulty: getDifficulty(key),
    features: getFeatures(key)
  });
  
  const templateEntries = Object.entries(templates).map(([key, template]) => ({
    key,
    ...getTemplateMetadata(key, template)
  }));
  
  const filteredTemplates = templateEntries.filter(template => {
    const matchesSearch = search === '' || 
      template.displayName.toLowerCase().includes(search.toLowerCase()) ||
      template.description.toLowerCase().includes(search.toLowerCase()) ||
      template.features.some(feature => feature.toLowerCase().includes(search.toLowerCase()));
    
    const matchesFilter = filter === 'all' || 
      (filter === 'cloud' && ['OpenAI', 'Anthropic', 'Google', 'Multi-Provider'].includes(template.category)) ||
      (filter === 'local' && template.category === 'Local') ||
      (filter === 'enterprise' && ['ByteDance', 'Alibaba'].includes(template.category));
    
    return matchesSearch && matchesFilter;
  }).sort((a, b) => b.popularity - a.popularity);
  
  return (
    <div className="provider-templates">
      <div className="template-header">
        <h3 className="template-title">Quick Setup</h3>
        <p className="template-subtitle">Choose from popular LLM providers to get started quickly</p>
        
        {/* Search and Filter Controls */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Search providers, features, or descriptions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ margin: 0 }}
            />
          </div>
          <div className="dropdown">
            <select 
              className="form-select" 
              value={filter} 
              onChange={(e) => setFilter(e.target.value as any)}
              style={{ margin: 0, minWidth: '150px' }}
            >
              <option value="all">All Providers</option>
              <option value="cloud">Cloud Services</option>
              <option value="local">Local Setup</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
        </div>
        
        {/* Results Summary */}
        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--gray-600)' }}>
          Showing {filteredTemplates.length} of {templateEntries.length} providers
          {search && ` matching "${search}"`}
        </div>
      </div>
      
      {filteredTemplates.length === 0 ? (
        <div className="empty-state-enhanced">
          <div className="empty-state-icon">🔍</div>
          <h3 className="empty-state-title">No providers found</h3>
          <p className="empty-state-description">
            {search ? 
              `No providers match your search for "${search}". Try a different search term or clear the filter.` :
              'No providers match the selected filter. Try selecting "All Providers" to see all options.'
            }
          </p>
          <button className="empty-state-action" onClick={() => { setSearch(''); setFilter('all'); }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18l-2 13H5L3 6z"/>
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3">
          {filteredTemplates.map((template) => {
            return (
              <div
                key={template.key}
                className="provider-template-card tooltip"
                data-tooltip={`${template.features.join(', ')}`}
                onClick={() => onSelect({ 
                  name: template.name,
                  api_base_url: template.api_base_url,
                  api_key: template.api_key,
                  models: template.models,
                  transformer: template.transformer
                })}
              >
                <div className="template-card-header">
                  <div className="template-icon">{template.icon}</div>
                  <div className="template-category">{template.category}</div>
                </div>
                <div className="template-card-content">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h4 className="template-name">{template.displayName}</h4>
                    <div className={`badge ${
                      template.difficulty === 'easy' ? 'badge-success' :
                      template.difficulty === 'medium' ? 'badge-warning' : 'badge-error'
                    }`} style={{ fontSize: '0.7rem' }}>
                      {template.difficulty.toUpperCase()}
                    </div>
                  </div>
                  <p className="template-description">{template.description}</p>
                  
                  {/* Features Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', margin: '0.5rem 0' }}>
                    {template.features.slice(0, 3).map((feature, i) => (
                      <span key={i} className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '0.1rem 0.3rem' }}>
                        {feature}
                      </span>
                    ))}
                    {template.features.length > 3 && (
                      <span className="badge" style={{ fontSize: '0.65rem', padding: '0.1rem 0.3rem', background: 'var(--gray-200)', color: 'var(--gray-600)' }}>
                        +{template.features.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                    <div className="template-models-count">
                      {template.models.length} model{template.models.length !== 1 ? 's' : ''}
                    </div>
                    
                    {/* Popularity Stars */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.1rem' }}>
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < template.popularity ? 'var(--warning-500)' : 'var(--gray-300)'} stroke="none">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="template-card-footer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="16"/>
                    <line x1="8" y1="12" x2="16" y2="12"/>
                  </svg>
                  Add Provider
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

function getDisplayName(key: string): string {
  const names: { [key: string]: string } = {
    openrouter: 'OpenRouter',
    ollama: 'Ollama',
    gemini: 'Google Gemini',
    deepseek: 'DeepSeek',
    moonshot: 'Moonshot AI',
    'z.ai': 'Z.ai',
    volcengine: 'VolcEngine',
    siliconflow: 'SiliconFlow',
    modelscope: 'ModelScope',
    dashscope: 'DashScope',
    openai: 'OpenAI',
    anthropic: 'Anthropic',
    'local-tgi': 'Local TGI',
    'openai-compatible': 'Custom API'
  };
  return names[key] || key;
}

function getDescription(key: string): string {
  const descriptions: { [key: string]: string } = {
    openrouter: 'Access multiple models through OpenRouter',
    ollama: 'Local models with Ollama',
    gemini: 'Google\'s Gemini models',
    deepseek: 'DeepSeek reasoning models',
    moonshot: 'Moonshot AI models',
    'z.ai': 'Z.ai preview models',
    volcengine: 'ByteDance VolcEngine',
    siliconflow: 'SiliconFlow API',
    modelscope: 'Alibaba ModelScope',
    dashscope: 'Alibaba DashScope',
    openai: 'OpenAI GPT models',
    anthropic: 'Anthropic Claude models',
    'local-tgi': 'Text Generation Inference',
    'openai-compatible': 'Custom OpenAI-compatible API'
  };
  return descriptions[key] || 'Custom provider configuration';
}

function getIcon(key: string): string {
  const icons: { [key: string]: string } = {
    openrouter: '🔀',
    ollama: '🦙',
    gemini: '💎',
    deepseek: '🧠',
    moonshot: '🚀',
    'z.ai': '⚡',
    volcengine: '🌋',
    siliconflow: '⚙️',
    modelscope: '🔬',
    dashscope: '📊',
    openai: '🤖',
    anthropic: '🎭',
    'local-tgi': '🖥️',
    'openai-compatible': '🔧'
  };
  return icons[key] || '🔧';
}

function getCategory(key: string): string {
  const categories: { [key: string]: string } = {
    openrouter: 'Multi-Provider',
    ollama: 'Local',
    gemini: 'Google',
    deepseek: 'DeepSeek',
    moonshot: 'Moonshot',
    'z.ai': 'Z.ai',
    volcengine: 'ByteDance',
    siliconflow: 'SiliconFlow',
    modelscope: 'Alibaba',
    dashscope: 'Alibaba',
    openai: 'OpenAI',
    anthropic: 'Anthropic',
    'local-tgi': 'Local',
    'openai-compatible': 'Custom'
  };
  return categories[key] || 'Custom';
}

function getPopularity(key: string): number {
  const popularity: { [key: string]: number } = {
    openrouter: 5,
    openai: 5,
    anthropic: 5,
    gemini: 4,
    ollama: 4,
    deepseek: 4,
    moonshot: 3,
    'z.ai': 3,
    dashscope: 3,
    volcengine: 3,
    siliconflow: 2,
    modelscope: 2,
    'local-tgi': 2,
    'openai-compatible': 1
  };
  return popularity[key] || 1;
}

function getDifficulty(key: string): 'easy' | 'medium' | 'advanced' {
  const difficulty: { [key: string]: 'easy' | 'medium' | 'advanced' } = {
    openrouter: 'easy',
    openai: 'easy',
    anthropic: 'easy',
    gemini: 'medium',
    ollama: 'medium',
    deepseek: 'easy',
    moonshot: 'easy',
    'z.ai': 'medium',
    dashscope: 'medium',
    volcengine: 'advanced',
    siliconflow: 'medium',
    modelscope: 'advanced',
    'local-tgi': 'advanced',
    'openai-compatible': 'advanced'
  };
  return difficulty[key] || 'medium';
}

function getFeatures(key: string): string[] {
  const features: { [key: string]: string[] } = {
    openrouter: ['Multiple Models', 'Easy Setup', 'Cost Effective', 'High Availability'],
    openai: ['GPT Models', 'Reliable', 'Well Documented', 'Function Calling'],
    anthropic: ['Claude Models', 'Safety Focused', 'Long Context', 'Constitutional AI'],
    gemini: ['Multimodal', 'Fast', 'Google Integration', 'Free Tier'],
    ollama: ['Local Privacy', 'No API Keys', 'Custom Models', 'Offline Capable'],
    deepseek: ['Reasoning Models', 'Code Generation', 'Mathematics', 'Research Focus'],
    moonshot: ['Chinese Models', 'Long Context', 'Competitive Pricing'],
    'z.ai': ['Preview Access', 'Advanced Reasoning', 'Research Models'],
    dashscope: ['Alibaba Cloud', 'Chinese Market', 'Enterprise Features'],
    volcengine: ['ByteDance Models', 'Asia Pacific', 'High Performance'],
    siliconflow: ['Multi-Model Hub', 'Cost Effective', 'Asian Models'],
    modelscope: ['Research Models', 'Open Source', 'Academic Use'],
    'local-tgi': ['Self Hosted', 'Full Control', 'Custom Hardware'],
    'openai-compatible': ['Custom API', 'Flexible', 'Self Managed']
  };
  return features[key] || ['Custom Setup'];
}