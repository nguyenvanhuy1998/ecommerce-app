import React, { ReactNode } from "react";
import { StyleSheet, Text, ViewStyle, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Theme, useTheme } from "../../context/ThemeContext";
import { spacing, typography } from "../../constants";
import { Row, Column, Spacer, ThemeToggleButton } from "../ui";

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
    const { theme } = useTheme();
    const dynamicStyles = createStyles(theme);

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
            extraScrollHeight={Platform.OS === "ios" ? 30 : 80}
        >
            <Row
                justify="space-between"
                align="center"
                style={dynamicStyles.headerContainer}
            >
                <Text style={dynamicStyles.title}>{title}</Text>
                {showThemeToggle && <ThemeToggleButton size={24} />}
            </Row>

            {error ? (
                <>
                    <Text style={dynamicStyles.errorText}>{error}</Text>
                    <Spacer size="sm" />
                </>
            ) : null}

            <Column gap="md">{children}</Column>
        </KeyboardAwareScrollView>
    );
}
// Tạo hàm tạo styles nhận theme làm tham số
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        contentContainer: {
            flexGrow: 1,
            padding: spacing.lg,
            paddingTop: spacing.xxxl + spacing.xs,
        },
        headerContainer: {
            marginBottom: spacing.xl + spacing.xs,
        },
        title: {
            fontSize: typography.fontSize.xxxl,
            fontWeight: "bold",
            color: theme.colors.text,
            marginBottom: spacing.md,
        },
        errorText: {
            color: "red",
            marginBottom: spacing.sm,
            textAlign: "center",
        },
    });
