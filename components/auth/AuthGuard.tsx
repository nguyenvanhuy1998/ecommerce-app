import React, { ReactNode } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Redirect, Href } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

interface AuthGuardProps {
  children: ReactNode;
  requireAuth: boolean;
  redirectTo: Href;
}

/**
 * AuthGuard component to protect routes based on authentication state
 * @param children - The components to render if authentication check passes
 * @param requireAuth - If true, user must be authenticated; if false, user must NOT be authenticated
 * @param redirectTo - Where to redirect if authentication check fails
 */
export default function AuthGuard({ children, requireAuth, redirectTo }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // If requireAuth is true, user must be authenticated
  // If requireAuth is false, user must NOT be authenticated
  const authCheckPassed = requireAuth ? isAuthenticated : !isAuthenticated;

  if (!authCheckPassed) {
    return <Redirect href={redirectTo} />;
  }

  return <>{children}</>;
} 