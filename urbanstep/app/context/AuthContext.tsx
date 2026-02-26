'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get('token');
    const storedUser = Cookies.get('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      const { token } = response.data;
      Cookies.set('token', token, { expires: 7 });
      Cookies.set('user', username, { expires: 7 });
      setToken(token);
      setUser(username);
    } catch (error) {
      throw new Error('Falha no login');
    }
  };

  const register = async (username: string, password: string) => {
    try {
      await axios.post('http://localhost:5000/api/register', {
        username,
        password,
      });
      // Após cadastro, já faz login automaticamente
      await login(username, password);
    } catch (error) {
      throw new Error('Falha no cadastro');
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    setToken(null);
    setUser(null);
  };

  const deleteAccount = async () => {
    try {
      await axios.delete('http://localhost:5000/api/delete', {
        headers: { Authorization: `Bearer ${token}` },
      });
      logout();
    } catch (error) {
      throw new Error('Falha ao deletar conta');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
};