import * as yup from 'yup';

// Schema cho form đăng nhập
export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

// Schema cho form đăng ký
export const registerSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

// Schema cho form đặt lại mật khẩu
export const resetPasswordSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
});

// Schema cho form đặt lại mật khẩu mới
export const newPasswordSchema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

// Định nghĩa các kiểu dữ liệu từ schema
export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;
export type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>;
export type NewPasswordFormData = yup.InferType<typeof newPasswordSchema>; 