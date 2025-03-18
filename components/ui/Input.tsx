import React from "react";
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TextInputProps,
    ViewStyle,
    TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme, useTheme } from "../../context/ThemeContext";
import { spacing, borderRadius } from "../../constants/theme";
import Text from "./Text";
import Column from "./Column";
import Row from "./Row";

// Định nghĩa props cho Input component
interface InputProps extends TextInputProps {
    leftIcon?: React.ComponentProps<typeof Ionicons>["name"];
    rightIcon?: React.ComponentProps<typeof Ionicons>["name"];
    onRightIconPress?: () => void;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    error?: string;
    size?: "small" | "medium" | "large";
    hideErrorMessage?: boolean;
    helperText?: string;
}

export default function Input({
    leftIcon,
    rightIcon,
    onRightIconPress,
    containerStyle,
    inputStyle,
    error,
    size = "medium",
    hideErrorMessage = false,
    helperText,
    ...rest
}: InputProps) {
    const { theme } = useTheme();

    // Xác định kích thước input dựa vào prop size
    const getInputHeight = () => {
        switch (size) {
            case "small":
                return 44;
            case "large":
                return 64;
            case "medium":
                return 56;
            default:
                return 56;
        }
    };

    const inputHeight = getInputHeight();
    const iconTop = (inputHeight - 24) / 2; // Căn giữa icon theo chiều cao input
    const dynamicStyles = createStyles(
        theme,
        !!error,
        inputHeight,
        iconTop,
        !!leftIcon,
        !!rightIcon
    );

    // Hiển thị helper text khi không có lỗi
    const showHelperText = !error && helperText;

    return (
        <Column style={[dynamicStyles.container, containerStyle]}>
            <Row style={dynamicStyles.inputContainer}>
                {leftIcon && (
                    <Column style={dynamicStyles.leftIconContainer}>
                        <Ionicons
                            name={leftIcon}
                            size={24}
                            color={theme.colors.textSecondary}
                        />
                    </Column>
                )}

                <TextInput
                    style={[dynamicStyles.input, inputStyle]}
                    placeholderTextColor={theme.colors.textTertiary}
                    selectionColor={theme.colors.primary}
                    {...rest}
                />

                {rightIcon && (
                    <TouchableOpacity
                        style={dynamicStyles.rightIconContainer}
                        onPress={onRightIconPress}
                        disabled={!onRightIconPress}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name={rightIcon}
                            size={24}
                            color={theme.colors.textSecondary}
                        />
                    </TouchableOpacity>
                )}
            </Row>

            {error && !hideErrorMessage && (
                <Text
                    variant="caption"
                    color="error"
                    style={dynamicStyles.errorText}
                >
                    {error}
                </Text>
            )}

            {showHelperText && (
                <Text
                    variant="caption"
                    color="textTertiary"
                    style={dynamicStyles.helperText}
                >
                    {helperText}
                </Text>
            )}
        </Column>
    );
}

const createStyles = (
    theme: Theme,
    hasError: boolean,
    inputHeight: number,
    iconTop: number,
    hasLeftIcon: boolean,
    hasRightIcon: boolean
) =>
    StyleSheet.create({
        container: {
            width: "100%",
            marginBottom: hasError ? spacing.xs : spacing.lg,
        },
        inputContainer: {
            position: "relative",
            width: "100%",
        },
        input: {
            height: inputHeight,
            backgroundColor: theme.colors.input,
            borderRadius: borderRadius.md,
            paddingHorizontal: spacing.md,
            fontSize: theme.typography.fontSize.md,
            color: theme.colors.text,
            width: "100%",
            borderWidth: hasError ? 1 : 0,
            borderColor: hasError ? theme.colors.error : "transparent",
            paddingLeft: hasLeftIcon ? spacing.xxxl + spacing.sm : spacing.md,
            paddingRight: hasRightIcon ? spacing.xxxl + spacing.sm : spacing.md,
        },
        leftIconContainer: {
            position: "absolute",
            left: spacing.md,
            top: iconTop,
            zIndex: theme.zIndex.base + 1,
        },
        rightIconContainer: {
            position: "absolute",
            right: spacing.md,
            top: iconTop,
            zIndex: theme.zIndex.base + 1,
        },
        errorText: {
            marginTop: spacing.xs,
        },
        helperText: {
            marginTop: spacing.xs,
        },
    });
