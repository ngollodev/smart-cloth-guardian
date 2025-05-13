import React from 'react';
import { AuthResponse, authService, LoginCredentials, RegisterData, User } from 'app/services/auth-service';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (data: RegisterData) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => User;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Public routes that don't need authentication
  const publicRoutes = ['/login', '/register', '/welcome', '/forgot-password'];
  
  useEffect(() => {
    // Load user from storage on component mount
    const loadUser = () => {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
      
      // Redirect logic based on auth state
      const pathname = location.pathname;
      
      // If user is authenticated but on a public route, redirect to dashboard
      if (currentUser && publicRoutes.includes(pathname)) {
        navigate('/');
        return;
      }
      
      // If user is not authenticated and not on a public route, redirect to login
      if (!currentUser && !publicRoutes.includes(pathname) && pathname !== '/index') {
        navigate('/login');
        return;
      }
    };
    
    loadUser();
  }, [navigate, location]);
  
  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const result = await authService.login(credentials);
    
    if (result.success && result.user) {
      setUser(result.user);
    }
    
    return result;
  };
  
  const register = async (data: RegisterData): Promise<AuthResponse> => {
    const result = await authService.register(data);
    
    if (result.success && result.user) {
      setUser(result.user);
    }
    
    return result;
  };
  
  const updateProfile = (data: Partial<User>): User => {
    const updatedUser = authService.updateUserProfile(data);
    setUser(updatedUser);
    return updatedUser;
  };
  
  const logout = async (): Promise<void> => {
    await authService.logout();
    setUser(null);
    navigate('/login');
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user
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
