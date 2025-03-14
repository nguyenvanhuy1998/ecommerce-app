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
import FormButton from '../ui/FormButton';
import FormInput from '../ui/FormInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, LoginFormData } from '../../validation/authSchemas';

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
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: Password
  const [formError, setFormError] = useState('');

  // Khởi tạo React Hook Form
  const formMethods = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const { control, handleSubmit, getValues, formState: { errors } } = formMethods;

  const handleContinue = () => {
    // Reset error state
    setFormError('');

    // Kiểm tra email
    const emailValue = getValues('email');
    if (!emailValue) {
      return; // Validation sẽ được xử lý bởi yup
    }

    // Chuyển sang bước nhập mật khẩu
    setStep(2);
  };

  const handleLogin = async (data: LoginFormData) => {
    // Reset error state
    setFormError('');

    try {
      // Gọi hàm đăng nhập từ context
      await onLogin(data.email, data.password);
    } catch (err) {
      setFormError('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.');
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
          />

          <View style={dynamicStyles.buttonContainer}>
            <FormButton
              title="Continue"
              onPress={handleContinue}
              formMethods={formMethods}
              loading={isLoading}
              disabled={isLoading || !!errors.email}
              size="large"
              fullWidth
              disableIfInvalid={false}
            />
          </View>
        </>
      ) : (
        // Step 2: Password input
        <>
          <FormInput
            name="password"
            control={control}
            placeholder="Password"
            secureTextEntry={!showPassword}
            rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
            onRightIconPress={() => setShowPassword(!showPassword)}
            autoFocus
          />

          <View style={dynamicStyles.buttonContainer}>
            <FormButton
              title="Continue"
              onPress={handleSubmit(handleLogin)}
              formMethods={formMethods}
              loading={isLoading}
              size="large"
              fullWidth
              disableIfInvalid={false}
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