
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  const hasAllowedRole = allowedRoles.some(role => user.roles.includes(role));

  if (!hasAllowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};