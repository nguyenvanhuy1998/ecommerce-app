import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AuthFooter from "../../components/auth/AuthFooter";
import LoginForm from "../../components/auth/LoginForm";
import SocialLoginSection from "../../components/auth/SocialLoginSection";
import { Container, Row, Text, ThemeToggleButton } from "../../components/ui";
import { spacing, typography } from "../../constants";
import { useAuth } from "../../context/AuthContext";
import { Theme, useTheme } from "../../context/ThemeContext";

export default function LoginScreen() {
    const { login, loginWithSocial, isLoading } = useAuth();
    const { theme } = useTheme();
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
            <ThemeToggleButton size={typography.fontSize.xxl} />
        </Row>
    );

    return (
        <Container
            keyboardAware={true}
            scrollable={true}
            padding={spacing.xxl}
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

            {/* Only show AuthFooter and SocialLoginSection on step 1 */}
            {currentStep === 1 && (
                <>
                    <AuthFooter
                        prompt="Don't have an Account?"
                        linkText="Create One"
                        linkHref="/(auth)/register"
                    />

                    <SocialLoginSection
                        onAppleLogin={() => handleSocialLogin("apple")}
                        onGoogleLogin={() => handleSocialLogin("google")}
                        onFacebookLogin={() => handleSocialLogin("facebook")}
                    />
                </>
            )}
        </Container>
    );
}
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        contentContainer: {
            flexGrow: 1,
            paddingTop: spacing.xl * 5, // 20*5=100
        },
        headerContainer: {
            marginBottom: spacing.xxl, //32
        },
    });
