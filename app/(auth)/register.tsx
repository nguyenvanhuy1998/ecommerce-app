import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Container, Row, Spacer, ThemeToggleButton } from '../../components/ui';
import { spacing } from '../../constants';

export default function RegisterScreen() {
  const router = useRouter();
  const { theme, isDarkMode } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    // Reset error state
    setError('');

    // Validate inputs
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Show loading indicator
    setIsLoading(true);

    try {
      // In a real app, you would call your registration API here
      // const response = await authService.register(name, email, password);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to the main app
      router.replace('/(tabs)/home');
    } catch (err) {
      // Handle registration error
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Header component với title
  const header = (
    <>
      <Row
        justify="space-between"
        align="center"
        style={styles.headerContainer}
      >
        <Text style={[styles.title, { color: theme.colors.text }]}>Create Account</Text>
        <ThemeToggleButton size={24} />
      </Row>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </>
  );

  return (
    <Container 
      keyboardAware={true}
      scrollable={true}
      padding={spacing.lg}
      header={header}
      contentContainerStyle={styles.contentContainer}
      backgroundColor={theme.colors.background}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.input, color: theme.colors.text }]}
          placeholder="Full Name"
          placeholderTextColor={theme.colors.textTertiary}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.input, color: theme.colors.text }]}
          placeholder="Email Address"
          placeholderTextColor={theme.colors.textTertiary}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.input, color: theme.colors.text }]}
          placeholder="Password"
          placeholderTextColor={theme.colors.textTertiary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={[styles.continueButton, { backgroundColor: theme.colors.primary }]}
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.buttonText}>Create Account</Text>
        )}
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={[styles.normalText, { color: theme.colors.textSecondary }]}>Already have an account? </Text>
        <Link href="/(auth)/login" asChild>
          <TouchableOpacity>
            <Text style={[styles.linkText, { color: theme.colors.primary }]}>Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingTop: spacing.xl,
  },
  headerContainer: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  errorText: {
    color: 'red',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    width: '100%',
  },
  continueButton: {
    borderRadius: 25,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  normalText: {
    fontSize: 14,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
  },
}); 