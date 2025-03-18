import { spacing, typography } from "@/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "expo-router";
import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
    Keyboard,
} from "react-native";
import { Theme, useTheme } from "../../context/ThemeContext";
import { LoginFormData, loginSchema } from "../../validation/authSchemas";
import FormButton from "../ui/FormButton";
import FormInput from "../ui/FormInput";
import { Column, Row } from "../ui";

interface LoginFormProps {
    onLogin: (email: string, password: string) => Promise<void>;
    isLoading: boolean;
    style?: StyleProp<ViewStyle>;
    step?: number;
    onStepChange: (step: number) => void;
    error?: string;
}

export default function LoginForm({
    onLogin,
    isLoading,
    style,
    step = 1,
    onStepChange,
    error,
}: LoginFormProps) {
    const { theme } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [emailValue, setEmailValue] = useState("");
    const [localError, setLocalError] = useState<string>("");
    const dynamicStyles = createStyles(theme);

    // Khởi tạo React Hook Form
    const formMethods = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const {
        control,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors, dirtyFields },
        trigger,
        watch,
    } = formMethods;

    // Theo dõi giá trị email và password để validate
    const email = watch("email");
    const password = watch("password");

    // Xóa lỗi khi giá trị input thay đổi
    useEffect(() => {
        setLocalError("");
    }, [email, password]);

    // Validate trường dữ liệu theo bước hiện tại
    useEffect(() => {
        const validateFields = async () => {
            if (step === 1 && email) {
                await trigger("email");
            } else if (step === 2 && password) {
                await trigger("password");
            }
        };

        validateFields();
    }, [email, password, trigger, step]);

    // Lưu email vào state khi bước thay đổi
    useEffect(() => {
        if (step === 2 && !emailValue) {
            const currentEmail = getValues("email").trim();
            if (currentEmail) {
                setEmailValue(currentEmail);
            }
        }
    }, [step, emailValue, getValues]);

    // Xử lý quay lại bước nhập email
    const handleBack = useCallback(() => {
        onStepChange(1);
    }, [onStepChange]);

    // Xử lý nút "Tiếp tục" sau khi nhập email
    const handleContinue = useCallback(async () => {
        try {
            Keyboard.dismiss();
            setLocalError("");

            // Validate email trước khi tiếp tục
            const isEmailValid = await trigger("email");
            if (!isEmailValid) return;

            // Lưu email đã được cắt khoảng trắng và chuyển sang bước nhập mật khẩu
            const currentEmail = getValues("email").trim();
            setEmailValue(currentEmail);
            setValue("email", currentEmail);
            onStepChange(2);
        } catch (error) {
            console.error("Error while continuing:", error);
            setLocalError("An error occurred. Please try again.");
        }
    }, [getValues, trigger, setValue, onStepChange]);

    // Xử lý việc đăng nhập
    const handleLogin = useCallback(
        async (data: LoginFormData) => {
            try {
                Keyboard.dismiss();
                setLocalError("");

                // Kiểm tra email và mật khẩu không được trống
                if (!emailValue || !data.password) {
                    setLocalError("Email and password cannot be empty");
                    return;
                }

                await onLogin(emailValue, data.password);
            } catch (err) {
                console.error("Login error:", err);
                setLocalError(
                    "Login failed. Please check your login credentials."
                );
            }
        },
        [emailValue, onLogin]
    );

    // Lấy thông báo lỗi hiển thị (từ props hoặc state local)
    const displayError = error || localError;

    return (
        <Column style={[dynamicStyles.container, style]}>
            {displayError ? (
                <Text style={dynamicStyles.errorText}>{displayError}</Text>
            ) : null}

            {step === 1 ? (
                // Bước 1: Nhập email
                <>
                    <FormInput
                        name="email"
                        control={control}
                        placeholder="Email Address"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        autoFocus
                        error={errors.email}
                    />

                    <View style={dynamicStyles.buttonContainer}>
                        <FormButton
                            title="Continue"
                            onPress={handleContinue}
                            formMethods={formMethods}
                            loading={isLoading}
                            disabled={
                                isLoading ||
                                !!errors.email ||
                                !dirtyFields.email
                            }
                            size="large"
                            fullWidth
                            disableIfInvalid={false}
                        />
                    </View>
                </>
            ) : (
                // Bước 2: Nhập mật khẩu
                <>
                    {/* Hiển thị email đã nhập với tùy chọn quay lại */}
                    <Row style={dynamicStyles.emailContainer} align="center">
                        <TouchableOpacity
                            onPress={handleBack}
                            style={dynamicStyles.backButton}
                        >
                            <Text style={dynamicStyles.backButtonText}>
                                Edit
                            </Text>
                        </TouchableOpacity>
                        <Text
                            style={dynamicStyles.emailDisplay}
                            numberOfLines={1}
                            ellipsizeMode="middle"
                        >
                            {emailValue}
                        </Text>
                    </Row>

                    <FormInput
                        name="password"
                        control={control}
                        placeholder="Password"
                        secureTextEntry={!showPassword}
                        rightIcon={
                            showPassword ? "eye-off-outline" : "eye-outline"
                        }
                        onRightIconPress={() => setShowPassword(!showPassword)}
                        autoFocus
                        error={errors.password}
                    />

                    <View style={dynamicStyles.buttonContainer}>
                        <FormButton
                            title="Login"
                            onPress={handleSubmit(handleLogin)}
                            formMethods={formMethods}
                            loading={isLoading}
                            size="large"
                            fullWidth
                            disableIfInvalid={true}
                        />
                    </View>

                    <Row
                        justify="center"
                        style={dynamicStyles.forgotPasswordContainer}
                    >
                        <Text style={dynamicStyles.normalText}>
                            Forgot Password?{" "}
                        </Text>
                        <Link href={"/(auth)/reset-password" as any} asChild>
                            <TouchableOpacity>
                                <Text style={dynamicStyles.linkText}>
                                    Reset
                                </Text>
                            </TouchableOpacity>
                        </Link>
                    </Row>
                </>
            )}
        </Column>
    );
}

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            width: "100%",
        },
        forgotPasswordContainer: {
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: spacing.md,
            marginTop: spacing.xs,
        },
        normalText: {
            color: theme.colors.textSecondary,
            fontSize: typography.fontSize.sm,
        },
        linkText: {
            color: theme.colors.primary,
            fontSize: typography.fontSize.sm,
            fontWeight: "600",
        },
        errorText: {
            color: theme.colors.error,
            marginBottom: spacing.md,
            textAlign: "center",
        },
        buttonContainer: {
            marginTop: spacing.xs,
        },
        emailContainer: {
            marginBottom: spacing.md,
            paddingHorizontal: spacing.xs,
            paddingVertical: spacing.xs / 2,
            backgroundColor: theme.colors.card,
            borderRadius: theme.borderRadius.sm,
            width: "100%",
        },
        emailDisplay: {
            fontSize: typography.fontSize.sm,
            color: theme.colors.text,
            flex: 1,
            textAlign: "center",
        },
        backButton: {
            paddingVertical: spacing.xs / 2,
            paddingHorizontal: spacing.xs,
        },
        backButtonText: {
            color: theme.colors.primary,
            fontSize: typography.fontSize.sm,
            fontWeight: "500",
        },
    });
