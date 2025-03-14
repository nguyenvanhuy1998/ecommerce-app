import React from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import SocialButton from '../ui/SocialButton';

interface SocialLoginSectionProps {
  onAppleLogin?: () => void;
  onGoogleLogin?: () => void;
  onFacebookLogin?: () => void;
  style?: ViewStyle;
}

export default function SocialLoginSection({
  onAppleLogin,
  onGoogleLogin,
  onFacebookLogin,
  style,
}: SocialLoginSectionProps) {
  const { theme } = useTheme();

  const dynamicStyles = StyleSheet.create({
    container: {
      width: '100%',
      gap: 12,
      marginTop: 20,
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.divider,
    },
  });

  return (
    <View style={[dynamicStyles.container, style]}>
      <View style={dynamicStyles.dividerContainer}>
        <View style={dynamicStyles.divider} />
      </View>

      <SocialButton
        provider="apple"
        onPress={onAppleLogin}
        disabled={!onAppleLogin}
      />

      <SocialButton
        provider="google"
        onPress={onGoogleLogin}
        disabled={!onGoogleLogin}
      />

      <SocialButton
        provider="facebook"
        onPress={onFacebookLogin}
        disabled={!onFacebookLogin}
      />
    </View>
  );
} 