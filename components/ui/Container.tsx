import { spacing } from "@/constants";
import { useTheme } from "@/context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    View,
    ViewStyle,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

interface ContainerProps {
    children: React.ReactNode;
    scrollable?: boolean;
    keyboardAware?: boolean;
    useSafeArea?: boolean;
    style?: ViewStyle;
    contentContainerStyle?: ViewStyle;
    padding?: keyof typeof spacing | number | boolean;
    backgroundColor?: string;
    statusBarStyle?: "light" | "dark";
    header?: ReactNode;
    footer?: ReactNode;
}
/**
 * Container component đa năng cho toàn bộ ứng dụng
 * Hỗ trợ scrolling, keyboard handling, safe areas và dynamic insets
 */
const Container = ({
    children,
    scrollable = false,
    keyboardAware = false,
    useSafeArea = true,
    style,
    contentContainerStyle,
    padding = true,
    backgroundColor,
    statusBarStyle,
    header,
    footer,
}: ContainerProps) => {
    const { theme, isDarkMode } = useTheme();
    // Xác định padding dựa trên prop
    const getPadding = () => {
        if (padding === false) {
            return 0;
        }
        if (padding === true) {
            return spacing.md;
        }
        if (typeof padding === "number") {
            return padding;
        }
        return spacing[padding] as number;
    };
    // Xác định màu nền
    const bgColor = backgroundColor || theme.colors.background;
    // Xác định style cho container
    const containerStyle: ViewStyle = {
        flex: 1,
        backgroundColor: bgColor,
    };
    // Xác định style cho content
    const innerContentStyle: ViewStyle = {
        padding: getPadding(),
        ...(contentContainerStyle || {}),
    };
    // Xác định StatusBar style dựa trên theme nếu không được cung cấp
    const defaultStatusBarStyle = isDarkMode ? "light" : "dark";
    const statusBarStyleToUse = statusBarStyle || defaultStatusBarStyle;
    // Render content dựa trên các props
    const renderContent = () => {
        // Content cơ bản
        const content = (
            <>
                {header}
                <View style={[{ flex: 1 }, innerContentStyle]}>{children}</View>
                {footer}
            </>
        );

        // Nếu không scrollable, trả về content trực tiếp
        if (!scrollable) {
            return content;
        }

        // Nếu keyboardAware, sử dụng KeyboardAwareScrollView
        if (keyboardAware) {
            return (
                <KeyboardAwareScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={innerContentStyle}
                    enableOnAndroid={true}
                    enableAutomaticScroll={true}
                    keyboardShouldPersistTaps="handled"
                    extraScrollHeight={Platform.OS === "ios" ? 30 : 80}
                >
                    {header}
                    {children}
                    {footer}
                </KeyboardAwareScrollView>
            );
        }

        // Nếu chỉ scrollable, sử dụng ScrollView
        return (
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={innerContentStyle}
                keyboardShouldPersistTaps="handled"
            >
                {header}
                {children}
                {footer}
            </ScrollView>
        );
    };

    // Wrap trong KeyboardAvoidingView nếu keyboardAware và không sử dụng KeyboardAwareScrollView
    const renderWithKeyboardAvoidance = () => {
        if (keyboardAware && !scrollable) {
            return (
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
                >
                    {renderContent()}
                </KeyboardAvoidingView>
            );
        }
        return renderContent();
    };

    // Wrap trong SafeAreaView nếu cần
    if (useSafeArea) {
        return (
            <>
                <StatusBar
                    style={statusBarStyleToUse}
                    backgroundColor={bgColor}
                />
                <SafeAreaView
                    style={[containerStyle, style]}
                    edges={["top", "left", "right"]}
                >
                    {renderWithKeyboardAvoidance()}
                </SafeAreaView>
            </>
        );
    }

    // Trả về không có SafeAreaView
    return (
        <>
            <StatusBar style={statusBarStyleToUse} backgroundColor={bgColor} />
            <View style={[containerStyle, style]}>
                {renderWithKeyboardAvoidance()}
            </View>
        </>
    );
};

export default Container;
