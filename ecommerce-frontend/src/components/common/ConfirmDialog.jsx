import React from 'react';
import { Button } from './Button';

export const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: 'var(--border-radius)',
        maxWidth: '400px',
        width: '100%',
        boxShadow: 'var(--shadow-md)'
      }}>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>{title}</h3>
        <p style={{ color: 'var(--muted-text-color)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>{message}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};