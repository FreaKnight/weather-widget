import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    style,
    ...props
}) => {
    const backgroundColor = variant === 'danger' ? '#ff4d4f' : '#007bff';

    return (
        <button
            {...props}
            style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                color: '#fff',
                backgroundColor,
                cursor: 'pointer',
                fontWeight: 'bold',
                ...style
            }}
        >
            {children}
        </button>
    );
};
