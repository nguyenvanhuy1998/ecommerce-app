// Cách import tốt hơn, gọn gàng hơn
import React, { useState } from "react";
import { StyleSheet } from "react-native";

// Nhóm các components theo nguồn
import { useAuthStore } from "@/stores";
import { SocialProvider } from "@/types";
import { Theme, useTheme } from "@/context/ThemeContext";
import { spacing } from "@/constants";
import { useThemeToggle } from "@/hooks";

// Nhóm các UI components
import { CircleButton, Container, Row, Text } from "@/components/ui";

// Nhóm các auth components
import { LoginForm, SocialLoginSection } from "@/components/auth";

export default function LoginScreen() {
    // Sử dụng các selectors riêng biệt từ authStore để tối ưu re-renders
    const loginWithEmailPassword = useAuthStore(
        (state) => state.loginWithEmailPassword
    );
    const loginWithSocialProvider = useAuthStore(
        (state) => state.loginWithSocialProvider
    );
    const isLoading = useAuthStore((state) => state.isLoading);

    // Theme và chế độ tối/sáng
    const { theme } = useTheme();
    const { isDarkMode, toggleTheme } = useThemeToggle();

    // State quản lý thông báo lỗi và bước đăng nhập hiện tại
    const [error, setError] = useState("");
    const [currentStep, setCurrentStep] = useState(1); // 1: Email, 2: Password
    const styles = createStyles(theme);

    /**
     * Xử lý đăng nhập bằng email và mật khẩu
     * @param email Email người dùng
     * @param password Mật khẩu người dùng
     */
    const handleLogin = async (email: string, password: string) => {
        // Xóa thông báo lỗi cũ
        setError("");

        try {
            // Gọi function đăng nhập từ authStore
            await loginWithEmailPassword(email, password);
            // Việc điều hướng sẽ được xử lý bởi navigation guard dựa trên trạng thái isAuthenticated
        } catch (err) {
            // Xử lý lỗi đăng nhập
            setError("Invalid email or password. Please try again.");
            console.error("Login error:", err);
        }
    };

    /**
     * Xử lý đăng nhập bằng tài khoản mạng xã hội
     * @param provider Nhà cung cấp dịch vụ đăng nhập (apple, google, facebook)
     */
    const handleSocialLogin = async (provider: SocialProvider) => {
        // Xóa thông báo lỗi cũ
        setError("");

        try {
            // Gọi function đăng nhập xã hội từ authStore
            await loginWithSocialProvider(provider);
            // Việc điều hướng sẽ được xử lý bởi navigation guard
        } catch (err) {
            // Xử lý lỗi đăng nhập
            setError(`Login with ${provider} failed. Please try again.`);
            console.error(`Login error with ${provider}:`, err);
        }
    };

    // Component header chứa tiêu đề và nút chuyển đổi theme
    const AuthHeader = (
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
            header={AuthHeader}
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

            {/* Chỉ hiển thị phần đăng nhập mạng xã hội ở bước 1 (nhập email) */}
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

// Tạo styles dựa trên theme
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
