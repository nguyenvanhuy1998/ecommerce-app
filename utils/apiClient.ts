import {
    API_BASE_URL,
    API_HEADERS,
    API_TIMEOUT,
    AUTH_STORAGE_KEYS,
} from "@/constants";
import { useAuthStore } from "@/stores";
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import * as SecureStore from "expo-secure-store";

/**
 * Tạo instance axios với cấu hình mặc định
 */
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: API_HEADERS,
    timeout: API_TIMEOUT,
});

/**
 * Interceptor cho request - thêm token vào header
 */
apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        try {
            const token = await SecureStore.getItemAsync(
                AUTH_STORAGE_KEYS.TOKEN
            );
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        } catch (error) {
            return Promise.reject(error);
        }
    },
    (error: unknown) => {
        return Promise.reject(error);
    }
);

/**
 * Interceptor cho response - xử lý lỗi
 */
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config;
        // Xử lý lỗi 401 Unauthorized - có thể thêm refresh token ở đây
        if (error.response?.status === 401 && originalRequest) {
            try {
                // Thử refresh token (nếu có)
                const refreshToken = await SecureStore.getItemAsync(
                    AUTH_STORAGE_KEYS.REFRESH_TOKEN
                );
                if (refreshToken) {
                    // Có thể thêm logic refresh token ở đây
                    // const refreshResponse = await axios.post(...);
                    // Sau đó set lại token và thực hiện lại request cũ
                } else {
                    // Không có refresh token, đăng xuất người dùng
                    const authStore = useAuthStore.getState();
                    await authStore.logout();
                }
            } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
                // Đăng xuất người dùng nếu không refresh được
                const authStore = useAuthStore.getState();
                await authStore.logout();
            }
        }
        return Promise.reject(error);
    }
);

/**
 * Các hàm tiện ích cho API
 */
export const api = {
    /**
     * GET request
     */
    get: <T>(url: string, config?: AxiosRequestConfig) =>
        apiClient.get<T>(url, config).then((response) => response.data),

    /**
     * POST request
     */
    post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
        apiClient.post<T>(url, data, config).then((response) => response.data),

    /**
     * PUT request
     */
    put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
        apiClient.put<T>(url, data, config).then((response) => response.data),

    /**
     * PATCH request
     */
    patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
        apiClient.patch<T>(url, data, config).then((response) => response.data),

    /**
     * DELETE request
     */
    delete: <T>(url: string, config?: AxiosRequestConfig) =>
        apiClient.delete<T>(url, config).then((response) => response.data),
};

export default apiClient;
