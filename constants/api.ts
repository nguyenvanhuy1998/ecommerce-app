/**
 * API Configuration
 */
// API Base URL - thay đổi URL này theo môi trường của bạn
export const API_BASE_URL = "https://api.yourdomain.com";
// API timeout (15 seconds)
export const API_TIMEOUT = 15000;

// API Endpoints
export const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        LOGOUT: "/auth/logout",
        SOCIAL_LOGIN: (provider: string) => `/auth/social/${provider}`,
        REFRESH_TOKEN: "/auth/refresh-token",
        FORGOT_PASSWORD: "/auth/forgot-password",
        RESET_PASSWORD: "/auth/reset-password",
    },

    // User endpoints
    USER: {
        PROFILE: "/users/profile",
        UPDATE_PROFILE: "/users/profile",
        CHANGE_PASSWORD: "/users/change-password",
        UPLOAD_AVATAR: "/users/avatar",
    },

    // Product endpoints
    PRODUCT: {
        LIST: "/products",
        DETAIL: (id: string) => `/products/${id}`,
        CATEGORIES: "/categories",
    },

    // Cart endpoints
    CART: {
        GET: "/cart",
        ADD: "/cart/add",
        UPDATE: "/cart/update",
        REMOVE: "/cart/remove",
        CLEAR: "/cart/clear",
    },

    // Order endpoints
    ORDER: {
        LIST: "/orders",
        DETAIL: (id: string) => `/orders/${id}`,
        CREATE: "/orders",
        CANCEL: (id: string) => `/orders/${id}/cancel`,
    },
};
// Auth storage keys
export const AUTH_STORAGE_KEYS = {
    TOKEN: "auth_token",
    USER: "auth_user",
    REFRESH_TOKEN: "auth_refresh_token",
};

// API Headers
export const API_HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json",
};
