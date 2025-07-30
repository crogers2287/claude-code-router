import React, { useState, useRef } from 'react';
import { Config } from './App';

interface CommandGeneratorProps {
  config: Config;
}

interface CommandParams {
  model?: string;
  customText?: string;
  temperature?: number;
  maxTokens?: number;
  useStreaming?: boolean;
}

export const CommandGenerator: React.FC<CommandGeneratorProps> = ({ config }) => {
  const [params, setParams] = useState<CommandParams>({
    temperature: 0.7,
    maxTokens: 4000,
    useStreaming: true
  });
  
  const [generatedCommand, setGeneratedCommand] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);

  const generateCommand = () => {
    let command = 'ccr code ';
    
    // Add model if specified (Claude CLI --model flag)
    if (params.model) {
      command += `--model "${params.model}" `;
    }
    
    // Add temperature if not default (Claude CLI --temperature flag)
    if (params.temperature !== 0.7) {
      command += `--temperature ${params.temperature} `;
    }
    
    // Add max tokens if not default (Claude CLI --max-tokens flag)
    if (params.maxTokens !== 4000) {
      command += `--max-tokens ${params.maxTokens} `;
    }
    
    // Add streaming option (Claude CLI --no-stream flag)
    if (!params.useStreaming) {
      command += `--no-stream `;
    }
    
    // Add the prompt text
    const promptText = params.customText || 'Your prompt here';
    command += `"${promptText}"`;
    
    setGeneratedCommand(command);
  };

  const copyToClipboard = async () => {
    if (generatedCommand) {
      try {
        await navigator.clipboard.writeText(generatedCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        // Fallback for browsers that don't support clipboard API
        if (textareaRef.current) {
          textareaRef.current.select();
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      }
    }
  };

  const getAllAvailableModels = () => {
    const allModels = new Set<string>();
    config.Providers.forEach(provider => {
      provider.models.forEach(model => allModels.add(model));
    });
    return Array.from(allModels).sort();
  };

  const presetCommands = [
    {
      name: 'Quick Code Review',
      description: 'Review code with default settings',
      command: 'ccr code "Review this code for potential improvements and bugs"'
    },
    {
      name: 'Detailed Analysis',
      description: 'Analyze with higher temperature for creativity',
      command: 'ccr code --temperature 1.0 "Analyze this code and suggest creative improvements"'
    },
    {
      name: 'Precise Coding',
      description: 'Low temperature for deterministic results',
      command: 'ccr code --temperature 0.1 "Write clean, production-ready code for this requirement"'
    },
    {
      name: 'Long Context Processing',
      description: 'Process large amounts of text',
      command: 'ccr code --max-tokens 8000 "Analyze this entire document and provide a comprehensive summary"'
    },
    {
      name: 'Quick Response',
      description: 'Short, concise responses',
      command: 'ccr code --max-tokens 500 "Provide a brief explanation of this concept"'
    },
    {
      name: 'Non-Streaming Mode',
      description: 'Get complete response at once',
      command: 'ccr code --no-stream "Explain this complex topic in detail"'
    }
  ];

  React.useEffect(() => {
    generateCommand();
  }, [params]);

  return (
    <div className="command-generator">
      <div className="card">
        <div className="card-header">
          <h2>🛠️ CLI Command Generator</h2>
          <p>Generate custom CCR commands using Claude CLI parameters. Provider selection is handled by your routing configuration.</p>
        </div>
        
        <div className="card-content">
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="model" className="form-label">
                <span className="label-icon">🤖</span>
                Model (Optional)
              </label>
              <select
                id="model"
                value={params.model || ''}
                onChange={(e) => setParams(prev => ({ ...prev, model: e.target.value || undefined }))}
                className="form-input"
              >
                <option value="">Use Router Default</option>
                {getAllAvailableModels().map(model => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
              <small className="form-help">Specify a model to override router selection</small>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="temperature" className="form-label">
                  <span className="label-icon">🌡️</span>
                  Temperature
                </label>
                <div className="slider-container">
                  <input
                    type="range"
                    id="temperature"
                    min="0"
                    max="2"
                    step="0.1"
                    value={params.temperature}
                    onChange={(e) => setParams(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                    className="form-range"
                  />
                  <span className="slider-value">{params.temperature}</span>
                </div>
                <small className="form-help">Controls randomness (0 = deterministic, 2 = very creative)</small>
              </div>
              
              <div className="form-group">
                <label htmlFor="maxTokens" className="form-label">
                  <span className="label-icon">📏</span>
                  Max Tokens
                </label>
                <input
                  type="number"
                  id="maxTokens"
                  min="1"
                  max="100000"
                  value={params.maxTokens}
                  onChange={(e) => setParams(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                  className="form-input"
                />
                <small className="form-help">Maximum response length</small>
              </div>
              
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={params.useStreaming}
                    onChange={(e) => setParams(prev => ({ ...prev, useStreaming: e.target.checked }))}
                  />
                  <span className="checkmark"></span>
                  <span className="label-icon">🌊</span>
                  Enable Streaming
                </label>
                <small className="form-help">Stream response in real-time</small>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="customText" className="form-label">
                <span className="label-icon">✏️</span>
                Prompt Text
              </label>
              <textarea
                id="customText"
                value={params.customText || ''}
                onChange={(e) => setParams(prev => ({ ...prev, customText: e.target.value }))}
                placeholder="Enter your prompt here..."
                className="form-textarea textarea-large"
                rows={4}
              />
              <small className="form-help">The prompt that will be sent to the AI model</small>
            </div>
          </div>
          
          <div className="command-output">
            <label htmlFor="generated-command" className="form-label">
              <span className="label-icon">⚡</span>
              Generated Command
            </label>
            <div className="command-display">
              <textarea
                ref={textareaRef}
                id="generated-command"
                value={generatedCommand}
                readOnly
                className="command-textarea"
                rows={3}
              />
              <button
                onClick={copyToClipboard}
                className={`copy-button ${copied ? 'copied' : ''}`}
                title="Copy to clipboard"
              >
                {copied ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22,4 12,14.01 9,11.01"/>
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h3>📚 Command Presets</h3>
          <p>Quick access to commonly used command patterns and configurations</p>
        </div>
        
        <div className="card-content">
          <div className="preset-commands">
            {presetCommands.map((preset, index) => (
              <div key={index} className="preset-command">
                <div className="preset-header">
                  <h4>{preset.name}</h4>
                  <p>{preset.description}</p>
                </div>
                <div className="preset-command-display">
                  <code>{preset.command}</code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(preset.command);
                      // Could add a toast notification here
                    }}
                    className="preset-copy-button"
                    title="Copy preset command"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h3>📖 Command Reference</h3>
          <p>Available CCR command options and their usage patterns</p>
        </div>
        
        <div className="card-content">
          <div className="reference-section">
            <h4>🔧 Basic Usage</h4>
            <pre><code>ccr code "Your prompt here"</code></pre>
            
            <h4>🎯 Model Selection</h4>
            <ul className="reference-list">
              <li><code>--model "model-name"</code> - Override router model selection</li>
              <li>Provider selection is handled by your routing configuration</li>
              <li>Available models are sourced from your configured providers</li>
            </ul>
            
            <h4>⚙️ Response Control</h4>
            <ul className="reference-list">
              <li><code>--temperature 0.7</code> - Control response randomness (0 = deterministic, 2 = very creative)</li>
              <li><code>--max-tokens 4000</code> - Maximum response length (1-100000)</li>
              <li><code>--no-stream</code> - Disable streaming output (get complete response at once)</li>
            </ul>
            
            <h4>🚀 Additional Claude CLI Options</h4>
            <ul className="reference-list">
              <li><code>--print</code> - Print response without interactive mode</li>
              <li><code>--debug</code> - Enable debug output</li>
              <li>Run <code>claude --help</code> for full Claude CLI reference</li>
            </ul>
            
            <h4>💡 How It Works</h4>
            <ul className="reference-list">
              <li>CCR acts as a proxy to the Claude CLI</li>
              <li>Provider routing is configured in your <code>~/.claude-code-router/config.json</code></li>
              <li>Commands are routed based on your routing rules and transformers</li>
              <li>All Claude CLI parameters are supported and passed through</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};