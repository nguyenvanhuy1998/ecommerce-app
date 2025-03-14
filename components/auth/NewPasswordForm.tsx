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
import { newPasswordSchema, NewPasswordFormData } from '../../validation/authSchemas';

interface NewPasswordFormProps {
  onSetNewPassword: (password: string) => Promise<void>;
  isLoading: boolean;
  style?: ViewStyle;
}

export default function NewPasswordForm({
  onSetNewPassword,
  isLoading,
  style,
}: NewPasswordFormProps) {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState('');

  // Khởi tạo React Hook Form
  const formMethods = useForm<NewPasswordFormData>({
    resolver: yupResolver(newPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
    }
  });

  const { control, handleSubmit } = formMethods;

  const handleSetNewPassword = async (data: NewPasswordFormData) => {
    // Reset error state
    setFormError('');

    try {
      // Gọi hàm đặt mật khẩu mới từ props
      await onSetNewPassword(data.password);
    } catch (err) {
      setFormError('Đã xảy ra lỗi khi đặt mật khẩu mới. Vui lòng thử lại.');
      console.error('Set new password error:', err);
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
    description: {
      color: theme.colors.textSecondary,
      marginBottom: 24,
      textAlign: 'center',
      fontSize: 14,
      lineHeight: 20,
    },
    buttonContainer: {
      marginTop: 16,
    }
  });

  return (
    <View style={[dynamicStyles.container, style]}>
      <Text style={dynamicStyles.description}>
        Create a new password for your account. Password must be at least 6 characters.
      </Text>

      {formError ? <Text style={dynamicStyles.errorText}>{formError}</Text> : null}

      <FormInput
        name="password"
        control={control}
        placeholder="New Password"
        secureTextEntry={!showPassword}
        rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
        onRightIconPress={() => setShowPassword(!showPassword)}
        autoFocus
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
          title="Set New Password"
          onPress={handleSubmit(handleSetNewPassword)}
          formMethods={formMethods}
          loading={isLoading}
          size="large"
          fullWidth
        />
      </View>
    </View>
  );
} 