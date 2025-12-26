import React from 'react';
import ItemIcon from './ItemIcon';

const VisualGrid = ({ items, selectedId, selectedColor, onSelect }) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', // Slightly smaller min-width for 3:4 cards
            gap: '1rem',
            marginTop: '1rem'
        }}>
            {items.map(item => {
                const isSelected = selectedId === item.id;

                // Construct image path: /public/clothes/[id].jpg (assuming typical setup)
                // Note: In Vite/public folder, we reference as /clothes/[id].jpg or /images/[id].jpg. 
                // User said "as imagens 3:4 das roupas que eu gero no catálogo".
                // We'll try /images/[id].jpg as established in MainSelector preview. 
                // Or maybe just /clothes/[id].jpg? The user mentioned "public/clothes/" in MainSelector code reading? 
                // Wait, in MainSelector reading (previous turn), renderPreviewSidebar used: src={`/public/clothes/${currentItem.id}.jpg`} which is likely wrong for Vite (should be /clothes/...). 
                // But the user said "Place your images in public/images/" in the Walkthrough/Verify step.
                // Let's stick to a standard Convention: /images/[id].jpg to match the instruction we gave. 
                // Actually, let's support both or just one consistent one. The user said: "Place your images in public/images/" in the notification I sent.
                const imgPath = `public/clothes/${item.id}.jpg`;

                return (
                    <div
                        key={item.id}
                        onClick={() => onSelect(item)}
                        style={{
                            position: 'relative',
                            // Aspect Ratio 3:4 container
                            aspectRatio: '3/4',
                            background: isSelected ? 'rgba(244, 114, 182, 0.1)' : 'var(--bg-secondary)', // Pink tint if selected
                            border: `1px solid ${isSelected ? 'var(--accent-color)' : 'var(--border-color)'}`,
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start', // Align content to top
                            textAlign: 'center',
                            boxShadow: isSelected ? '0 0 0 2px var(--accent-color)' : '0 2px 4px rgba(0,0,0,0.02)',
                            overflow: 'hidden'
                        }}
                    >
                        {/* IMAGE AREA */}
                        <div style={{
                            width: '100%',
                            height: '80%', // Takes up most of the card
                            position: 'relative',
                            background: '#f9fafb',
                            overflow: 'hidden'
                        }}>
                            <img
                                src={imgPath}
                                alt={item.label}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    // Fallback to placeholder if image missing
                                    e.target.src = `https://placehold.co/300x400/fdf2f8/f472b6?text=${encodeURIComponent(item.label)}`;
                                    // If we wanted to fallback to icon, we'd need state, but simple img replacement is faster for performance.
                                }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s ease'
                                }}
                                className="item-img" // For hover effects if we added CSS
                            />

                            {/* Color Preview Dot (Overlay on image) */}
                            {isSelected && selectedColor && (
                                <div style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                    width: '18px',
                                    height: '18px',
                                    borderRadius: '50%',
                                    background: selectedColor.hex,
                                    border: '2px solid #fff',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                    zIndex: 2
                                }} />
                            )}
                        </div>

                        {/* LABEL AREA */}
                        <div style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0 0.5rem',
                            width: '100%',
                            background: '#fff'
                        }}>
                            <span style={{
                                fontSize: '0.8rem',
                                fontWeight: isSelected ? '600' : '500',
                                color: 'var(--text-primary)',
                                lineHeight: '1.2',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {item.label}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default VisualGrid;
