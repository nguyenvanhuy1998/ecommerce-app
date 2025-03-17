import React from 'react';
import { Stack } from 'expo-router';
import StyleGuide from '../components/ui/StyleGuide';

/**
 * Trang hiển thị style guide của ứng dụng
 */
export default function StyleGuidePage() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Style Guide',
        }}
      />
      <StyleGuide />
    </>
  );
} 