import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { spacing, typography } from '../constants';
import { Row, Column, Spacer, SocialButton } from '../components/ui';

/**
 * Trang ví dụ hiển thị cách sử dụng các component layout
 */
export default function LayoutExamplePage() {
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
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: spacing.borderRadius.medium,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    box: {
      width: 50,
      height: 50,
      backgroundColor: theme.colors.primary,
      borderRadius: spacing.borderRadius.small,
      justifyContent: 'center',
      alignItems: 'center',
    },
    boxText: {
      color: '#fff',
      fontWeight: '600',
    },
  });

  // Tạo một mảng các box để hiển thị
  const boxes = [1, 2, 3, 4, 5];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Layout Examples',
        }}
      />
      <ScrollView style={styles.container}>
        {/* Ví dụ về Row */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Row Component</Text>
          
          <View style={styles.card}>
            <Text>Row với gap="md":</Text>
            <Spacer size="sm" />
            <Row gap="md">
              {boxes.slice(0, 3).map(num => (
                <View key={num} style={styles.box}>
                  <Text style={styles.boxText}>{num}</Text>
                </View>
              ))}
            </Row>
            
            <Spacer size="md" />
            
            <Text>Row với justify="space-between":</Text>
            <Spacer size="sm" />
            <Row justify="space-between">
              {boxes.slice(0, 3).map(num => (
                <View key={num} style={styles.box}>
                  <Text style={styles.boxText}>{num}</Text>
                </View>
              ))}
            </Row>
            
            <Spacer size="md" />
            
            <Text>Row với wrap=true:</Text>
            <Spacer size="sm" />
            <Row gap="sm" wrap>
              {boxes.map(num => (
                <View key={num} style={styles.box}>
                  <Text style={styles.boxText}>{num}</Text>
                </View>
              ))}
            </Row>
          </View>
        </View>
        
        {/* Ví dụ về Column */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Column Component</Text>
          
          <View style={styles.card}>
            <Text>Column với gap="sm":</Text>
            <Spacer size="sm" />
            <Column gap="sm">
              {boxes.slice(0, 3).map(num => (
                <View key={num} style={styles.box}>
                  <Text style={styles.boxText}>{num}</Text>
                </View>
              ))}
            </Column>
          </View>
        </View>
        
        {/* Ví dụ về Spacer */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Spacer Component</Text>
          
          <View style={styles.card}>
            <Text>Spacer giữa các phần tử:</Text>
            <View style={styles.box}>
              <Text style={styles.boxText}>1</Text>
            </View>
            <Spacer size="md" />
            <View style={styles.box}>
              <Text style={styles.boxText}>2</Text>
            </View>
            <Spacer size="lg" />
            <View style={styles.box}>
              <Text style={styles.boxText}>3</Text>
            </View>
          </View>
        </View>
        
        {/* Ví dụ về SocialButton */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SocialButton Component</Text>
          
          <SocialButton provider="google" />
          <SocialButton provider="apple" />
          <SocialButton provider="facebook" />
        </View>
      </ScrollView>
    </>
  );
} 