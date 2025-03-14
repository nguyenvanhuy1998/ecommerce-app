import React, { ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
  error?: string;
  showThemeToggle?: boolean;
  containerStyle?: ViewStyle;
}

export default function AuthLayout({
  title,
  children,
  error,
  showThemeToggle = true,
  containerStyle,
}: AuthLayoutProps) {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    contentContainer: {
      flexGrow: 1,
      padding: 24,
      paddingTop: 60,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 40,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 20,
    },
    themeToggle: {
      padding: 8,
    },
    errorText: {
      color: 'red',
      marginBottom: 16,
      textAlign: 'center',
    },
  });

  return (
    <KeyboardAwareScrollView
      style={dynamicStyles.container}
      contentContainerStyle={[
        dynamicStyles.contentContainer,
        containerStyle,
      ]}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={Platform.OS === 'ios' ? 30 : 80}
    >
      <View style={dynamicStyles.headerContainer}>
        <Text style={dynamicStyles.title}>{title}</Text>
        {showThemeToggle && (
          <TouchableOpacity
            style={dynamicStyles.themeToggle}
            onPress={toggleTheme}
            accessibilityLabel="Toggle dark mode"
          >
            <Ionicons
              name={isDarkMode ? "sunny-outline" : "moon-outline"}
              size={24}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        )}
      </View>

      {error ? <Text style={dynamicStyles.errorText}>{error}</Text> : null}

      {children}
    </KeyboardAwareScrollView>
  );
} 