import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true';

  // Optional: additional authentication check or token validation logic
  useEffect(() => {
    // This could validate a JWT token, check token expiration, etc.
    // For demo purposes, we're just using a simple localStorage flag
  }, []);

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;