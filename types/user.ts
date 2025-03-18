/**
 * Thông tin của người dùng
 */
export interface User {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
}
/**
 * Trạng thái xác thực
 */
export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}
/**
 * Dữ liệu đăng nhập trả về từ API
 */
export interface AuthResponse {
    user: User;
    token: string;
}
/**
 * Dữ liệu đăng ký người dùng
 */
export interface RegisterData {
    name: string;
    email: string;
    password: string;
}
/**
 * Loại provider đăng nhập xã hội
 */
export type SocialProvider = "apple" | "google" | "facebook";
