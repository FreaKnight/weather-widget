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
            minWidth: '200px'
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
                    fontSize: '1.2rem'
                }}
            >
                x
            </button>
        )}
        {title && (
            <h4
                style={{
                    margin: '0 0 12px 0',
                    color: '#333'
                }}
            >
                {title}
            </h4>
        )}
        {children}
    </div>
);

export const CardSkeleton: React.FC<{}> = () => (
    <div
        style={{
            height: '150px',
            minWidth: '200px',
            borderRadius: '12px',
            background:
                'linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%)',
            backgroundSize: '200% 100%',
            animation: 'loading-shimmer 1.5s infinite'
        }}
    ></div>
);
