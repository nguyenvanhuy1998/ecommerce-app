/**
 * Authentication service for handling user authentication
 */
import * as SecureStore from 'expo-secure-store';

// Storage keys
const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

// Define user type
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

// Define auth state
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * Login with email and password
 * @param email User email
 * @param password User password
 * @returns Promise with user data and token
 */
export const loginWithEmailPassword = async (
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  // In a real app, this would be an API call to your authentication endpoint
  // For demo purposes, we're simulating a successful login after a delay
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate successful login
  // In a real app, this would come from your API response
  const user: User = {
    id: '1',
    email,
    name: 'Demo User',
    avatar: 'https://ui-avatars.com/api/?name=Demo+User',
  };
  
  const token = 'demo-token-' + Math.random().toString(36).substring(2);
  
  // Store auth data in secure storage
  await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
  await SecureStore.setItemAsync(AUTH_USER_KEY, JSON.stringify(user));
  
  return { user, token };
};

/**
 * Login with social provider
 * @param provider Social provider (apple, google, facebook)
 * @returns Promise with user data and token
 */
export const loginWithSocialProvider = async (
  provider: 'apple' | 'google' | 'facebook'
): Promise<{ user: User; token: string }> => {
  // In a real app, this would trigger the OAuth flow for the selected provider
  // For demo purposes, we're simulating a successful login after a delay
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate successful login
  // In a real app, this would come from your API response
  const user: User = {
    id: '2',
    email: `demo-${provider}@example.com`,
    name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
    avatar: `https://ui-avatars.com/api/?name=${provider}+User`,
  };
  
  const token = `${provider}-token-` + Math.random().toString(36).substring(2);
  
  // Store auth data in secure storage
  await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
  await SecureStore.setItemAsync(AUTH_USER_KEY, JSON.stringify(user));
  
  return { user, token };
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
  // In a real app, you might need to call an API to invalidate the token
  
  // Clear auth data from secure storage
  await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  await SecureStore.deleteItemAsync(AUTH_USER_KEY);
};

/**
 * Get current authenticated user
 * @returns Current user or null if not authenticated
 */
export const getCurrentUser = async (): Promise<User | null> => {
  const userJson = await SecureStore.getItemAsync(AUTH_USER_KEY);
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson) as User;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 * @returns Boolean indicating if user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
  return !!token;
};

/**
 * Get current auth token
 * @returns Current auth token or null if not authenticated
 */
export const getAuthToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
}; 