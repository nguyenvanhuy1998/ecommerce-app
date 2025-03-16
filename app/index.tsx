import { useAuth } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';

export default function IndexScreen() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // Use Redirect component for declarative navigation
  return <Redirect href={isAuthenticated ? "/(tabs)/home" : "/(auth)/login"} />;
}
