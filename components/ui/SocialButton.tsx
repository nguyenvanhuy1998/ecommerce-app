import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

interface SocialButtonProps extends TouchableOpacityProps {
  provider: 'apple' | 'google' | 'facebook';
  title?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function SocialButton({
  provider,
  title,
  style,
  textStyle,
  ...rest
}: SocialButtonProps) {
  const { theme } = useTheme();

  // Get icon name based on provider
  const getIconName = (): React.ComponentProps<typeof Ionicons>['name'] => {
    switch (provider) {
      case 'apple':
        return 'logo-apple';
      case 'google':
        return 'logo-google';
      case 'facebook':
        return 'logo-facebook';
      default:
        return 'logo-google';
    }
  };

  // Get icon color based on provider
  const getIconColor = () => {
    switch (provider) {
      case 'apple':
        return theme.colors.text;
      case 'google':
        return theme.colors.text;
      case 'facebook':
        return '#1877F2';
      default:
        return theme.colors.text;
    }
  };

  // Get default button text based on provider
  const getDefaultTitle = () => {
    return `Continue With ${provider.charAt(0).toUpperCase() + provider.slice(1)}`;
  };

  const dynamicStyles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 25,
      height: 56,
      backgroundColor: theme.colors.card,
      marginBottom: 16,
    },
    buttonText: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: '500',
    },
  });

  return (
    <TouchableOpacity
      style={[dynamicStyles.button, style]}
      activeOpacity={0.7}
      {...rest}
    >
      <Ionicons
        name={getIconName()}
        size={24}
        color={getIconColor()}
        style={{ marginRight: 8 }}
      />
      <Text style={[dynamicStyles.buttonText, textStyle]}>
        {title || getDefaultTitle()}
      </Text>
    </TouchableOpacity>
  );
} 