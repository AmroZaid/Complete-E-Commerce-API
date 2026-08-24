import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--error-color)', marginBottom: '1rem' }}>403 - Forbidden</h2>
        <p style={{ color: 'var(--muted-text-color)' }}>You do not have permission to view this administrative resource.</p>
      </div>
    );
  }

  return children;
};