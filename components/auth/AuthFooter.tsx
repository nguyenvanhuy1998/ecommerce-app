import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

interface AuthFooterProps {
  prompt: string;
  linkText: string;
  linkHref: any; // Using any for now to fix the type issue with expo-router paths
  style?: ViewStyle;
}

export default function AuthFooter({
  prompt,
  linkText,
  linkHref,
  style,
}: AuthFooterProps) {
  const { theme } = useTheme();

  const dynamicStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 32,
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
  });

  return (
    <View style={[dynamicStyles.container, style]}>
      <Text style={dynamicStyles.normalText}>{prompt} </Text>
      <Link href={linkHref} asChild>
        <TouchableOpacity>
          <Text style={dynamicStyles.linkText}>{linkText}</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
} 