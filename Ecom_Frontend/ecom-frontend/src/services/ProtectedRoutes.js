// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUser } from './UserContext';

const ProtectedRoute = ({ role, ...props }) => {
  const { user } = useUser();

  if (!user || (role && user.role !== role)) {
    return <Navigate to="/login" />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
