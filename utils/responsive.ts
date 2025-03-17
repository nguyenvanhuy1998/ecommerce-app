import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// Kích thước thiết kế cơ sở (dựa trên iPhone 11)
const baseWidth = 375;
const baseHeight = 812;

/**
 * Tính toán tỷ lệ theo chiều rộng màn hình
 * @param size Kích thước trên thiết kế cơ sở
 * @returns Kích thước đã được scale theo chiều rộng
 */
export const scaleWidth = (size: number): number => {
  const scale = width / baseWidth;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Tính toán tỷ lệ theo chiều cao màn hình
 * @param size Kích thước trên thiết kế cơ sở
 * @returns Kích thước đã được scale theo chiều cao
 */
export const scaleHeight = (size: number): number => {
  const scale = height / baseHeight;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Tính toán tỷ lệ với hệ số điều chỉnh
 * @param size Kích thước trên thiết kế cơ sở
 * @param factor Hệ số điều chỉnh (0-1), mặc định là 0.5
 * @returns Kích thước đã được scale với hệ số điều chỉnh
 */
export const moderateScale = (size: number, factor: number = 0.5): number => {
  const scale = width / baseWidth;
  const newSize = size + (scale - 1) * size * factor;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Tính toán font size với responsive
 * @param size Kích thước font trên thiết kế cơ sở
 * @returns Kích thước font đã được scale
 */
export const scaleFontSize = (size: number): number => {
  return moderateScale(size, 0.3);
};

/**
 * Kiểm tra xem thiết bị có phải là tablet không
 * @returns true nếu là tablet, false nếu là điện thoại
 */
export const isTablet = (): boolean => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = width * pixelDensity;
  const adjustedHeight = height * pixelDensity;
  
  return (
    Math.sqrt(Math.pow(adjustedWidth, 2) + Math.pow(adjustedHeight, 2)) >= 1000
  );
};

export default {
  scaleWidth,
  scaleHeight,
  moderateScale,
  scaleFontSize,
  isTablet,
}; 