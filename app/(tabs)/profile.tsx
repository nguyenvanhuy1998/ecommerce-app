import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

/**
 * Profile screen that redirects to settings
 * This is to maintain consistency with the tab navigation
 */
const ProfileScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    // Redirect to settings page
    router.replace('/(tabs)/settings');
  }, [router]);

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
  });

  return (
    <View style={dynamicStyles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};

export default ProfileScreen; 