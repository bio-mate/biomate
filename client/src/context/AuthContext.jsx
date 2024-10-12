// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Optionally, decode token to get user data
      // const decodedToken = jwtDecode(token); // You may need to install jwt-decode
      // setUser(decodedToken);
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token); // Store token
    setIsAuthenticated(true);             // Set authenticated state
    setUser(userData);                    // Store user data (e.g., user ID)
  };

  const logout = () => {
    localStorage.removeItem('token');      // Remove token
    setIsAuthenticated(false);              // Reset authenticated state
    setUser(null);                          // Clear user data
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
