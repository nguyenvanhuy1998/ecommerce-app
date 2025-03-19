/**
 * Authentication service for handling user authentication
 */
import { User, AuthResponse, SocialProvider, RegisterData } from "@/types";
import * as SecureStore from "expo-secure-store";
import { api } from "@/utils/apiClient";
import { API_ENDPOINTS, AUTH_STORAGE_KEYS } from "@/constants";

/**
 * Register new user with name, email and password
 * @param data Dữ liệu đăng ký
 * @returns Promise with user data and token
 */
export const register = async (data: RegisterData): Promise<AuthResponse> => {
    try {
        // Gọi API đăng ký với dữ liệu người dùng
        const response = await api.post<AuthResponse>(
            API_ENDPOINTS.AUTH.REGISTER,
            data
        );
        // Lưu dữ liệu authentication vào secure storage
        await SecureStore.setItemAsync(AUTH_STORAGE_KEYS.TOKEN, response.token);
        await SecureStore.setItemAsync(
            AUTH_STORAGE_KEYS.USER,
            JSON.stringify(response.user)
        );
        return response;
    } catch (error) {
        console.log("Error registering user:", error);
        throw error;
    }
};

/**
 * Login with email and password
 * @param email Email người dùng
 * @param password Mật khẩu
 * @returns Promise with user data and token
 */
export const loginWithEmailPassword = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    try {
        // Gọi API Đăng nhập
        const response = await api.post<AuthResponse>(
            API_ENDPOINTS.AUTH.LOGIN,
            {
                email,
                password,
            }
        );
        // Lưu dữ liệu authentication vào secure storage
        await SecureStore.setItemAsync(AUTH_STORAGE_KEYS.TOKEN, response.token);
        await SecureStore.setItemAsync(
            AUTH_STORAGE_KEYS.USER,
            JSON.stringify(response.user)
        );
        return response;
    } catch (error) {
        console.log("Error logging in:", error);
        throw error;
    }
};

/**
 * Login with social provider
 * @param provider Social provider (apple, google, facebook)
 * @returns Promise with user data and token
 */
export const loginWithSocialProvider = async (
    provider: SocialProvider
): Promise<AuthResponse> => {
    try {
        // Gọi API đăng nhập qua mạng xã hội
        const response = await api.post<AuthResponse>(
            API_ENDPOINTS.AUTH.SOCIAL_LOGIN(provider)
        );
        // Lưu dữ liệu authentication vào secure storage
        await SecureStore.setItemAsync(AUTH_STORAGE_KEYS.TOKEN, response.token);
        await SecureStore.setItemAsync(
            AUTH_STORAGE_KEYS.USER,
            JSON.stringify(response.user)
        );
        return response;
    } catch (error) {
        console.log(`Lỗi khi đăng nhập qua ${provider}:`, error);
        throw error;
    }
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
    try {
        // Gọi API đăng xuất (nếu cần)
        await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
        console.error("Error logging out:", error);
    } finally {
        // Xóa dữ liệu authentication khỏi secure storage
        await SecureStore.deleteItemAsync(AUTH_STORAGE_KEYS.TOKEN);
        await SecureStore.deleteItemAsync(AUTH_STORAGE_KEYS.USER);
        await SecureStore.deleteItemAsync(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    }
};

/**
 * Get current authenticated user
 * @returns Current user or null if not authenticated
 */
export const getCurrentUser = async (): Promise<User | null> => {
    try {
        const userJson = await SecureStore.getItemAsync(AUTH_STORAGE_KEYS.USER);
        if (!userJson) {
            return null;
        }
        return JSON.parse(userJson) as User;
    } catch (error) {
        console.error("Error getting current user:", error);
        return null;
    }
};

/**
 * Check if user is authenticated
 * @returns Boolean indicating if user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
    try {
        const token = await SecureStore.getItemAsync(AUTH_STORAGE_KEYS.TOKEN);
        return !!token;
    } catch (error) {
        console.error("Error checking authentication:", error);
        return false;
    }
};

/**
 * Get current auth token
 * @returns Current auth token or null if not authenticated
 */
export const getAuthToken = async (): Promise<string | null> => {
    try {
        return await SecureStore.getItemAsync(AUTH_STORAGE_KEYS.TOKEN);
    } catch (error) {
        console.error("Error getting auth token:", error);
        return null;
    }
};
