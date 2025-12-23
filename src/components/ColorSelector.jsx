import React, { useState } from 'react';
import { COLOR_GROUPS } from '../data/options';

const ColorSelector = ({ selectedColor, onSelect }) => {
    const [activeGroup, setActiveGroup] = useState(COLOR_GROUPS[0].id);

    return (
        <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Color / Cor
            </label>

            {/* Group Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {COLOR_GROUPS.map(group => (
                    <button
                        key={group.id}
                        onClick={() => setActiveGroup(group.id)}
                        style={{
                            padding: '0.3rem 0.8rem',
                            fontSize: '0.75rem',
                            borderRadius: '12px',
                            border: '1px solid',
                            borderColor: activeGroup === group.id ? 'var(--accent-color)' : 'var(--border-color)',
                            background: activeGroup === group.id ? 'var(--accent-color)' : 'transparent',
                            color: activeGroup === group.id ? '#fff' : 'var(--text-secondary)',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {group.label}
                    </button>
                ))}
            </div>

            {/* Colors Grid */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {COLOR_GROUPS.find(g => g.id === activeGroup)?.colors.map(c => (
                    <div
                        key={c.id}
                        onClick={() => onSelect(c)}
                        title={c.label}
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: c.hex,
                            cursor: 'pointer',
                            border: selectedColor?.id === c.id ? '3px solid #fff' : '1px solid var(--border-color)',
                            boxShadow: selectedColor?.id === c.id ? '0 0 0 2px var(--accent-color)' : 'none',
                            transition: 'all 0.2s'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ColorSelector;
