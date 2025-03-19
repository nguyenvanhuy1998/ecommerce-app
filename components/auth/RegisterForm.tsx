import { RegisterData } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { spacing } from "../../constants";
import { RegisterFormData, registerSchema } from "../../validation/authSchemas";
import { Column, Text } from "../ui";
import FormButton from "../ui/FormButton";
import FormInput from "../ui/FormInput";
import AuthFooter from "./AuthFooter";

interface RegisterFormProps {
    onRegister: (data: RegisterData) => Promise<void>;
    isLoading: boolean;
    style?: StyleProp<ViewStyle>;
    error?: string;
}

export default function RegisterForm({
    onRegister,
    isLoading,
    style,
    error,
}: RegisterFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [localError, setLocalError] = useState("");

    // Initialize React Hook Form
    const formMethods = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = formMethods;

    // Watch values for clearing errors
    const name = watch("name");
    const email = watch("email");
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    // Clear errors when input changes
    React.useEffect(() => {
        setLocalError("");
    }, [name, email, password, confirmPassword]);

    const handleRegister = async (data: RegisterFormData) => {
        try {
            Keyboard.dismiss();
            setLocalError("");

            await onRegister(data);
        } catch (err) {
            console.error("Registration error:", err);
            setLocalError("Registration failed. Please try again.");
        }
    };

    // Get display error message (from props or local state)
    const displayError = error || localError;

    return (
        <Column style={[styles.container, style]}>
            {displayError ? (
                <Text color="error" center style={styles.errorText}>
                    {displayError}
                </Text>
            ) : null}

            <FormInput
                name="name"
                control={control}
                placeholder="Full Name"
                autoCapitalize="words"
                error={errors.name}
            />

            <FormInput
                name="email"
                control={control}
                placeholder="Email Address"
                autoCapitalize="none"
                keyboardType="email-address"
                error={errors.email}
            />

            <FormInput
                name="password"
                control={control}
                placeholder="Password"
                secureTextEntry={!showPassword}
                rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
                onRightIconPress={() => setShowPassword(!showPassword)}
                error={errors.password}
            />

            <FormInput
                name="confirmPassword"
                control={control}
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                rightIcon={
                    showConfirmPassword ? "eye-off-outline" : "eye-outline"
                }
                onRightIconPress={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                }
                error={errors.confirmPassword}
            />

            <Column style={styles.buttonContainer}>
                <FormButton
                    title="Create Account"
                    onPress={handleSubmit(handleRegister)}
                    formMethods={formMethods}
                    loading={isLoading}
                    size="large"
                    fullWidth
                />
            </Column>

            <AuthFooter
                prompt="Forgot Password?"
                linkText="Reset"
                linkHref="/(auth)/reset-password"
            />
        </Column>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    errorText: {
        marginBottom: spacing.md,
    },
    buttonContainer: {
        marginTop: spacing.md,
        marginBottom: spacing.xs,
    },
});
