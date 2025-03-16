import { Stack } from "expo-router";
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';

export default function AuthLayout() {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.replace('/(tabs)/home');
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#f8f8f8",
                },
                headerTintColor: "#000",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                name="login"
                options={{
                    title: "Login",
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="register"
                options={{
                    title: "Create Account",
                }}
            />
            <Stack.Screen
                name="forgot-password"
                options={{
                    title: "Reset Password",
                }}
            />
        </Stack>
    );
}
