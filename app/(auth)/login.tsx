import React, { useState } from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import LoginForm from '../../components/auth/LoginForm';
import AuthFooter from '../../components/auth/AuthFooter';
import SocialLoginSection from '../../components/auth/SocialLoginSection';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const { login, loginWithSocial, isLoading } = useAuth();
  const [error, setError] = useState('');

  const handleLogin = async (email: string, password: string) => {
    // Reset error state
    setError('');
    
    try {
      // Call auth context login function
      await login(email, password);
      // Navigation is handled by the AuthContext
    } catch (err) {
      // Handle login error
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', err);
      throw err;
    }
  };

  const handleSocialLogin = async (provider: 'apple' | 'google' | 'facebook') => {
    // Reset error state
    setError('');
    
    try {
      // Call auth context social login function
      await loginWithSocial(provider);
      // Navigation is handled by the AuthContext
    } catch (err) {
      // Handle login error
      setError(`Failed to login with ${provider}. Please try again.`);
      console.error(`${provider} login error:`, err);
    }
  };

  return (
    <AuthLayout title="Sign in" error={error}>
      <LoginForm 
        onLogin={handleLogin}
        isLoading={isLoading}
      />

      <AuthFooter
        prompt="Don't have an Account?"
        linkText="Create One"
        linkHref="/(auth)/register"
      />

      <SocialLoginSection
        onAppleLogin={() => handleSocialLogin('apple')}
        onGoogleLogin={() => handleSocialLogin('google')}
        onFacebookLogin={() => handleSocialLogin('facebook')}
      />
    </AuthLayout>
  );
} 