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
import { resetPasswordSchema, ResetPasswordFormData } from '../../validation/authSchemas';

interface ResetPasswordFormProps {
  onResetPassword: (email: string) => Promise<void>;
  isLoading: boolean;
  style?: ViewStyle;
}

export default function ResetPasswordForm({
  onResetPassword,
  isLoading,
  style,
}: ResetPasswordFormProps) {
  const { theme } = useTheme();
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);

  // Khởi tạo React Hook Form
  const formMethods = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    }
  });

  const { control, handleSubmit } = formMethods;

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    // Reset states
    setFormError('');
    setSuccess(false);

    try {
      // Gọi hàm đặt lại mật khẩu từ props
      await onResetPassword(data.email);
      setSuccess(true);
    } catch (err) {
      setFormError('Đã xảy ra lỗi khi gửi yêu cầu đặt lại mật khẩu. Vui lòng thử lại.');
      console.error('Reset password error:', err);
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
    successText: {
      color: 'green',
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
        Enter your email address and we'll send you a link to reset your password.
      </Text>

      {formError ? <Text style={dynamicStyles.errorText}>{formError}</Text> : null}
      {success ? (
        <Text style={dynamicStyles.successText}>
          Password reset link has been sent to your email.
        </Text>
      ) : null}

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
          title="Send Reset Link"
          onPress={handleSubmit(handleResetPassword)}
          formMethods={formMethods}
          loading={isLoading}
          size="large"
          fullWidth
        />
      </View>
    </View>
  );
} 