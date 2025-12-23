import React from 'react';
import ItemIcon from './ItemIcon';

const VisualGrid = ({ items, selectedId, selectedColor, onSelect }) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '1rem',
            marginTop: '1rem'
        }}>
            {items.map(item => {
                const isSelected = selectedId === item.id;
                return (
                    <div
                        key={item.id}
                        onClick={() => onSelect(item)}
                        style={{
                            position: 'relative',
                            padding: '1rem',
                            // Fix: Lighter background for selection to avoid "Dark Blue Screen" feel
                            background: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'var(--bg-secondary)',
                            border: `1px solid ${isSelected ? 'var(--accent-color)' : 'var(--border-color)'}`,
                            borderRadius: '16px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.8rem',
                            textAlign: 'center',
                            // Glow effect only on border, not whole box
                            boxShadow: isSelected ? '0 0 0 1px var(--accent-color), 0 4px 12px rgba(0,0,0,0.2)' : 'none',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Color Preview Dot */}
                        {isSelected && selectedColor && (
                            <div style={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                width: '14px',
                                height: '14px',
                                borderRadius: '50%',
                                background: selectedColor.hex,
                                border: '1px solid #fff',
                                zIndex: 2
                            }} />
                        )}

                        {/* IMAGE or ICON */}
                        {item.img ? (
                            <div style={{
                                width: '100%',
                                height: '100px', // Fixed height for consistency
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '0.5rem',
                                background: '#fff', // White background for the sketch
                                borderRadius: '8px',
                                padding: '5px'
                            }}>
                                <img
                                    src={item.img}
                                    alt={item.label}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                        filter: 'contrast(1.1)'
                                    }}
                                />
                            </div>
                        ) : (
                            <ItemIcon
                                id={item.id}
                                color={isSelected && selectedColor ? selectedColor.hex : (isSelected ? 'var(--accent-color)' : 'var(--text-secondary)')}
                                size={48}
                            />
                        )}

                        {/* Label */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: isSelected ? '600' : '500', color: 'var(--text-primary)' }}>
                                {item.label}
                            </span>
                            {item.description && (
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', opacity: 0.8 }}>
                                    {item.description}
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default VisualGrid;
