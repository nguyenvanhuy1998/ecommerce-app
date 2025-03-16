import { useCallback } from 'react';
import { useTheme, ThemePreference } from '../context/ThemeContext';

/**
 * Enhanced hook for theme management with additional functionality
 * @returns Object with theme state and control functions
 */
export const useThemeToggle = () => {
  const { 
    isDarkMode, 
    themePreference, 
    toggleTheme, 
    setThemePreference 
  } = useTheme();

  // Toggle between light and dark mode
  const handleToggleTheme = useCallback(async () => {
    await toggleTheme();
  }, [toggleTheme]);

  // Set theme to system preference
  const useSystemTheme = useCallback(async () => {
    await setThemePreference('system');
  }, [setThemePreference]);

  // Set theme to light mode
  const useLightTheme = useCallback(async () => {
    await setThemePreference('light');
  }, [setThemePreference]);

  // Set theme to dark mode
  const useDarkTheme = useCallback(async () => {
    await setThemePreference('dark');
  }, [setThemePreference]);

  // Set theme preference directly
  const setTheme = useCallback(async (preference: ThemePreference) => {
    await setThemePreference(preference);
  }, [setThemePreference]);

  // Check if using system theme
  const isUsingSystemTheme = themePreference === 'system';

  return {
    isDarkMode,
    themePreference,
    isUsingSystemTheme,
    toggleTheme: handleToggleTheme,
    useSystemTheme,
    useLightTheme,
    useDarkTheme,
    setTheme,
  };
};

export default useThemeToggle; 