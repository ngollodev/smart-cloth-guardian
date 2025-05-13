
import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create context
const AuthContext = createContext(undefined);

// Mock authentication service
const mockAuthService = {
  login: async (credentials) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
      const user = {
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, Anytown, USA'
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(user));
      return { success: true, user, token: 'mock-token-12345' };
    }
    
    return { success: false, message: 'Invalid credentials' };
  },
  
  register: async (data) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = {
      id: '2',
      name: data.name,
      email: data.email,
      avatar: data.avatar,
      phone: data.phone || '',
      address: data.address || ''
    };
    
    await AsyncStorage.setItem('user', JSON.stringify(user));
    return { success: true, user, token: 'mock-token-67890' };
  },
  
  logout: async () => {
    await AsyncStorage.removeItem('user');
  },
  
  updateProfile: async (data) => {
    const userStr = await AsyncStorage.getItem('user');
    const currentUser = userStr ? JSON.parse(userStr) : null;
    
    if (!currentUser) {
      throw new Error('User not found');
    }
    
    const updatedUser = { ...currentUser, ...data };
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    
    return updatedUser;
  },
  
  getCurrentUser: async () => {
    const userStr = await AsyncStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load user from AsyncStorage on component mount
    const loadUser = async () => {
      try {
        const currentUser = await mockAuthService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);
  
  const login = async (credentials) => {
    const result = await mockAuthService.login(credentials);
    
    if (result.success && result.user) {
      setUser(result.user);
    }
    
    return result;
  };
  
  const register = async (data) => {
    const result = await mockAuthService.register(data);
    
    if (result.success && result.user) {
      setUser(result.user);
    }
    
    return result;
  };
  
  const updateProfile = async (data) => {
    const updatedUser = await mockAuthService.updateProfile(data);
    setUser(updatedUser);
    return updatedUser;
  };
  
  const logout = async () => {
    await mockAuthService.logout();
    setUser(null);
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
