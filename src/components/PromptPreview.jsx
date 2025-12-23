import React from 'react';
import { Copy, Terminal } from 'lucide-react';
import { usePrompt } from '../context/PromptContext';

const PromptPreview = () => {
    const { generatePrompt } = usePrompt();
    const promptText = generatePrompt();

    const handleCopy = () => {
        navigator.clipboard.writeText(promptText);
        alert("Prompt copied!");
    };

    return (
        <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--accent-color)', // Highlight border
            padding: '1.5rem',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: 'var(--accent-color)',
                    letterSpacing: '0.05em'
                }}>
                    Generated Prompt
                </span>
                <button onClick={handleCopy} style={{
                    background: 'var(--accent-color)',
                    color: '#fff',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem'
                }}>
                    <Copy size={16} /> Copy
                </button>
            </div>

            <div style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '1rem',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                color: 'var(--text-primary)',
                lineHeight: '1.5',
                border: '1px solid var(--border-color)',
                maxHeight: '120px',
                overflowY: 'auto'
            }}>
                {promptText || "Select options to generate..."}
            </div>
        </div>
    );
};

export default PromptPreview;
