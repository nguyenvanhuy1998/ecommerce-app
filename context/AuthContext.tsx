import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, useSegments } from 'expo-router';
import * as AuthService from '../services/auth';
import { User, AuthState } from '../services/auth';

// Default auth state
const defaultAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

// Auth context type
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  loginWithSocial: (provider: 'apple' | 'google' | 'facebook') => Promise<void>;
  logout: () => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  ...defaultAuthState,
  login: async () => {},
  loginWithSocial: async () => {},
  logout: async () => {},
});

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>(defaultAuthState);
  const router = useRouter();
  const segments = useSegments();

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = await AuthService.isAuthenticated();
        
        if (isAuth) {
          const user = await AuthService.getCurrentUser();
          const token = await AuthService.getAuthToken();
          
          setState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setState({
            ...defaultAuthState,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setState({
          ...defaultAuthState,
          isLoading: false,
        });
      }
    };

    checkAuth();
  }, []);

  // Handle routing based on auth state
  useEffect(() => {
    if (state.isLoading) {
      // Still loading, don't redirect yet
      return;
    }

    const inAuthGroup = segments[0] === '(auth)';

    if (state.isAuthenticated && inAuthGroup) {
      // Redirect authenticated users from auth screens to main app
      router.replace('/(tabs)/home');
    } else if (!state.isAuthenticated && !inAuthGroup) {
      // Redirect unauthenticated users to login
      router.replace('/(auth)/login');
    }
  }, [state.isAuthenticated, state.isLoading, segments, router]);

  // Login function
  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const { user, token } = await AuthService.loginWithEmailPassword(email, password);
      
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  // Login with social provider
  const loginWithSocial = async (provider: 'apple' | 'google' | 'facebook') => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const { user, token } = await AuthService.loginWithSocialProvider(provider);
      
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await AuthService.logout();
      
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error during logout:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Context value
  const contextValue: AuthContextType = {
    ...state,
    login,
    loginWithSocial,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}; 