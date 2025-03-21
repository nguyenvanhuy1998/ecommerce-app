import { AuthState, RegisterData, SocialProvider, User } from "@/types";
import { create } from "zustand";
import * as AuthService from "@/services/auth";
// Mở rộng AuthState để thêm các actions
interface AuthStore extends AuthState {
    // Actions
    loginWithEmailPassword: (email: string, password: string) => Promise<void>;
    loginWithSocialProvider: (provider: SocialProvider) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}
export const useAuthStore = create<AuthStore>((set) => ({
    // State ban đầu
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,

    // Actions
    checkAuth: async () => {
        try {
            const isAuth = await AuthService.isAuthenticated();
            if (isAuth) {
                const user = await AuthService.getCurrentUser();
                const token = await AuthService.getAuthToken();
                set({
                    user,
                    token,
                    isAuthenticated: true,
                    isLoading: false,
                });
            } else {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error("Error checking authentication:", error);
            set({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
            });
        }
    },
    loginWithEmailPassword: async (email: string, password: string) => {
        set({
            isLoading: true,
        });
        try {
            const { user, token } = await AuthService.loginWithEmailPassword(
                email,
                password
            );
            set({
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            set({
                isLoading: false,
            });
            throw error;
        }
    },
    loginWithSocialProvider: async (provider: SocialProvider) => {
        set({
            isLoading: true,
        });
        try {
            const { user, token } = await AuthService.loginWithSocialProvider(
                provider
            );
            set({
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            set({
                isLoading: false,
            });
            throw error;
        }
    },
    register: async (data: RegisterData) => {
        set({
            isLoading: true,
        });
        try {
            const { user, token } = await AuthService.register(data);
            set({
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            set({
                isLoading: false,
            });
            throw error;
        }
    },
    logout: async () => {
        set({
            isLoading: true,
        });
        try {
            await AuthService.logout();
            set({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
            });
        } catch (error) {
            console.error("Error logging out:", error);
            set({
                isLoading: false,
            });
            throw error;
        }
    },
}));
