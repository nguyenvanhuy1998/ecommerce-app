import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import RegisterForm from "../../components/auth/RegisterForm";
import { CircleButton, Container, Row, Text } from "../../components/ui";
import { spacing } from "../../constants";
import { useTheme } from "../../context/ThemeContext";
import useThemeToggle from "../../hooks/useThemeToggle";
import { useAuthStore } from "@/stores";

export default function RegisterScreen() {
    const router = useRouter();
    const register = useAuthStore((state) => state.register);
    const isLoading = useAuthStore((state) => state.isLoading);
    const { theme } = useTheme();
    const { isDarkMode, toggleTheme } = useThemeToggle();
    const [error, setError] = useState("");

    const handleRegister = async (
        name: string,
        email: string,
        password: string
    ) => {
        // Reset error state
        setError("");

        try {
            // Call auth context register function
            await register(name, email, password);
            // Navigation is handled by the AuthContext
        } catch (err) {
            // Handle registration error
            setError("Registration failed. Please try again.");
            console.error("Registration error:", err);
        }
    };

    const handleBack = () => {
        router.replace("/");
    };

    // Header component với title và nút back
    const header = (
        <>
            <View style={styles.backButtonContainer}>
                <CircleButton
                    icon="chevron-back"
                    size={24}
                    onPress={handleBack}
                    backgroundColor={theme.colors.card}
                />
            </View>

            <Row
                justify="space-between"
                align="center"
                style={styles.titleContainer}
            >
                <Text variant="h1" color="text">
                    Create Account
                </Text>
                <CircleButton
                    icon={isDarkMode ? "sunny" : "moon"}
                    size={24}
                    color={isDarkMode ? theme.colors.accent : theme.colors.text}
                    backgroundColor={theme.colors.card}
                    onPress={toggleTheme}
                />
            </Row>
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
            <RegisterForm
                onRegister={handleRegister}
                isLoading={isLoading}
                error={error}
            />
        </Container>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        paddingTop: spacing.xl,
    },
    backButtonContainer: {
        marginBottom: spacing.md,
    },
    titleContainer: {
        marginBottom: spacing.lg,
    },
});
