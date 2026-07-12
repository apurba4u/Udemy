'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (fullName: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  googleLogin: (email: string, fullName: string, avatar?: string) => Promise<boolean>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await api.get('/auth/me');
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        localStorage.removeItem('token');
      }
    } catch {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post('/auth/login', { email, password });

      if (response.data.success) {
        const { token, user: userData } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        toast.success('Login successful!');
        return true;
      }
      return false;
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { message?: string } } };
      const message = apiError.response?.data?.message || 'Login failed';
      toast.error(message);
      return false;
    }
  };

  const register = async (fullName: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post('/auth/register', { fullName, email, password });

      if (response.data.success) {
        toast.success('Registration successful! Please login.');
        return true;
      }
      return false;
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { message?: string } } };
      const message = apiError.response?.data?.message || 'Registration failed';
      toast.error(message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignore logout errors
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      toast.success('Logged out successfully');
      router.push('/');
    }
  };

  const googleLogin = async (email: string, fullName: string, avatar?: string): Promise<boolean> => {
    try {
      const response = await api.post('/auth/google', { email, fullName, avatar });

      if (response.data.success) {
        const { token, user: userData } = response.data.data;
        localStorage.setItem('token', token);
        setUser(userData);
        toast.success('Google login successful!');
        return true;
      }
      return false;
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { message?: string } } };
      const message = apiError.response?.data?.message || 'Google login failed';
      toast.error(message);
      return false;
    }
  };

  const refreshUser = async () => {
    try {
      const response = await api.get('/auth/me');
      if (response.data.success) {
        setUser(response.data.data);
      }
    } catch {
      // Ignore refresh errors
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        googleLogin,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
