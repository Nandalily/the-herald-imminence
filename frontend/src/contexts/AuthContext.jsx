import React, { createContext, useState, useContext, useEffect } from 'react';
import { z } from 'zod';

const AuthContext = createContext(null);

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password too short'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name too short'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock user data storage
  const MOCK_USERS = [
    { id: 1, name: 'Demo User', email: 'demo@example.com', password: 'demo123' },
  ];

  useEffect(() => {
    // Check for stored user
    const storedUser = localStorage.getItem('news_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user:', e);
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setError(null);
    setLoading(true);
    
    try {
      // Validate input
      loginSchema.parse(credentials);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication
      const foundUser = MOCK_USERS.find(
        u => u.email === credentials.email && u.password === credentials.password
      );
      
      if (foundUser) {
        const userData = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          token: 'mock-jwt-token-' + Date.now(),
        };
        
        setUser(userData);
        localStorage.setItem('news_user', JSON.stringify(userData));
        localStorage.setItem('auth_token', userData.token);
        return userData;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setError(null);
    setLoading(true);
    
    try {
      // Validate input
      registerSchema.parse(userData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        token: 'mock-jwt-token-' + Date.now(),
      };
      
      setUser(newUser);
      localStorage.setItem('news_user', JSON.stringify(newUser));
      localStorage.setItem('auth_token', newUser.token);
      return newUser;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('news_user');
    localStorage.removeItem('auth_token');
    setError(null);
  };

  const updateProfile = async (updates) => {
    if (!user) throw new Error('Not authenticated');
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('news_user', JSON.stringify(updatedUser));
      return updatedUser;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile,
      loading,
      error,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
