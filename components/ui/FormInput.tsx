import React from "react";
import { StyleSheet, TextInputProps, ViewStyle, TextStyle } from "react-native";
import {
    Controller,
    Control,
    FieldValues,
    Path,
    FieldError,
} from "react-hook-form";
import Input from "./Input";
import { Theme, useTheme } from "../../context/ThemeContext";
import Column from "./Column";
import Text from "./Text";
import { spacing } from "@/constants";

interface FormInputProps<T extends FieldValues>
    extends Omit<TextInputProps, "value" | "onChangeText"> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    leftIcon?: React.ComponentProps<typeof Input>["leftIcon"];
    rightIcon?: React.ComponentProps<typeof Input>["rightIcon"];
    onRightIconPress?: () => void;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    error?: FieldError;
    required?: boolean;
    helperText?: string;
}

function FormInput<T extends FieldValues>({
    name,
    control,
    label,
    leftIcon,
    rightIcon,
    onRightIconPress,
    containerStyle,
    inputStyle,
    error,
    required = false,
    helperText,
    ...rest
}: FormInputProps<T>) {
    const { theme } = useTheme();
    const dynamicStyles = createStyles(theme);
    
    return (
        <Column style={[dynamicStyles.container, containerStyle]}>
            {label && (
                <Text
                    variant="body2"
                    medium
                    color="text"
                    style={dynamicStyles.label}
                >
                    {label}
                    {required && <Text color="error"> *</Text>}
                </Text>
            )}

            <Controller
                control={control}
                name={name}
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error: fieldError },
                }) => {
                    // Sử dụng error message từ fieldError hoặc error prop
                    const errorMessage = fieldError?.message || error?.message;
                    
                    return (
                        <Input
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            leftIcon={leftIcon}
                            rightIcon={rightIcon}
                            onRightIconPress={onRightIconPress}
                            error={errorMessage}
                            inputStyle={inputStyle}
                            helperText={helperText}
                            {...rest}
                        />
                    );
                }}
            />
        </Column>
    );
}

export default FormInput;

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            width: "100%",
        },
        label: {
            marginBottom: spacing.sm,
        },
    });
