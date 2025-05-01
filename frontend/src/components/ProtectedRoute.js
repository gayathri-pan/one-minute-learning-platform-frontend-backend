import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn, isAdmin } from '../auth';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/not-found" replace />;
  }

  return children;
};

export default ProtectedRoute;
