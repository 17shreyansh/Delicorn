import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check auth on mount - cookie will be sent automatically
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiService.getProfile();
        if (response.data) {
          console.log('[UserContext] User logged in:', response.data.email);
          setUser(response.data);
          fetchWishlist();
        }
      } catch (error) {
        console.log('[UserContext] Not logged in');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = (userData) => {
    console.log('[UserContext] Setting user:', userData.email, 'isAdmin:', userData.isAdmin);
    setUser(userData);
    fetchWishlist();
  };

  const logout = async () => {
    console.log('[UserContext] Logging out');
    try {
      await apiService.logout();
    } catch (error) {
      console.log('[UserContext] Logout request failed:', error);
    } finally {
      setUser(null);
      setWishlist([]);
    }
  };

  const addToWishlist = async (product) => {
    try {
      if (user) {
        await apiService.addToWishlist(product._id || product.id);
      }
      setWishlist(prev => {
        const productId = product._id || product.id;
        if (prev.find(item => (item._id || item.id) === productId)) {
          return prev;
        }
        return [...prev, product];
      });
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      if (user) {
        await apiService.removeFromWishlist(productId);
      }
      setWishlist(prev => prev.filter(item => (item._id || item.id) !== productId));
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => (item._id || item.id) === productId);
  };

  const fetchWishlist = async () => {
    if (user) {
      try {
        const response = await apiService.getWishlist();
        setWishlist(response.data || []);
      } catch (error) {
        console.error('[UserContext] Failed to fetch wishlist:', error);
        // If 401, user will be logged out by interceptor
        if (error.status === 401) {
          setUser(null);
          setWishlist([]);
        }
      }
    }
  };

  const isAuthenticated = () => {
    const result = !!user;
    console.log('[UserContext] isAuthenticated():', result, 'user:', user ? user.email : 'null');
    return result;
  };

  const isAdmin = () => {
    const result = user?.isAdmin === true;
    console.log('[UserContext] isAdmin():', result, 'user.isAdmin:', user?.isAdmin);
    return result;
  };

  return (
    <UserContext.Provider value={{
      user,
      wishlist,
      loading,
      login,
      logout,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      fetchWishlist,
      isAuthenticated,
      isAdmin
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};