import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
    useMemo,
    useCallback,
} from "react";
import * as SecureStore from 'expo-secure-store';
import { useColorScheme, AppState, AppStateStatus } from "react-native";
import defaultTheme from "../constants/theme";

// Storage key for theme preference
const THEME_PREFERENCE_KEY = 'theme_preference';

// Theme preference options
export type ThemePreference = 'light' | 'dark' | 'system';

// Define theme type based on the default theme structure
export type Theme = typeof defaultTheme;

// Define light and dark themes
const lightTheme: Theme = {
    ...defaultTheme,
    colors: {
        ...defaultTheme.colors,
        primary: "#7E57C2",
        background: "#FFFFFF",
        card: "#F4F4F4",
        text: "#272727",
        textSecondary: "#666666",
        textTertiary: "#999999",
        input: "#F4F4F4",
        border: "#E5E5EA",
        divider: "#E5E5EA",
    },
};

const darkTheme: Theme = {
    ...defaultTheme,
    colors: {
        ...defaultTheme.colors,
        primary: "#7E57C2",
        background: "#1D182A",
        card: "#342F3F",
        text: "#FFFFFF",
        textSecondary: "#AEAEB2",
        textTertiary: "#8E8E93",
        input: "#342F3F",
        border: "#3A3A3C",
        divider: "#3A3A3C",
    },
};

// Theme context type
type ThemeContextType = {
    theme: Theme;
    isDarkMode: boolean;
    themePreference: ThemePreference;
    toggleTheme: () => Promise<void>;
    setThemePreference: (preference: ThemePreference) => Promise<void>;
};

// Default context value
const defaultContextValue: ThemeContextType = {
    theme: lightTheme,
    isDarkMode: false,
    themePreference: 'system',
    toggleTheme: async () => {},
    setThemePreference: async () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

interface ThemeProviderProps {
    children: ReactNode;
}

// Theme provider component
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const systemColorScheme = useColorScheme();
    const [themePreference, setThemePreferenceState] = useState<ThemePreference>('system');
    const [isLoading, setIsLoading] = useState(true);
    
    // Determine if dark mode should be active based on preference and system setting
    const isDarkMode = useMemo(() => {
        if (themePreference === 'system') {
            return systemColorScheme === 'dark';
        }
        return themePreference === 'dark';
    }, [themePreference, systemColorScheme]);

    // Load saved theme preference on mount
    useEffect(() => {
        const loadThemePreference = async () => {
            try {
                const savedPreference = await SecureStore.getItemAsync(THEME_PREFERENCE_KEY);
                if (savedPreference !== null) {
                    setThemePreferenceState(savedPreference as ThemePreference);
                }
            } catch (error) {
                console.error('Error loading theme preference:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadThemePreference();
    }, []);

    // Monitor app state to detect system theme changes when app comes to foreground
    useEffect(() => {
        const handleAppStateChange = (nextAppState: AppStateStatus) => {
            if (nextAppState === 'active' && themePreference === 'system') {
                // Force re-evaluation of system theme when app becomes active
                const currentSystemTheme = systemColorScheme;
                console.log('App became active, system theme:', currentSystemTheme);
            }
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => {
            subscription.remove();
        };
    }, [systemColorScheme, themePreference]);

    // Save theme preference to secure storage
    const saveThemePreference = async (preference: ThemePreference) => {
        try {
            await SecureStore.setItemAsync(THEME_PREFERENCE_KEY, preference);
        } catch (error) {
            console.error('Error saving theme preference:', error);
        }
    };

    // Set theme preference with persistence
    const setThemePreference = useCallback(async (preference: ThemePreference) => {
        setThemePreferenceState(preference);
        await saveThemePreference(preference);
    }, []);

    // Toggle between light and dark theme
    const toggleTheme = useCallback(async () => {
        const newPreference = isDarkMode ? 'light' : 'dark';
        await setThemePreference(newPreference);
    }, [isDarkMode, setThemePreference]);

    // Memoize theme to prevent unnecessary re-renders
    const theme = useMemo(() => 
        isDarkMode ? darkTheme : lightTheme, 
        [isDarkMode]
    );

    // Memoize context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        theme,
        isDarkMode,
        themePreference,
        toggleTheme,
        setThemePreference,
    }), [theme, isDarkMode, themePreference, toggleTheme, setThemePreference]);

    // Show nothing while loading to prevent theme flash
    if (isLoading) {
        return null;
    }

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use theme
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    
    return context;
};
