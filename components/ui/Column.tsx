import React from 'react';
import { View, ViewStyle, StyleSheet, ViewProps } from 'react-native';
import { spacing } from '../../constants';

interface ColumnProps extends ViewProps {
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  gap?: keyof typeof spacing | number;
  style?: ViewStyle;
  children: React.ReactNode;
}

/**
 * Component tạo layout cột dọc
 * @param align Căn chỉnh theo chiều ngang
 * @param justify Căn chỉnh theo chiều dọc
 * @param gap Khoảng cách giữa các phần tử
 * @param style Style bổ sung
 * @param children Các phần tử con
 */
const Column: React.FC<ColumnProps> = ({
  align = 'stretch',
  justify = 'flex-start',
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
    column: {
      flexDirection: 'column',
      alignItems: align,
      justifyContent: justify,
      gap: getGap(),
    },
  });

  return (
    <View style={[styles.column, style]} {...rest}>
      {children}
    </View>
  );
};

export default Column; 