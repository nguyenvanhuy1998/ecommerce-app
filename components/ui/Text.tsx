import React from "react";
import {
    Text as RNText,
    TextProps as RNTextProps,
    TextStyle,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

// Define available text variants
export type TextVariant =
    | "h1"
    | "h2"
    | "h3"
    | "body1"
    | "body2"
    | "button"
    | "caption";

// Define available text colors
export type TextColorVariant =
    | "primary"
    | "secondary"
    | "accent"
    | "text"
    | "textSecondary"
    | "textTertiary"
    | "textInverse"
    | "error"
    | "success"
    | "warning"
    | "info";

// Props for the Text component
export interface TextProps extends RNTextProps {
    variant?: TextVariant;
    color?: TextColorVariant;
    bold?: boolean;
    semiBold?: boolean;
    medium?: boolean;
    center?: boolean;
    right?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    flex?: boolean;
    adjustsFontSizeToFit?: boolean;
    numberOfLines?: number;
    uppercase?: boolean;
    lowercase?: boolean;
    capitalize?: boolean;
    children?: React.ReactNode;
}

const Text: React.FC<TextProps> = ({
    variant = "body1",
    color = "text",
    bold = false,
    semiBold = false,
    medium = false,
    center = false,
    right = false,
    underline = false,
    strikethrough = false,
    flex = false,
    adjustsFontSizeToFit = false,
    numberOfLines,
    uppercase = false,
    lowercase = false,
    capitalize = false,
    style,
    children,
    ...rest
}) => {
    const { theme } = useTheme();

    // Get variant style from theme
    const variantStyle = theme.typography.textVariants[variant] as TextStyle;
    
    // Determine font weight
    let fontWeight: TextStyle["fontWeight"] = "400"; // default
    if (bold) {
        fontWeight = "700";
    } else if (semiBold) {
        fontWeight = "600";
    } else if (medium) {
        fontWeight = "500";
    } else if (variantStyle && variantStyle.fontWeight) {
        fontWeight = variantStyle.fontWeight;
    }

    // Determine text transform
    let textTransform: TextStyle["textTransform"];
    if (uppercase) textTransform = "uppercase";
    else if (lowercase) textTransform = "lowercase";
    else if (capitalize) textTransform = "capitalize";

    // Determine text decoration
    let textDecorationLine: TextStyle["textDecorationLine"] = "none";
    if (underline && strikethrough)
        textDecorationLine = "underline line-through";
    else if (underline) textDecorationLine = "underline";
    else if (strikethrough) textDecorationLine = "line-through";

    // Create dynamic text style
    const textStyle: TextStyle = {
        color: theme.colors[color] || theme.colors.text,
        fontWeight,
        textAlign: center ? "center" : right ? "right" : "auto",
        textDecorationLine,
        flex: flex ? 1 : undefined,
        textTransform,
        ...variantStyle, // Include all variant styles
    };

    return (
        <RNText
            adjustsFontSizeToFit={adjustsFontSizeToFit}
            numberOfLines={numberOfLines}
            style={[textStyle, style]}
            {...rest}
        >
            {children}
        </RNText>
    );
};

export default Text;
