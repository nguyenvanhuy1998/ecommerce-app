import { useAuthStore } from "@/stores";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function IndexScreen() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isLoading = useAuthStore((state) => state.isLoading);
    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    // Use Redirect component for declarative navigation
    return (
        <Redirect href={isAuthenticated ? "/(tabs)/home" : "/(auth)/login"} />
    );
}
