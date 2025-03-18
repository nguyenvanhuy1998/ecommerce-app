import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { spacing } from '@/constants';

interface CircleButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  backgroundColor?: string;
  onPress: () => void;
  style?: ViewStyle;
}

/**
 * CircleButton component để hiển thị các nút hình tròn với icon
 * Phổ biến cho nút back, close, v.v
 */
export default function CircleButton({
  icon,
  size = 24,
  color,
  backgroundColor,
  onPress,
  style,
}: CircleButtonProps) {
  const { theme } = useTheme();
  
  // Sử dụng màu từ props hoặc default từ theme
  const iconColor = color || theme.colors.text;
  const bgColor = backgroundColor || theme.colors.card;

  return (
    <TouchableOpacity
      style={[styles.buttonWrapper, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.button, { backgroundColor: bgColor }]}>
        <Ionicons name={icon} size={size} color={iconColor} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    padding: 4,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
}); 