
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface AuthRole {
  name: string;
  permissions: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: AuthRole;
  avatar?: string;
  lastLogin?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    fullName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  checkPermission: (permission: string) => boolean;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for frontend development
const MOCK_USER: User = {
  id: 'user-001',
  email: 'admin@example.com',
  name: 'Admin User',
  role: {
    name: 'admin',
    permissions: ['read:all', 'write:all', 'delete:all', 'manage:users', 'manage:devices']
  },
  avatar: 'https://i.pravatar.cc/150?u=admin',
  lastLogin: '2023-04-10T15:34:12Z'
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This would be replaced with an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      if (email === 'admin@example.com' && password === 'password') {
        const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substring(2);
        
        // Store auth data
        localStorage.setItem('auth_token', mockToken);
        localStorage.setItem('auth_user', JSON.stringify(MOCK_USER));
        
        setToken(mockToken);
        setUser(MOCK_USER);
        
        toast({
          title: 'Login successful',
          description: `Welcome back, ${MOCK_USER.name}!`,
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Login failed';
      setError(errorMessage);
      
      toast({
        title: 'Login failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This would be replaced with an actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful registration
      const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substring(2);
      const newUser: User = {
        id: 'user-' + Math.random().toString(36).substring(2),
        email: userData.email,
        name: userData.fullName,
        role: {
          name: 'user',
          permissions: ['read:own', 'write:own']
        },
        avatar: `https://i.pravatar.cc/150?u=${userData.email}`,
        lastLogin: new Date().toISOString()
      };
      
      // Store auth data
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('auth_user', JSON.stringify(newUser));
      
      setToken(mockToken);
      setUser(newUser);
      
      toast({
        title: 'Registration successful',
        description: `Welcome, ${newUser.name}!`,
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Registration failed';
      setError(errorMessage);
      
      toast({
        title: 'Registration failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setToken(null);
    setUser(null);
    
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };

  const checkPermission = (permission: string) => {
    if (!user) return false;
    return user.role.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
        checkPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
