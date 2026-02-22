import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input: React.FC<InputProps> = ({ label, style, ...props }) => (
    <div style={{ marginBottom: '16px', width: '100%' }}>
        {label && (
            <label
                style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    color: '#444'
                }}
            >
                {label}
            </label>
        )}
        <input
            {...props}
            style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #d1d1d1',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxSizing: 'border-box',
                ...style
            }}
        />
    </div>
);
