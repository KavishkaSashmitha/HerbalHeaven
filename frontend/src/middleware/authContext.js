// AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
    // In a real scenario, perform actual login logic and set isLoggedIn to true
    setLoggedIn(true);
  };

  const logout = () => {
    setToken(null);
    // In a real scenario, perform actual logout logic and set isLoggedIn to false
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
