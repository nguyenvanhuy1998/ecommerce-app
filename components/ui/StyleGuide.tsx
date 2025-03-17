import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { spacing, typography } from '../../constants';

/**
 * Component hiển thị style guide của ứng dụng
 * Hữu ích cho việc kiểm tra và tham khảo
 */
const StyleGuide = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: spacing.md,
    },
    section: {
      marginBottom: spacing.xl,
    },
    sectionTitle: {
      fontSize: typography.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: spacing.sm,
    },
    colorContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: spacing.md,
    },
    colorItem: {
      width: 80,
      height: 80,
      margin: spacing.xs,
      borderRadius: spacing.borderRadius.medium,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    colorName: {
      fontSize: typography.fontSize.xs,
      color: '#fff',
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    spacingContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: spacing.md,
    },
    spacingItem: {
      marginBottom: spacing.sm,
      marginRight: spacing.sm,
    },
    spacingBox: {
      backgroundColor: theme.colors.primary,
    },
    spacingLabel: {
      fontSize: typography.fontSize.xs,
      color: theme.colors.text,
      marginTop: spacing.xxs,
    },
    typographyItem: {
      marginBottom: spacing.md,
    },
    typographyLabel: {
      fontSize: typography.fontSize.xs,
      color: theme.colors.textSecondary,
      marginBottom: spacing.xxs,
    },
  });

  // Render các mẫu màu
  const renderColors = () => {
    const colors = Object.entries(theme.colors);
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Colors</Text>
        <View style={styles.colorContainer}>
          {colors.map(([name, value]) => (
            <View 
              key={name} 
              style={[styles.colorItem, { backgroundColor: value as string }]}
            >
              <Text style={styles.colorName}>{name}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  // Render các mẫu spacing
  const renderSpacing = () => {
    const spacingValues = [
      { name: 'xxs', value: spacing.xxs },
      { name: 'xs', value: spacing.xs },
      { name: 'sm', value: spacing.sm },
      { name: 'md', value: spacing.md },
      { name: 'lg', value: spacing.lg },
      { name: 'xl', value: spacing.xl },
    ];
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Spacing</Text>
        <View style={styles.spacingContainer}>
          {spacingValues.map(item => (
            <View key={item.name} style={styles.spacingItem}>
              <View 
                style={[
                  styles.spacingBox, 
                  { width: item.value, height: item.value }
                ]}
              />
              <Text style={styles.spacingLabel}>{item.name} ({item.value})</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  // Render các mẫu typography
  const renderTypography = () => {
    const fontSizes = Object.entries(typography.fontSize);
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Typography</Text>
        {fontSizes.map(([name, size]) => (
          <View key={name} style={styles.typographyItem}>
            <Text style={styles.typographyLabel}>{name} ({size}px)</Text>
            <Text style={{ fontSize: size as number, color: theme.colors.text }}>
              The quick brown fox jumps over the lazy dog
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {renderColors()}
      {renderSpacing()}
      {renderTypography()}
    </ScrollView>
  );
};

export default StyleGuide; 