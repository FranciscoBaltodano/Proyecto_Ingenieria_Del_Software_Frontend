
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRoles = JSON.parse(localStorage.getItem('userRoles') || '[]');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const hasAllowedRole = allowedRoles.some(role => userRoles.includes(role));

  if (!hasAllowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};