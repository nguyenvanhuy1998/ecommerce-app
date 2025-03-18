import React, { useState } from "react";
import { StyleSheet } from "react-native";
import LoginForm from "../../components/auth/LoginForm";
import SocialLoginSection from "../../components/auth/SocialLoginSection";
import { CircleButton, Container, Row, Text } from "../../components/ui";
import { spacing } from "../../constants";
import { Theme, useTheme } from "../../context/ThemeContext";
import useThemeToggle from "../../hooks/useThemeToggle";
import { useAuthStore } from "@/stores";

export default function LoginScreen() {
    const login = useAuthStore((state) => state.login);
    const loginWithSocial = useAuthStore((state) => state.loginWithSocial);
    const isLoading = useAuthStore((state) => state.isLoading);
    const { theme } = useTheme();
    const { isDarkMode, toggleTheme } = useThemeToggle();
    const [error, setError] = useState("");
    const [currentStep, setCurrentStep] = useState(1);
    const styles = createStyles(theme);

    const handleLogin = async (email: string, password: string) => {
        // Reset error state
        setError("");

        try {
            // Call auth context login function
            await login(email, password);
            // Navigation is handled by the AuthContext
        } catch (err) {
            // Handle login error
            setError("Invalid email or password. Please try again.");
            console.error("Login error:", err);
            // Don't rethrow the error as it's already handled here
        }
    };

    const handleSocialLogin = async (
        provider: "apple" | "google" | "facebook"
    ) => {
        // Reset error state
        setError("");

        try {
            // Call auth context social login function
            await loginWithSocial(provider);
            // Navigation is handled by the AuthContext
        } catch (err) {
            // Handle login error
            setError(`Failed to login with ${provider}. Please try again.`);
            console.error(`${provider} login error:`, err);
        }
    };

    // Header component với title
    const header = (
        <Row
            justify="space-between"
            align="center"
            style={styles.headerContainer}
        >
            <Text variant="h1">Sign In</Text>
            <CircleButton
                icon={isDarkMode ? "sunny" : "moon"}
                size={24}
                color={isDarkMode ? theme.colors.accent : theme.colors.text}
                backgroundColor={theme.colors.card}
                onPress={toggleTheme}
            />
        </Row>
    );

    return (
        <Container
            keyboardAware={true}
            scrollable={true}
            padding={spacing.lg}
            header={header}
            contentContainerStyle={styles.contentContainer}
            backgroundColor={theme.colors.background}
        >
            <LoginForm
                onLogin={handleLogin}
                isLoading={isLoading}
                step={currentStep}
                onStepChange={setCurrentStep}
                error={error}
            />

            {/* Only show SocialLoginSection on step 1 */}
            {currentStep === 1 && (
                <SocialLoginSection
                    onAppleLogin={() => handleSocialLogin("apple")}
                    onGoogleLogin={() => handleSocialLogin("google")}
                    onFacebookLogin={() => handleSocialLogin("facebook")}
                />
            )}
        </Container>
    );
}
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        contentContainer: {
            flexGrow: 1,
            paddingTop: spacing.xl,
        },
        headerContainer: {
            marginBottom: spacing.xl,
        },
    });
