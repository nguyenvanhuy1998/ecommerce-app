import { Stack } from "expo-router";
import AuthGuard from '../../components/auth/AuthGuard';

export default function AuthLayout() {
    return (
        <AuthGuard requireAuth={false} redirectTo="/(tabs)/home">
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
                        headerShown: false,
                    }}
                />
            </Stack>
        </AuthGuard>
    );
}
