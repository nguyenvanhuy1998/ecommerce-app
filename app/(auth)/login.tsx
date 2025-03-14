import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

export default function LoginScreen() {
  const router = useRouter();
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    // Reset error state
    setError('');

    // Validate inputs
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Show loading indicator
    setIsLoading(true);

    try {
      // In a real app, you would call your authentication API here
      // const response = await authService.login(email, password);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to the main app
      router.replace('/(tabs)/home');
    } catch (err) {
      // Handle login error
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Create styles with theme
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 30,
    },
    inputContainer: {
      marginBottom: 16,
    },
    input: {
      height: 50,
      backgroundColor: theme.colors.input,
      borderRadius: 8,
      paddingHorizontal: 16,
      fontSize: 16,
      color: theme.colors.text,
      width: '100%',
    },
    continueButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 25,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 24,
      marginBottom: 32,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    createAccountContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 32,
    },
    normalText: {
      color: theme.colors.textSecondary,
      fontSize: 14,
    },
    linkText: {
      color: theme.colors.primary,
      fontSize: 14,
      fontWeight: '600',
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 32,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.divider,
    },
    socialButtonsContainer: {
      gap: 16,
    },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 25,
      height: 56,
      backgroundColor: theme.colors.card,
    },
    socialButtonIcon: {
      width: 24,
      height: 24,
      marginRight: 8,
    },
    socialButtonText: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: '500',
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 32,
    },
    themeToggle: {
      padding: 8,
    },
  });

  return (
    <KeyboardAvoidingView
      style={dynamicStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView 
        contentContainerStyle={{ 
          flexGrow: 1, 
          padding: 24,
          paddingTop: 60,
        }}
      >
        <View style={dynamicStyles.headerContainer}>
          <Text style={dynamicStyles.title}>Sign in</Text>
          <TouchableOpacity 
            style={dynamicStyles.themeToggle}
            onPress={toggleTheme}
            accessibilityLabel="Toggle dark mode"
          >
            <Ionicons 
              name={isDarkMode ? "sunny-outline" : "moon-outline"} 
              size={24} 
              color={theme.colors.text} 
            />
          </TouchableOpacity>
        </View>

        <View style={dynamicStyles.inputContainer}>
          <TextInput
            style={dynamicStyles.input}
            placeholder="Email Address"
            placeholderTextColor={theme.colors.textTertiary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <TouchableOpacity
          style={dynamicStyles.continueButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={dynamicStyles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>

        <View style={dynamicStyles.createAccountContainer}>
          <Text style={dynamicStyles.normalText}>Don't have an Account? </Text>
          <Link href="register" asChild>
            <TouchableOpacity>
              <Text style={dynamicStyles.linkText}>Create One</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={dynamicStyles.dividerContainer}>
          <View style={dynamicStyles.divider} />
        </View>

        <View style={dynamicStyles.socialButtonsContainer}>
          <TouchableOpacity style={dynamicStyles.socialButton}>
            <Ionicons name="logo-apple" size={24} color={theme.colors.text} style={{ marginRight: 8 }} />
            <Text style={dynamicStyles.socialButtonText}>Continue With Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity style={dynamicStyles.socialButton}>
            <Ionicons name="logo-google" size={24} color={theme.colors.text} style={{ marginRight: 8 }} />
            <Text style={dynamicStyles.socialButtonText}>Continue With Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={dynamicStyles.socialButton}>
            <Ionicons name="logo-facebook" size={24} color="#1877F2" style={{ marginRight: 8 }} />
            <Text style={dynamicStyles.socialButtonText}>Continue With Facebook</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
} 