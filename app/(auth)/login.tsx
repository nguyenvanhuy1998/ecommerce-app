import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import AuthFooter from "../../components/auth/AuthFooter";
import LoginForm from "../../components/auth/LoginForm";
import SocialLoginSection from "../../components/auth/SocialLoginSection";
import { Column, Container, Row, Spacer, ThemeToggleButton } from "../../components/ui";
import { spacing, typography } from "../../constants";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function LoginScreen() {
    const { login, loginWithSocial, isLoading } = useAuth();
    const { theme } = useTheme();
    const [error, setError] = useState("");
    const [currentStep, setCurrentStep] = useState(1); // Track the current step

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

    // Handle step change
    const handleStepChange = (step: number) => {
        setCurrentStep(step);
    };

    // Header component với title
    const header = (
        <>
            <Row
                justify="space-between"
                align="center"
                style={styles.headerContainer}
            >
                <Text style={[styles.title, { color: theme.colors.text }]}>Sign in</Text>
                <ThemeToggleButton size={24} />
            </Row>

            {error ? (
                <>
                    <Text style={styles.errorText}>{error}</Text>
                    <Spacer size="sm" />
                </>
            ) : null}
        </>
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
            <Column gap="md">
                <LoginForm 
                    onLogin={handleLogin} 
                    isLoading={isLoading} 
                    onStepChange={handleStepChange} 
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
            </Column>
        </Container>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        paddingTop: spacing.xxxl + spacing.xs,
    },
    headerContainer: {
        marginBottom: spacing.xl + spacing.xs,
    },
    title: {
        fontSize: typography.fontSize.xxxl,
        fontWeight: "bold",
        marginBottom: spacing.md,
    },
    errorText: {
        color: "red",
        marginBottom: spacing.sm,
        textAlign: "center",
    },
});
