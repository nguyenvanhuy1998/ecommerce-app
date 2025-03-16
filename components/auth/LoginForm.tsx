import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import FormButton from '../ui/FormButton';
import FormInput from '../ui/FormInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, LoginFormData } from '../../validation/authSchemas';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  style?: ViewStyle;
  onStepChange?: (step: number) => void;
}

export default function LoginForm({
  onLogin,
  isLoading,
  style,
  onStepChange,
}: LoginFormProps) {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: Password
  const [formError, setFormError] = useState('');
  const [emailValue, setEmailValue] = useState(''); // Store email value separately

  // Khởi tạo React Hook Form
  const formMethods = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const { control, handleSubmit, getValues, setValue, formState: { errors, isValid, isDirty, dirtyFields }, trigger, watch } = formMethods;
  
  // Watch email field to validate it in real-time
  const email = watch('email');
  
  // Validate email field when it changes
  useEffect(() => {
    if (email && step === 1) {
      trigger('email');
    }
  }, [email, trigger, step]);

  // Notify parent component when step changes
  useEffect(() => {
    if (onStepChange) {
      onStepChange(step);
    }
  }, [step, onStepChange]);

  const handleContinue = async () => {
    // Reset error state
    setFormError('');

    // Trigger validation for email field
    const isEmailValid = await trigger('email');
    
    if (!isEmailValid) {
      return; // Don't proceed if email is invalid
    }

    // Store the email value before switching steps
    const currentEmail = getValues('email');
    setEmailValue(currentEmail);
    
    // Chuyển sang bước nhập mật khẩu
    setStep(2);
  };

  const handleLogin = async (data: LoginFormData) => {
    // Reset error state
    setFormError('');

    try {
      // Use the stored email value with the password from the form
      await onLogin(emailValue, data.password);
    } catch (err) {
      setFormError('An error occurred during login. Please try again.');
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
      marginBottom: 16,
      marginTop: 8,
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
    buttonContainer: {
      marginTop: 8,
    },
    emailDisplay: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: 16,
      textAlign: 'center',
    }
  });

  return (
    <View style={[dynamicStyles.container, style]}>
      {formError ? <Text style={dynamicStyles.errorText}>{formError}</Text> : null}

      {step === 1 ? (
        // Step 1: Email input
        <>
          <FormInput
            name="email"
            control={control}
            placeholder="Email Address"
            autoCapitalize="none"
            keyboardType="email-address"
            autoFocus
            error={errors.email}
          />

          <View style={dynamicStyles.buttonContainer}>
            <FormButton
              title="Continue"
              onPress={handleContinue}
              formMethods={formMethods}
              loading={isLoading}
              disabled={isLoading || !!errors.email || !dirtyFields.email}
              size="large"
              fullWidth
              disableIfInvalid={false}
            />
          </View>
        </>
      ) : (
        // Step 2: Password input
        <>
          {/* Display the email that was entered */}
          <Text style={dynamicStyles.emailDisplay}>
            Signing in as: {emailValue}
          </Text>
          
          <FormInput
            name="password"
            control={control}
            placeholder="Password"
            secureTextEntry={!showPassword}
            rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
            onRightIconPress={() => setShowPassword(!showPassword)}
            autoFocus
            error={errors.password}
          />

          <View style={dynamicStyles.buttonContainer}>
            <FormButton
              title="Continue"
              onPress={handleSubmit(handleLogin)}
              formMethods={formMethods}
              loading={isLoading}
              size="large"
              fullWidth
              disableIfInvalid={true}
            />
          </View>

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