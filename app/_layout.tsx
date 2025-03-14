import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="product/[id]" 
          options={{ 
            title: 'Product Details',
          }} 
        />
        <Stack.Screen 
          name="checkout" 
          options={{ 
            title: 'Checkout',
          }} 
        />
        <Stack.Screen 
          name="orders" 
          options={{ 
            title: 'My Orders',
          }} 
        />
      </Stack>
    </SafeAreaProvider>
  );
}
