// Theme constants for the e-commerce app

/**
 * Color palette for the application
 */
export type ColorPalette = {
  // Primary colors
  primary: string;
  primaryDark: string;
  primaryLight: string;

  // Secondary colors
  secondary: string;
  secondaryDark: string;
  secondaryLight: string;

  // Accent colors
  accent: string;
  accentDark: string;
  accentLight: string;

  // Semantic colors
  success: string;
  warning: string;
  error: string;
  info: string;

  // Neutral colors
  black: string;
  darkGray: string;
  gray: string;
  lightGray: string;
  veryLightGray: string;
  white: string;

  // Background colors
  background: string;
  card: string;
  input: string;

  // Border colors
  border: string;
  divider: string;

  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;

  // Status colors
  inStock: string;
  outOfStock: string;
  sale: string;
  new: string;
};

export const colors: ColorPalette = {
  // Primary colors
  primary: '#8E6CEF',
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

/**
 * Typography definitions for the application
 */
export type TypographyType = {
  fontFamily: {
    regular: string;
    medium: string;
    bold: string;
  };
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl: number;
    display: number;
  };
  fontWeight: {
    regular: string;
    medium: string;
    semiBold: string;
    bold: string;
  };
  lineHeight: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl: number;
    display: number;
  };
};

export const typography: TypographyType = {
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

/**
 * Spacing values for consistent layout
 */
export type SpacingType = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
  section: number;
};

export const spacing: SpacingType = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  section: 40,
};

/**
 * Border radius values for consistent UI elements
 */
export type BorderRadiusType = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  round: number;
};

export const borderRadius: BorderRadiusType = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  round: 999,
};

/**
 * Shadow definitions for elevation effects
 */
export type ShadowType = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

export type ShadowsType = {
  small: ShadowType;
  medium: ShadowType;
  large: ShadowType;
};

export const shadows: ShadowsType = {
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

/**
 * Layout constants for consistent screen layouts
 */
export type LayoutType = {
  screenPadding: number;
  maxContentWidth: number;
};

export const layout: LayoutType = {
  screenPadding: spacing.lg,
  maxContentWidth: 1200,
};

/**
 * Z-index values for consistent stacking
 */
export type ZIndexType = {
  base: number;
  card: number;
  modal: number;
  toast: number;
  tooltip: number;
};

export const zIndex: ZIndexType = {
  base: 0,
  card: 10,
  modal: 100,
  toast: 200,
  tooltip: 300,
};

/**
 * Complete theme type definition
 */
export type ThemeType = {
  colors: ColorPalette;
  typography: TypographyType;
  spacing: SpacingType;
  borderRadius: BorderRadiusType;
  shadows: ShadowsType;
  layout: LayoutType;
  zIndex: ZIndexType;
};

// Export all theme elements as default theme
const theme: ThemeType = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  layout,
  zIndex,
};

export default theme; 