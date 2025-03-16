import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const CategoriesScreen = () => {
  const { theme } = useTheme();

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 20,
    },
    categoryItem: {
      padding: 20,
      backgroundColor: theme.colors.card,
      borderRadius: 10,
      marginBottom: 15,
    },
    categoryText: {
      fontSize: 18,
      color: theme.colors.text,
      fontWeight: '600',
    },
  });

  // Sample categories
  const categories = [
    'Electronics',
    'Clothing',
    'Home & Kitchen',
    'Books',
    'Sports & Outdoors',
    'Beauty & Personal Care',
    'Toys & Games',
    'Health & Household',
    'Automotive',
    'Pet Supplies',
  ];

  return (
    <ScrollView style={dynamicStyles.container}>
      <View style={dynamicStyles.content}>
        <Text style={dynamicStyles.title}>Categories</Text>
        
        {categories.map((category, index) => (
          <View key={index} style={dynamicStyles.categoryItem}>
            <Text style={dynamicStyles.categoryText}>{category}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CategoriesScreen; 