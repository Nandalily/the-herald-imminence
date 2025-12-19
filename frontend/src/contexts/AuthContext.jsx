import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

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

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('authToken');
    if (token) {
      // Verify token and fetch user data
      // This would call your API in a real app
      setUser({ id: 1, name: 'Demo User', email: 'demo@example.com' });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    // API call would go here
    const mockUser = { id: 1, name: 'Demo User', email: credentials.email };
    setUser(mockUser);
    localStorage.setItem('authToken', 'mock-token-123');
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
