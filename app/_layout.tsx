import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import { useCallback, useMemo } from 'react';
import { View, Text } from 'react-native';
import { ErrorBoundary } from 'react-error-boundary';

/**
 * Error fallback component to display when an error occurs
 */
function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Something went wrong</Text>
      <Text style={{ marginBottom: 20 }}>{error.message}</Text>
      <Text 
        style={{ 
          padding: 10, 
          backgroundColor: '#8E6CEF', 
          color: 'white', 
          borderRadius: 5 
        }}
        onPress={resetErrorBoundary}
      >
        Try again
      </Text>
    </View>
  );
}

/**
 * Root layout component that wraps the entire application
 */
export default function RootLayout() {
  const handleError = useCallback((error: Error) => {
    // Log error to your preferred error tracking service
    console.error('Application error:', error);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      <ThemeProvider>
        <AuthProvider>
          <RootLayoutContent />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

/**
 * Content component for the root layout
 * This is separated to access the theme context
 */
function RootLayoutContent() {
  const { theme, isDarkMode } = useTheme();
  
  // Memoize screen options to prevent unnecessary re-renders
  const screenOptions = useMemo(() => ({
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerTintColor: theme.colors.text,
    contentStyle: {
      backgroundColor: theme.colors.background,
    },
  }), [theme.colors.background, theme.colors.text]);

  // Define screen configurations
  const screens = useMemo(() => [
    { name: '(auth)', options: { headerShown: false } },
    { name: '(tabs)', options: { headerShown: false } },
    { name: 'product/[id]', options: { title: 'Product Details' } },
    { name: 'checkout', options: { title: 'Checkout' } },
    { name: 'orders', options: { title: 'My Orders' } },
  ], []);

  return (
    <SafeAreaProvider>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Stack screenOptions={screenOptions}>
        {screens.map((screen) => (
          <Stack.Screen 
            key={screen.name}
            name={screen.name} 
            options={screen.options} 
          />
        ))}
      </Stack>
    </SafeAreaProvider>
  );
}
