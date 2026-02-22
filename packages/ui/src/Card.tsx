import React from 'react';

interface CardProps {
    children: React.ReactNode;
    title?: string;
    onClose?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, title, onClose }) => (
    <div
        style={{
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            padding: '16px',
            background: '#fff',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            position: 'relative',
            minWidth: '200px',
        }}
    >
        {onClose && (
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                }}
            >
                x
            </button>
        )}
        {title && (
            <h4
                style={{
                    margin: '0 0 12px 0',
                    color: '#333',
                }}
            >
                {title}
            </h4>
        )}
        {children}
    </div>
);
