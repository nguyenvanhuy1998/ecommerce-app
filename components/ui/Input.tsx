import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

// Import Ionicons types
import { Ionicons as IoniconsType } from '@expo/vector-icons/build/Icons';

interface InputProps extends TextInputProps {
  leftIcon?: React.ComponentProps<typeof Ionicons>['name'];
  rightIcon?: React.ComponentProps<typeof Ionicons>['name'];
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  error?: string;
}

export default function Input({
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  error,
  ...rest
}: InputProps) {
  const { theme } = useTheme();

  const dynamicStyles = StyleSheet.create({
    container: {
      position: 'relative',
      width: '100%',
      marginBottom: error ? 8 : 16,
    },
    input: {
      height: 50,
      backgroundColor: theme.colors.input,
      borderRadius: 8,
      paddingHorizontal: 16,
      fontSize: 16,
      color: theme.colors.text,
      width: '100%',
      borderWidth: error ? 1 : 0,
      borderColor: error ? 'red' : 'transparent',
      paddingLeft: leftIcon ? 48 : 16,
      paddingRight: rightIcon ? 48 : 16,
    },
    leftIconContainer: {
      position: 'absolute',
      left: 16,
      top: 13,
      zIndex: 1,
    },
    rightIconContainer: {
      position: 'absolute',
      right: 16,
      top: 13,
      zIndex: 1,
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginTop: 4,
    },
  });

  return (
    <View style={[dynamicStyles.container, containerStyle]}>
      {leftIcon && (
        <View style={dynamicStyles.leftIconContainer}>
          <Ionicons
            name={leftIcon}
            size={24}
            color={theme.colors.textSecondary}
          />
        </View>
      )}
      
      <TextInput
        style={[dynamicStyles.input, inputStyle]}
        placeholderTextColor={theme.colors.textTertiary}
        {...rest}
      />
      
      {rightIcon && (
        <TouchableOpacity
          style={dynamicStyles.rightIconContainer}
          onPress={onRightIconPress}
          disabled={!onRightIconPress}
        >
          <Ionicons
            name={rightIcon}
            size={24}
            color={theme.colors.textSecondary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
} 