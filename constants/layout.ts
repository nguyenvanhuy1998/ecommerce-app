import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

/**
 * Hệ thống layout nhất quán cho toàn bộ ứng dụng
 */
export const layout = {
  // Kích thước màn hình
  window: {
    width,
    height,
  },
  
  // Tỷ lệ màn hình
  isSmallDevice: width < 375,
  
  // Các giá trị layout phổ biến
  maxContentWidth: 500,
  contentPadding: 16,
  
  // Các giá trị layout cho component
  card: {
    minHeight: 100,
    borderRadius: 16,
  },
  
  // Các giá trị layout cho navigation
  header: {
    height: 56,
  },
  tabBar: {
    height: 56,
  },
  
  // Các giá trị layout cho form
  form: {
    inputHeight: 56,
    buttonHeight: 56,
    gap: 16,
  },
};

/**
 * Hàm tiện ích để tính toán phần trăm chiều rộng màn hình
 * @param percentage Phần trăm chiều rộng (0-100)
 * @returns Giá trị chiều rộng tính bằng pixel
 */
export const getWidthPercentage = (percentage: number): number => {
  return (percentage / 100) * width;
};

/**
 * Hàm tiện ích để tính toán phần trăm chiều cao màn hình
 * @param percentage Phần trăm chiều cao (0-100)
 * @returns Giá trị chiều cao tính bằng pixel
 */
export const getHeightPercentage = (percentage: number): number => {
  return (percentage / 100) * height;
};

export default layout; 