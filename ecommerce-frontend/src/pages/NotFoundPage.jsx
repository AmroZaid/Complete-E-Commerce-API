import React from 'react';
import { EmptyState } from '../components/common/EmptyState';

const NotFoundPage = () => {
  return (
    <div className="container" style={{ padding: '4rem 1rem' }}>
      <EmptyState
        title="404 - Page Not Found"
        message="The page you are looking for might have been removed or is temporarily unavailable."
        actionText="Back to Homepage"
        actionLink="/"
      />
    </div>
  );
};

export default NotFoundPage;