import React from 'react';
import { View, ViewStyle } from 'react-native';
import { spacing } from '../../constants';

// Loại bỏ các thuộc tính không phải số từ spacing
type SpacingKeys = Exclude<
  keyof typeof spacing,
  'iconSize' | 'borderRadius'
>;

interface SpacerProps {
  size?: SpacingKeys | number;
  horizontal?: boolean;
  flex?: number;
  style?: ViewStyle;
}

/**
 * Component tạo khoảng cách giữa các phần tử
 * @param size Kích thước khoảng cách (từ spacing hoặc số)
 * @param horizontal Hướng khoảng cách (ngang hoặc dọc)
 * @param flex Giá trị flex (nếu cần)
 * @param style Style bổ sung
 */
const Spacer: React.FC<SpacerProps> = ({
  size = 'md',
  horizontal = false,
  flex,
  style,
}) => {
  // Xác định kích thước
  const getSize = (): number => {
    if (typeof size === 'number') {
      return size;
    }
    
    return spacing[size] as number;
  };

  const spacerSize = getSize();
  
  // Tạo style dựa trên hướng
  const spacerStyle: ViewStyle = {
    ...(horizontal
      ? { width: spacerSize, height: 'auto' }
      : { height: spacerSize, width: 'auto' }),
    ...(flex !== undefined ? { flex } : {}),
    ...style,
  };

  return <View style={spacerStyle} />;
};

export default Spacer; 