import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import useThemeToggle from '../../hooks/useThemeToggle';

interface ThemeToggleButtonProps {
  size?: number;
  style?: ViewStyle;
  showBackground?: boolean;
}

/**
 * A reusable theme toggle button component
 * Can be used anywhere in the app to toggle between light and dark mode
 */
const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  size = 24,
  style,
  showBackground = false,
}) => {
  const { theme } = useTheme();
  const { isDarkMode, toggleTheme } = useThemeToggle();

  const styles = StyleSheet.create({
    button: {
      padding: 8,
      borderRadius: showBackground ? 20 : 0,
      backgroundColor: showBackground 
        ? theme.colors.card 
        : 'transparent',
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={toggleTheme}
      accessibilityLabel={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Ionicons
        name={isDarkMode ? "sunny" : "moon"}
        size={size}
        color={isDarkMode ? "#FFD700" : theme.colors.text}
      />
    </TouchableOpacity>
  );
};

export default ThemeToggleButton; 