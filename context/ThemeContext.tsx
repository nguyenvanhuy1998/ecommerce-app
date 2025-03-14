import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
    useMemo,
    useCallback,
} from "react";
import defaultTheme from "../constants/theme";
import { useColorScheme } from "react-native";

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
    toggleTheme: () => void;
    setDarkMode: (isDark: boolean) => void;
};

// Default context value
const defaultContextValue: ThemeContextType = {
    theme: lightTheme,
    isDarkMode: false,
    toggleTheme: () => {},
    setDarkMode: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

interface ThemeProviderProps {
    children: ReactNode;
    initialTheme?: 'light' | 'dark' | 'system';
}

// Theme provider component
export const ThemeProvider = ({ 
    children, 
    initialTheme = 'system' 
}: ThemeProviderProps) => {
    const colorScheme = useColorScheme();
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (initialTheme === 'system') {
            return colorScheme === "dark";
        }
        return initialTheme === 'dark';
    });

    // Update theme when system theme changes
    useEffect(() => {
        if (initialTheme === 'system') {
            setIsDarkMode(colorScheme === "dark");
        }
    }, [colorScheme, initialTheme]);

    // Toggle theme function
    const toggleTheme = useCallback(() => {
        setIsDarkMode(prevMode => !prevMode);
    }, []);

    // Set dark mode directly
    const setDarkMode = useCallback((isDark: boolean) => {
        setIsDarkMode(isDark);
    }, []);

    // Memoize theme to prevent unnecessary re-renders
    const theme = useMemo(() => 
        isDarkMode ? darkTheme : lightTheme, 
        [isDarkMode]
    );

    // Memoize context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        theme,
        isDarkMode,
        toggleTheme,
        setDarkMode,
    }), [theme, isDarkMode, toggleTheme, setDarkMode]);

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
