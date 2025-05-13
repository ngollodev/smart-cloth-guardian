
// Enhanced authentication service ready for backend integration

// Types for authentication
export interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt?: string;
  phone?: string;
  address?: string;
}

export interface AuthResponse {
  success: boolean;
  user: User | null;
  token?: string;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  avatar?: string;
  phone?: string;
  address?: string;
}

class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user';
  
  // Get current token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  
  // Set authentication token
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  
  // Remove authentication token
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  
  // Get current user
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson);
    } catch (e) {
      console.error("Failed to parse user data", e);
      return null;
    }
  }
  
  // Set current user
  setCurrentUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
  
  // Remove current user
  removeCurrentUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }
  
  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }
  
  // Update user profile
  updateUserProfile(userData: Partial<User>): User {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      throw new Error("No user logged in");
    }
    
    const updatedUser = {
      ...currentUser,
      ...userData
    };
    
    this.setCurrentUser(updatedUser);
    return updatedUser;
  }
  
  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // In the future, this will make a real API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // For simulation purposes, accept any email with a password
        if (credentials.email && credentials.password) {
          const mockUser: User = {
            id: 'user-1',
            name: credentials.email.split('@')[0],
            email: credentials.email,
            createdAt: new Date().toISOString(),
          };
          
          const mockToken = `mock-jwt-token-${Date.now()}`;
          
          this.setCurrentUser(mockUser);
          this.setToken(mockToken);
          
          resolve({
            success: true,
            user: mockUser,
            token: mockToken
          });
        } else {
          resolve({
            success: false,
            user: null,
            message: 'Invalid credentials'
          });
        }
      }, 800); // Simulate network delay
    });
  }
  
  // Register user
  async register(data: RegisterData): Promise<AuthResponse> {
    // In the future, this will make a real API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.password !== data.passwordConfirmation) {
          resolve({
            success: false,
            user: null,
            message: 'Passwords do not match'
          });
          return;
        }
        
        const mockUser: User = {
          id: `user-${Date.now()}`,
          name: data.name,
          email: data.email,
          avatar: data.avatar,
          phone: data.phone,
          address: data.address,
          createdAt: new Date().toISOString(),
        };
        
        const mockToken = `mock-jwt-token-${Date.now()}`;
        
        this.setCurrentUser(mockUser);
        this.setToken(mockToken);
        
        resolve({
          success: true,
          user: mockUser,
          token: mockToken
        });
      }, 1000); // Simulate network delay
    });
  }
  
  // Logout user
  async logout(): Promise<boolean> {
    // In the future, this will make a real API call
    return new Promise((resolve) => {
      setTimeout(() => {
        this.removeCurrentUser();
        this.removeToken();
        resolve(true);
      }, 500);
    });
  }
}

export const authService = new AuthService();
