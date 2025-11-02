import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ROLES, ROLE_PERMISSIONS, Role } from '../constants/roles';

export interface User {
  userId: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresAt: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasRole: (role: Role) => boolean;
  hasPermission: (permission: keyof typeof ROLE_PERMISSIONS[Role]) => boolean;
  isAdmin: boolean;
  isFaculty: boolean;
  isLabTech: boolean;
  isStudent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const API_BASE_URL = 'http://localhost:5285/api';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  useEffect(() => {
    // Check for stored auth data on app load
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return false;
      }

      const data: AuthResponse = await response.json();
      // persist to state and localStorage so consumers update immediately
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return true;
    } catch {
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, role: string): Promise<boolean> => {
    // This function is now handled directly in the components
    // Keeping for backward compatibility
    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Role-based utility functions
  const hasRole = (role: Role): boolean => {
    return user?.role === role;
  };

  const hasPermission = (permission: keyof typeof ROLE_PERMISSIONS[Role]): boolean => {
    if (!user) return false;
    const userRole = user.role as Role;
    return ROLE_PERMISSIONS[userRole]?.[permission] || false;
  };

  const isAdmin = hasRole(ROLES.ADMIN);
  const isFaculty = hasRole(ROLES.FACULTY);
  const isLabTech = hasRole(ROLES.LAB_TECH);
  const isStudent = hasRole(ROLES.STUDENT);

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated,
    hasRole,
    hasPermission,
    isAdmin,
    isFaculty,
    isLabTech,
    isStudent,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
