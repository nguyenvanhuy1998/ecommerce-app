// Theme constants for the e-commerce app

// Colors
export const colors = {
  // Primary colors
  primary: '#007AFF',
  primaryDark: '#0062CC',
  primaryLight: '#4DA3FF',

  // Secondary colors
  secondary: '#5856D6',
  secondaryDark: '#4745AB',
  secondaryLight: '#7A79E3',

  // Accent colors
  accent: '#FF9500',
  accentDark: '#CC7600',
  accentLight: '#FFAA33',

  // Semantic colors
  success: '#4CAF50',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#34AADC',

  // Neutral colors
  black: '#000000',
  darkGray: '#333333',
  gray: '#666666',
  lightGray: '#999999',
  veryLightGray: '#CCCCCC',
  white: '#FFFFFF',

  // Background colors
  background: '#F8F8F8',
  card: '#FFFFFF',
  input: '#F2F2F7',

  // Border colors
  border: '#E5E5EA',
  divider: '#E5E5EA',

  // Text colors
  text: '#000000',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textInverse: '#FFFFFF',

  // Status colors
  inStock: '#4CAF50',
  outOfStock: '#FF3B30',
  sale: '#FF3B30',
  new: '#4CAF50',
};

// Typography
export const typography = {
  // Font families
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },

  // Font sizes
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    display: 32,
  },

  // Font weights
  fontWeight: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },

  // Line heights
  lineHeight: {
    xs: 14,
    sm: 18,
    md: 22,
    lg: 24,
    xl: 28,
    xxl: 32,
    xxxl: 38,
    display: 48,
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  section: 40,
};

// Border radius
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  round: 999,
};

// Shadows
export const shadows = {
  small: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Layout
export const layout = {
  screenPadding: spacing.lg,
  maxContentWidth: 1200,
};

// Z-index
export const zIndex = {
  base: 0,
  card: 10,
  modal: 100,
  toast: 200,
  tooltip: 300,
};

// Export all theme elements
export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  layout,
  zIndex,
}; 