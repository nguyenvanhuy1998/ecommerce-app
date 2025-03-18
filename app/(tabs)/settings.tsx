import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import useThemeToggle from "../../hooks/useThemeToggle";
import { useAuthStore } from "@/stores";

const SettingsScreen = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const { theme } = useTheme();
    const { themePreference, useSystemTheme, useLightTheme, useDarkTheme } =
        useThemeToggle();
    const router = useRouter();

    const dynamicStyles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        profileSection: {
            alignItems: "center",
            paddingVertical: 30,
            paddingHorizontal: 20,
            backgroundColor: theme.colors.card,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
        },
        avatarContainer: {
            width: 100,
            height: 100,
            borderRadius: 50,
            overflow: "hidden",
            marginBottom: 15,
            backgroundColor: theme.colors.input,
            alignItems: "center",
            justifyContent: "center",
        },
        avatar: {
            width: "100%",
            height: "100%",
        },
        name: {
            fontSize: 22,
            fontWeight: "bold",
            color: theme.colors.text,
            marginBottom: 5,
        },
        email: {
            fontSize: 16,
            color: theme.colors.textSecondary,
            marginBottom: 5,
        },
        phone: {
            fontSize: 16,
            color: theme.colors.textSecondary,
            marginBottom: 10,
        },
        editButton: {
            paddingHorizontal: 15,
            paddingVertical: 8,
            borderRadius: 20,
            backgroundColor: "transparent",
        },
        editButtonText: {
            color: theme.colors.primary,
            fontWeight: "600",
            fontSize: 16,
        },
        menuSection: {
            marginTop: 20,
        },
        menuItem: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 16,
            paddingHorizontal: 20,
            backgroundColor: theme.colors.card,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
        },
        menuItemFirst: {
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
        },
        menuItemText: {
            fontSize: 18,
            color: theme.colors.text,
            flex: 1,
        },
        menuItemIcon: {
            marginRight: 15,
            width: 24,
            alignItems: "center",
        },
        chevron: {
            color: theme.colors.textTertiary,
        },
        signOutButton: {
            marginTop: 30,
            marginHorizontal: 20,
            paddingVertical: 16,
            borderRadius: 10,
            backgroundColor: "#FF3B30",
            alignItems: "center",
            justifyContent: "center",
        },
        signOutText: {
            color: "#FFFFFF",
            fontSize: 18,
            fontWeight: "600",
        },
        themeSection: {
            marginTop: 20,
        },
        themeSectionTitle: {
            fontSize: 18,
            fontWeight: "600",
            color: theme.colors.text,
            marginHorizontal: 20,
            marginBottom: 10,
        },
        themeOption: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 12,
            paddingHorizontal: 20,
            backgroundColor: theme.colors.card,
        },
        themeOptionFirst: {
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
        },
        themeOptionText: {
            fontSize: 16,
            color: theme.colors.text,
            flex: 1,
            marginLeft: 15,
        },
        themeOptionSelected: {
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: theme.colors.primary,
            alignItems: "center",
            justifyContent: "center",
        },
        themeOptionSelectedInner: {
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: theme.colors.primary,
        },
        footer: {
            marginTop: 40,
            marginBottom: 20,
            alignItems: "center",
        },
        footerText: {
            fontSize: 14,
            color: theme.colors.textTertiary,
        },
    });

    const handleSignOut = async () => {
        try {
            await logout();
            router.replace("/(auth)/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const handleEditProfile = () => {
        // Navigate to edit profile screen (to be implemented)
        console.log("Navigate to edit profile");
    };

    const navigateToScreen = (screen: string) => {
        console.log(`Navigate to ${screen}`);
        // Implement navigation to respective screens
    };

    return (
        <ScrollView style={dynamicStyles.container}>
            <View style={dynamicStyles.profileSection}>
                <View style={dynamicStyles.avatarContainer}>
                    {user?.avatar ? (
                        <Image
                            source={{ uri: user.avatar }}
                            style={dynamicStyles.avatar}
                            resizeMode="cover"
                        />
                    ) : (
                        <Ionicons
                            name="person"
                            size={50}
                            color={theme.colors.textTertiary}
                        />
                    )}
                </View>
                <Text style={dynamicStyles.name}>
                    {user?.name || "Gilbert Jones"}
                </Text>
                <Text style={dynamicStyles.email}>
                    {user?.email || "Gilbertjones001@gmail.com"}
                </Text>
                <Text style={dynamicStyles.phone}>121-224-7890</Text>
                <TouchableOpacity
                    style={dynamicStyles.editButton}
                    onPress={handleEditProfile}
                >
                    <Text style={dynamicStyles.editButtonText}>Edit</Text>
                </TouchableOpacity>
            </View>

            <View style={dynamicStyles.menuSection}>
                <TouchableOpacity
                    style={[
                        dynamicStyles.menuItem,
                        dynamicStyles.menuItemFirst,
                    ]}
                    onPress={() => navigateToScreen("Address")}
                >
                    <View style={dynamicStyles.menuItemIcon}>
                        <Ionicons
                            name="location-outline"
                            size={24}
                            color={theme.colors.text}
                        />
                    </View>
                    <Text style={dynamicStyles.menuItemText}>Address</Text>
                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        style={dynamicStyles.chevron}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={dynamicStyles.menuItem}
                    onPress={() => navigateToScreen("Wishlist")}
                >
                    <View style={dynamicStyles.menuItemIcon}>
                        <Ionicons
                            name="heart-outline"
                            size={24}
                            color={theme.colors.text}
                        />
                    </View>
                    <Text style={dynamicStyles.menuItemText}>Wishlist</Text>
                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        style={dynamicStyles.chevron}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={dynamicStyles.menuItem}
                    onPress={() => navigateToScreen("Payment")}
                >
                    <View style={dynamicStyles.menuItemIcon}>
                        <Ionicons
                            name="card-outline"
                            size={24}
                            color={theme.colors.text}
                        />
                    </View>
                    <Text style={dynamicStyles.menuItemText}>Payment</Text>
                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        style={dynamicStyles.chevron}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={dynamicStyles.menuItem}
                    onPress={() => navigateToScreen("Help")}
                >
                    <View style={dynamicStyles.menuItemIcon}>
                        <Ionicons
                            name="help-circle-outline"
                            size={24}
                            color={theme.colors.text}
                        />
                    </View>
                    <Text style={dynamicStyles.menuItemText}>Help</Text>
                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        style={dynamicStyles.chevron}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={dynamicStyles.menuItem}
                    onPress={() => navigateToScreen("Support")}
                >
                    <View style={dynamicStyles.menuItemIcon}>
                        <Ionicons
                            name="chatbubble-ellipses-outline"
                            size={24}
                            color={theme.colors.text}
                        />
                    </View>
                    <Text style={dynamicStyles.menuItemText}>Support</Text>
                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        style={dynamicStyles.chevron}
                    />
                </TouchableOpacity>

                <View style={dynamicStyles.themeSection}>
                    <Text style={dynamicStyles.themeSectionTitle}>
                        Appearance
                    </Text>

                    <TouchableOpacity
                        style={[
                            dynamicStyles.themeOption,
                            dynamicStyles.themeOptionFirst,
                        ]}
                        onPress={useSystemTheme}
                    >
                        <Ionicons
                            name="phone-portrait-outline"
                            size={24}
                            color={theme.colors.text}
                        />
                        <Text style={dynamicStyles.themeOptionText}>
                            Use System Setting
                        </Text>
                        {themePreference === "system" && (
                            <View style={dynamicStyles.themeOptionSelected}>
                                <View
                                    style={
                                        dynamicStyles.themeOptionSelectedInner
                                    }
                                />
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={dynamicStyles.themeOption}
                        onPress={useLightTheme}
                    >
                        <Ionicons
                            name="sunny-outline"
                            size={24}
                            color={theme.colors.text}
                        />
                        <Text style={dynamicStyles.themeOptionText}>Light</Text>
                        {themePreference === "light" && (
                            <View style={dynamicStyles.themeOptionSelected}>
                                <View
                                    style={
                                        dynamicStyles.themeOptionSelectedInner
                                    }
                                />
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={dynamicStyles.themeOption}
                        onPress={useDarkTheme}
                    >
                        <Ionicons
                            name="moon-outline"
                            size={24}
                            color={theme.colors.text}
                        />
                        <Text style={dynamicStyles.themeOptionText}>Dark</Text>
                        {themePreference === "dark" && (
                            <View style={dynamicStyles.themeOptionSelected}>
                                <View
                                    style={
                                        dynamicStyles.themeOptionSelectedInner
                                    }
                                />
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                style={dynamicStyles.signOutButton}
                onPress={handleSignOut}
            >
                <Text style={dynamicStyles.signOutText}>Sign Out</Text>
            </TouchableOpacity>

            <View style={dynamicStyles.footer}>
                <Text style={dynamicStyles.footerText}>Version 1.0.0</Text>
            </View>
        </ScrollView>
    );
};

export default SettingsScreen;
