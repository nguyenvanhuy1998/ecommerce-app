import React from 'react';
import { View, ViewStyle, StyleSheet, ViewProps } from 'react-native';
import { spacing } from '../../constants';

interface RowProps extends ViewProps {
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  wrap?: boolean;
  gap?: keyof typeof spacing | number;
  style?: ViewStyle;
  children: React.ReactNode;
}

/**
 * Component tạo layout hàng ngang
 * @param align Căn chỉnh theo chiều dọc
 * @param justify Căn chỉnh theo chiều ngang
 * @param wrap Cho phép các phần tử xuống dòng
 * @param gap Khoảng cách giữa các phần tử
 * @param style Style bổ sung
 * @param children Các phần tử con
 */
const Row: React.FC<RowProps> = ({
  align = 'center',
  justify = 'flex-start',
  wrap = false,
  gap,
  style,
  children,
  ...rest
}) => {
  // Xác định khoảng cách
  const getGap = (): number | undefined => {
    if (gap === undefined) {
      return undefined;
    }
    
    if (typeof gap === 'number') {
      return gap;
    }
    
    return spacing[gap] as number;
  };

  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap ? 'wrap' : 'nowrap',
      gap: getGap(),
    },
  });

  return (
    <View style={[styles.row, style]} {...rest}>
      {children}
    </View>
  );
};

export default Row; 