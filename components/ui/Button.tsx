import React from 'react';
import { 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { spacing, borderRadius } from '../../constants/theme';
import Text from './Text';
import Row from './Row';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  style,
  textStyle,
  iconLeft,
  iconRight,
  ...rest
}: ButtonProps) {
  const { theme } = useTheme();
  
  // Determine button styles based on variant
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: theme.colors.card,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.colors.primary,
        };
      case 'danger':
        return {
          backgroundColor: theme.colors.error,
        };
      case 'primary':
      default:
        return {
          backgroundColor: theme.colors.primary,
        };
    }
  };

  // Determine text color based on variant
  const getTextColor = (): 'primary' | 'text' | 'textInverse' | 'error' => {
    switch (variant) {
      case 'outline':
        return 'primary';
      case 'secondary':
        return 'text';
      case 'danger':
      case 'primary':
      default:
        return 'textInverse';
    }
  };

  // Determine size styles
  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: spacing.xs,
          paddingHorizontal: spacing.md,
          height: 40,
        };
      case 'large':
        return {
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          height: 56,
        };
      case 'medium':
      default:
        return {
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
          height: 48,
        };
    }
  };

  // Determine text size based on button size
  const getTextVariant = (): 'button' | 'body1' | 'body2' => {
    switch (size) {
      case 'small':
        return 'body2';
      case 'large':
      case 'medium':
      default:
        return 'button';
    }
  };

  const buttonStyle = getButtonStyle();
  const textColor = getTextColor();
  const sizeStyle = getSizeStyle();
  const textVariant = getTextVariant();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonStyle,
        sizeStyle,
        fullWidth && styles.fullWidth,
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...rest}
    >
      <Row align="center" justify="center">
        {iconLeft && !loading && (
          <Row style={styles.iconLeft}>
            {iconLeft}
          </Row>
        )}
        
        {loading ? (
          <ActivityIndicator 
            color={variant === 'outline' ? theme.colors.primary : theme.colors.textInverse} 
            size="small" 
          />
        ) : (
          <Text
            variant={textVariant}
            color={textColor}
            semiBold
            style={[textStyle]}
          >
            {title}
          </Text>
        )}
        
        {iconRight && !loading && (
          <Row style={styles.iconRight}>
            {iconRight}
          </Row>
        )}
      </Row>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.pill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Width styles
  fullWidth: {
    width: '100%',
  },
  // Disabled styles
  disabledButton: {
    opacity: 0.5,
  },
  iconLeft: {
    marginRight: spacing.xs,
  },
  iconRight: {
    marginLeft: spacing.xs,
  },
}); 