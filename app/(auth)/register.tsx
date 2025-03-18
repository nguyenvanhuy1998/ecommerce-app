// React và React Native
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

// Navigation
import { useRouter } from "expo-router";

// State management
import { useAuthStore } from "@/stores";

// Themes và Hooks
import { Theme, useTheme } from "@/context/ThemeContext";
import { useThemeToggle } from "@/hooks";

// Constants
import { spacing } from "@/constants";

// UI Components
import { CircleButton, Container, Row, Text } from "@/components/ui";

// Feature Components
import { RegisterForm } from "@/components/auth";

export default function RegisterScreen() {
    const router = useRouter();

    // Sử dụng các selectors riêng biệt từ authStore để tối ưu re-renders
    const register = useAuthStore((state) => state.register);
    const isLoading = useAuthStore((state) => state.isLoading);

    // Theme và chế độ tối/sáng
    const { theme } = useTheme();
    const { isDarkMode, toggleTheme } = useThemeToggle();

    // State quản lý thông báo lỗi
    const [error, setError] = useState("");

    const styles = createStyles(theme);

    /**
     * Xử lý đăng ký tài khoản mới
     * @param name Tên người dùng
     * @param email Email người dùng
     * @param password Mật khẩu người dùng
     */
    const handleRegister = async (
        name: string,
        email: string,
        password: string
    ) => {
        // Xóa thông báo lỗi cũ
        setError("");

        try {
            // Gọi hàm đăng ký từ authStore
            await register(name, email, password);
            // Việc điều hướng sẽ được xử lý bởi navigation guard dựa trên trạng thái isAuthenticated
        } catch (err) {
            // Xử lý lỗi đăng ký
            setError("Register failed. Please try again.");
            console.error("Register error:", err);
        }
    };

    /**
     * Xử lý khi nhấn nút quay lại
     */
    const handleBack = () => {
        router.replace("/");
    };

    // Component header chứa nút back, tiêu đề và nút chuyển đổi theme
    const AuthHeader = (
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
            header={AuthHeader}
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

// Tạo styles dựa trên theme
const createStyles = (theme: Theme) =>
    StyleSheet.create({
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
