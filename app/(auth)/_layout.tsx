import { Stack } from "expo-router";

export default function AuthLayout() {
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
