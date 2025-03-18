import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { spacing } from "../../constants/theme";
import { useTheme } from "../../context/ThemeContext";
import { Button, Column, Row, Text } from "../ui";

interface SocialLoginSectionProps {
    onAppleLogin?: () => void;
    onGoogleLogin?: () => void;
    onFacebookLogin?: () => void;
    style?: ViewStyle;
    title?: string;
}

export default function SocialLoginSection({
    onAppleLogin,
    onGoogleLogin,
    onFacebookLogin,
    style,
    title = "Or continue with",
}: SocialLoginSectionProps) {
    const { theme } = useTheme();

    // Get icon name based on provider
    const getIconName = (
        provider: "apple" | "google" | "facebook"
    ): React.ComponentProps<typeof Ionicons>["name"] => {
        switch (provider) {
            case "apple":
                return "logo-apple";
            case "google":
                return "logo-google";
            case "facebook":
                return "logo-facebook";
            default:
                return "logo-google";
        }
    };

    // Get icon color based on provider
    const getIconColor = (provider: "apple" | "google" | "facebook") => {
        switch (provider) {
            case "apple":
                return theme.colors.text;
            case "google":
                return theme.colors.text;
            case "facebook":
                return "#1877F2";
            default:
                return theme.colors.text;
        }
    };

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            gap: spacing.md,
            marginTop: spacing.lg,
        },
        dividerContainer: {
            marginBottom: spacing.lg,
        },
        divider: {
            height: 1,
            backgroundColor: theme.colors.divider,
            flex: 1,
        },
        titleContainer: {
            marginHorizontal: spacing.md,
        },
        button: {
            marginBottom: spacing.sm,
            backgroundColor: theme.colors.card,
            borderWidth: 1,
            borderColor: theme.colors.border,
        },
        buttonText: {
            width: "100%",
            textAlign: "center",
        },
    });

    const renderSocialIcon = (provider: "apple" | "google" | "facebook") => (
        <Ionicons
            name={getIconName(provider)}
            size={32}
            color={getIconColor(provider)}
        />
    );

    return (
        <Column
            style={{
                ...styles.container,
                ...(style || {}),
            }}
        >
            <Row align="center" style={styles.dividerContainer}>
                <View style={styles.divider} />
                {title && (
                    <Text
                        variant="body2"
                        color="textSecondary"
                        style={styles.titleContainer}
                    >
                        {title}
                    </Text>
                )}
                <View style={styles.divider} />
            </Row>

            {onAppleLogin && (
                <Button
                    title="Continue with Apple"
                    variant="secondary"
                    onPress={onAppleLogin}
                    iconLeft={renderSocialIcon("apple")}
                    iconPosition="absolute"
                    style={styles.button}
                    textStyle={styles.buttonText}
                    size="large"
                />
            )}

            {onGoogleLogin && (
                <Button
                    title="Continue with Google"
                    variant="secondary"
                    onPress={onGoogleLogin}
                    iconLeft={renderSocialIcon("google")}
                    iconPosition="absolute"
                    style={styles.button}
                    textStyle={styles.buttonText}
                    size="large"
                />
            )}

            {onFacebookLogin && (
                <Button
                    title="Continue with Facebook"
                    variant="secondary"
                    onPress={onFacebookLogin}
                    iconLeft={renderSocialIcon("facebook")}
                    iconPosition="absolute"
                    style={styles.button}
                    textStyle={styles.buttonText}
                    size="large"
                />
            )}
        </Column>
    );
}
