import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  style = {}
}) => {
  const getBackground = () => {
    if (disabled) return '#cbd5e1';
    if (variant === 'secondary') return 'var(--secondary-color)';
    if (variant === 'danger') return 'var(--error-color)';
    if (variant === 'outline') return 'transparent';
    return 'var(--primary-color)';
  };

  const getColor = () => {
    if (disabled) return '#64748b';
    if (variant === 'secondary') return '#000';
    if (variant === 'outline') return 'var(--primary-color)';
    return '#fff';
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      style={{
        backgroundColor: getBackground(),
        color: getColor(),
        border: variant === 'outline' ? '2px solid var(--primary-color)' : 'none',
        padding: '0.6rem 1.2rem',
        borderRadius: 'var(--border-radius)',
        fontWeight: 600,
        fontSize: '0.9rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        transition: 'var(--transition)',
        opacity: disabled ? 0.7 : 1,
        ...style
      }}
    >
      {loading ? 'Processing...' : children}
    </button>
  );
};