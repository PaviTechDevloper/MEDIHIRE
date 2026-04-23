import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('medihire_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (payload) => {
    localStorage.setItem('medihire_token', payload.token);
    localStorage.setItem('medihire_user', JSON.stringify(payload.user));
    setUser(payload.user);
  };

  const logout = () => {
    localStorage.removeItem('medihire_token');
    localStorage.removeItem('medihire_user');
    setUser(null);
  };

  useEffect(() => {
    const stored = localStorage.getItem('medihire_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
