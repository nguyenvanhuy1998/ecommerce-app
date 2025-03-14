import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  style?: ViewStyle;
}

export default function LoginForm({
  onLogin,
  isLoading,
  style,
}: LoginFormProps) {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
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

    try {
      await onLogin(email, password);
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error('Login error:', err);
    }
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      width: '100%',
    },
    forgotPasswordContainer: {
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
    errorText: {
      color: 'red',
      marginBottom: 16,
      textAlign: 'center',
    },
  });

  return (
    <View style={[dynamicStyles.container, style]}>
      {error ? <Text style={dynamicStyles.errorText}>{error}</Text> : null}

      {step === 1 ? (
        // Step 1: Email input
        <>
          <Input
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoFocus
          />

          <Button
            title="Continue"
            onPress={handleContinue}
            loading={isLoading}
            disabled={isLoading}
            size="large"
            fullWidth
          />
        </>
      ) : (
        // Step 2: Password input
        <>
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
            onRightIconPress={() => setShowPassword(!showPassword)}
            autoFocus
          />

          <Button
            title="Continue"
            onPress={handleLogin}
            loading={isLoading}
            disabled={isLoading}
            size="large"
            fullWidth
          />

          <View style={dynamicStyles.forgotPasswordContainer}>
            <Text style={dynamicStyles.normalText}>Forgot Password? </Text>
            <Link href={"/(auth)/reset-password" as any} asChild>
              <TouchableOpacity>
                <Text style={dynamicStyles.linkText}>Reset</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </>
      )}
    </View>
  );
} 