import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetch('/api/admin/verify', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        }
      })
      .catch(() => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      });
  }, [navigate]);
  
  if(!isAuthenticated){
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
