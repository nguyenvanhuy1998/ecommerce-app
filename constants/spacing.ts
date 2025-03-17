/**
 * Hệ thống spacing nhất quán cho toàn bộ ứng dụng
 * Sử dụng hệ số 4 làm đơn vị cơ bản
 */

export const spacing = {
  // Spacing cơ bản
  none: 0,
  tiny: 2,
  xxxs: 4,
  xxs: 8,
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
  huge: 64,
  massive: 80,

  // Spacing đặc biệt
  screenPadding: 16,
  sectionPadding: 24,
  cardPadding: 16,
  inputHeight: 56,
  buttonHeight: 56,
  iconSize: {
    small: 16,
    medium: 24,
    large: 32,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
    pill: 25,
    circle: 9999,
  },
};

/**
 * Hàm tiện ích để tính toán spacing theo tỷ lệ
 * @param multiplier Hệ số nhân với đơn vị cơ bản (4)
 * @returns Giá trị spacing
 */
export const getSpacing = (multiplier: number): number => {
  return multiplier * 4;
};

export default spacing; 