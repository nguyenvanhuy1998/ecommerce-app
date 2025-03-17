import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { spacing, typography } from '../../constants';
import { moderateScale } from '../../utils/responsive';

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
  const { theme, isDarkMode } = useTheme();

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
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: spacing.borderRadius.pill,
      height: spacing.buttonHeight,
      backgroundColor: isDarkMode ? '#342F3F' : theme.colors.card,
      marginBottom: spacing.md,
      position: 'relative',
      paddingHorizontal: spacing.sm,
    },
    iconContainer: {
      position: 'absolute',
      left: spacing.sm,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: theme.colors.text,
      fontSize: typography.fontSize.md,
      fontWeight: '500',
      textAlign: 'center',
    },
  });

  return (
    <TouchableOpacity
      style={[dynamicStyles.button, style]}
      activeOpacity={0.7}
      {...rest}
    >
      <View style={dynamicStyles.iconContainer}>
        <Ionicons
          name={getIconName()}
          size={spacing.iconSize.medium}
          color={getIconColor()}
        />
      </View>
      <View style={dynamicStyles.textContainer}>
        <Text style={[dynamicStyles.buttonText, textStyle]}>
          {title || getDefaultTitle()}
        </Text>
      </View>
    </TouchableOpacity>
  );
} 