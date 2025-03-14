import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import FormButton from '../ui/FormButton';
import FormInput from '../ui/FormInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema, RegisterFormData } from '../../validation/authSchemas';

interface RegisterFormProps {
  onRegister: (name: string, email: string, password: string) => Promise<void>;
  isLoading: boolean;
  style?: ViewStyle;
}

export default function RegisterForm({
  onRegister,
  isLoading,
  style,
}: RegisterFormProps) {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState('');

  // Khởi tạo React Hook Form
  const formMethods = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  const { control, handleSubmit } = formMethods;

  const handleRegister = async (data: RegisterFormData) => {
    // Reset error state
    setFormError('');

    try {
      // Gọi hàm đăng ký từ props
      await onRegister(data.name, data.email, data.password);
    } catch (err) {
      setFormError('Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.');
      console.error('Register error:', err);
    }
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      width: '100%',
    },
    errorText: {
      color: 'red',
      marginBottom: 16,
      textAlign: 'center',
    },
    buttonContainer: {
      marginTop: 16,
    }
  });

  return (
    <View style={[dynamicStyles.container, style]}>
      {formError ? <Text style={dynamicStyles.errorText}>{formError}</Text> : null}

      <FormInput
        name="name"
        control={control}
        placeholder="Full Name"
        autoCapitalize="words"
        autoFocus
      />

      <FormInput
        name="email"
        control={control}
        placeholder="Email Address"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <FormInput
        name="password"
        control={control}
        placeholder="Password"
        secureTextEntry={!showPassword}
        rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
        onRightIconPress={() => setShowPassword(!showPassword)}
      />

      <FormInput
        name="confirmPassword"
        control={control}
        placeholder="Confirm Password"
        secureTextEntry={!showConfirmPassword}
        rightIcon={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
        onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
      />

      <View style={dynamicStyles.buttonContainer}>
        <FormButton
          title="Create Account"
          onPress={handleSubmit(handleRegister)}
          formMethods={formMethods}
          loading={isLoading}
          size="large"
          fullWidth
        />
      </View>
    </View>
  );
} 