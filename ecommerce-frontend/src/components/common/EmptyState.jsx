import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

export const EmptyState = ({
  title = "No results found",
  message = "Try adjusting your search or filter settings.",
  actionText = "Continue Shopping",
  actionLink = "/products"
}) => {
  const navigate = useNavigate();

  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem 1rem',
      backgroundColor: 'var(--surface-color)',
      borderRadius: 'var(--border-radius)',
      border: '1px solid var(--border-color)',
      margin: '2rem 0'
    }}>
      <PackageOpen size={56} style={{ color: 'var(--muted-text-color)', marginBottom: '1rem' }} />
      <h3 style={{ color: 'var(--text-color)', marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ color: 'var(--muted-text-color)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>{message}</p>
      {actionText && (
        <Button onClick={() => navigate(actionLink)}>
          {actionText}
        </Button>
      )}
    </div>
  );
};