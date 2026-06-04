/**
 * Enhanced Auth Context - DEPRECATED
 * Using UserContext instead for cookie-based authentication
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiClient from '../services/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('[Auth] Initializing authentication state...');
        
        // Try to restore from localStorage
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');

        if (savedUser && savedToken) {
          try {
            const parsedUser = JSON.parse(savedUser);
            console.log('[Auth] Restored user from localStorage:', parsedUser.email);
            setUser(parsedUser);
            setToken(savedToken);
            setIsAuthenticated(true);
            
            // Add token to axios header if available
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
          } catch (e) {
            console.error('[Auth] Failed to parse saved auth data:', e);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }
        } else {
          console.log('[Auth] No saved auth data found');
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('[Auth] Error initializing auth:', err);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login function
   */
  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('[Auth] Logging in user:', credentials.email);
      
      const response = await apiClient.post('/auth/login', credentials);
      
      if (response.data.success) {
        const userData = response.data.user;
        const newToken = response.data.token || localStorage.getItem('token');
        
        console.log('[Auth] Login successful for:', userData.email);
        
        // Save to state and localStorage
        setUser(userData);
        setToken(newToken);
        setIsAuthenticated(true);
        
        localStorage.setItem('user', JSON.stringify(userData));
        if (newToken) {
          localStorage.setItem('token', newToken);
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        }
        
        return { success: true, user: userData };
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('[Auth] Login error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMessage);
      setIsAuthenticated(false);
      
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Logout function
   */
  const logout = useCallback(async () => {
    try {
      console.log('[Auth] Logging out user');
      
      // Try to notify server
      try {
        await apiClient.post('/auth/logout');
      } catch (e) {
        console.log('[Auth] Server logout request failed, continuing with local logout');
      }
      
      // Clear state and storage
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      setError(null);
      
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      delete apiClient.defaults.headers.common['Authorization'];
      
      console.log('[Auth] Logged out successfully');
      return { success: true };
    } catch (err) {
      console.error('[Auth] Logout error:', err);
      return { success: false, error: err.message };
    }
  }, []);

  /**
   * Register function
   */
  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('[Auth] Registering new user:', userData.email);
      
      const response = await apiClient.post('/auth/register', userData);
      
      if (response.data.success) {
        console.log('[Auth] Registration successful');
        return { success: true, message: response.data.message };
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('[Auth] Registration error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
      setError(errorMessage);
      
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update user data
   */
  const updateUser = useCallback((updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    console.log('[Auth] Updated user data');
  }, [user]);

  /**
   * Check if user is admin
   */
  const isAdminUser = useCallback(() => {
    return user?.isAdmin === true;
  }, [user]);

  /**
   * Get authorization header for manual requests
   */
  const getAuthHeader = useCallback(() => {
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  }, [token]);

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    error,
    login,
    logout,
    register,
    updateUser,
    isAdminUser,
    getAuthHeader,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to use auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
