import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/auth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount — restore session from localStorage
  useEffect(() => {
    const restore = async () => {
      try {
        const token = localStorage.getItem('vogn_token');
        if (!token) return;
        const { data } = await authService.getMe();
        setUser(data.user);
      } catch {
        localStorage.removeItem('vogn_token');
        localStorage.removeItem('vogn_user');
      } finally {
        setLoading(false);
      }
    };
    restore();
  }, []);

  const login = useCallback(({ token, user }) => {
    localStorage.setItem('vogn_token', token);
    localStorage.setItem('vogn_user', JSON.stringify(user));
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('vogn_token');
    localStorage.removeItem('vogn_user');
    setUser(null);
  }, []);

  const updateUser = useCallback((updated) => {
    setUser(updated);
    localStorage.setItem('vogn_user', JSON.stringify(updated));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
