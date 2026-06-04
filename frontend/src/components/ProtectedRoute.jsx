import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Spin } from 'antd';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading, isAuthenticated, isAdmin } = useUser();

  // Log on mount and when dependencies change
  useEffect(() => {
    console.log('[ProtectedRoute] Checking access:', {
      loading,
      authenticated: isAuthenticated(),
      isAdminUser: isAdmin(),
      adminOnly,
      user: user ? `${user.email} (isAdmin: ${user.isAdmin})` : 'null'
    });
  }, [loading, user, adminOnly, isAuthenticated, isAdmin]);

  // Show loading spinner while checking authentication
  if (loading) {
    console.log('[ProtectedRoute] Still loading, showing spinner');
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  // Check if user is authenticated
  const authenticated = isAuthenticated();
  if (!authenticated) {
    console.log('[ProtectedRoute] User not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Check if admin access is required
  if (adminOnly && !isAdmin()) {
    console.log('[ProtectedRoute] Admin access required but user is not admin, redirecting to home');
    return <Navigate to="/" replace />;
  }

  // User is authenticated and authorized
  console.log('[ProtectedRoute] Access granted');
  return children;
};

export default ProtectedRoute;