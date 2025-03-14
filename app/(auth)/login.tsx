import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '../../context/ThemeContext';

export default function LoginScreen() {
  const router = useRouter();
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: Password

  const handleContinue = () => {
    // Reset error state
    setError('');

    // Validate email
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    // Move to password step
    setStep(2);
  };

  const handleLogin = async () => {
    // Reset error state
    setError('');

    // Validate password
    if (!password) {
      setError('Please enter your password');
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
      position: 'relative',
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
    errorText: {
      color: 'red',
      marginBottom: 16,
      textAlign: 'center',
    },
    forgotPasswordContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 32,
    },
  });

  return (
    <KeyboardAwareScrollView
      style={dynamicStyles.container}
      contentContainerStyle={{ 
        flexGrow: 1, 
        padding: 24,
        paddingTop: 60,
      }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={Platform.OS === 'ios' ? 30 : 80}
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

      {error ? <Text style={dynamicStyles.errorText}>{error}</Text> : null}

      {step === 1 ? (
        // Step 1: Email input
        <>
          <View style={dynamicStyles.inputContainer}>
            <TextInput
              style={dynamicStyles.input}
              placeholder="Email Address"
              placeholderTextColor={theme.colors.textTertiary}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoFocus
            />
          </View>

          <TouchableOpacity
            style={dynamicStyles.continueButton}
            onPress={handleContinue}
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
            <Link href="/(auth)/register" asChild>
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
        </>
      ) : (
        // Step 2: Password input
        <>
          <View style={dynamicStyles.inputContainer}>
            <TextInput
              style={dynamicStyles.input}
              placeholder="Password"
              placeholderTextColor={theme.colors.textTertiary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoFocus
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 16,
                top: 13,
              }}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={24}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
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

          <View style={dynamicStyles.forgotPasswordContainer}>
            <Text style={dynamicStyles.normalText}>Forgot Password? </Text>
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity>
                <Text style={dynamicStyles.linkText}>Reset</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </>
      )}
    </KeyboardAwareScrollView>
  );
} 