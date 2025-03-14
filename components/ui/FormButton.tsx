import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import Button from './Button';

interface FormButtonProps<T extends FieldValues> {
  title: string;
  onPress: () => void;
  formMethods: UseFormReturn<T>;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disableIfInvalid?: boolean;
}

function FormButton<T extends FieldValues>({
  title,
  onPress,
  formMethods,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  style,
  textStyle,
  disableIfInvalid = true,
}: FormButtonProps<T>) {
  const { formState } = formMethods;
  const { isSubmitting, isValid, isDirty } = formState;

  // Disable button if form is invalid and disableIfInvalid is true
  const isDisabled = disabled || loading || (disableIfInvalid && (!isValid || !isDirty));

  return (
    <Button
      title={title}
      onPress={onPress}
      loading={loading || isSubmitting}
      disabled={isDisabled}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      style={style}
      textStyle={textStyle}
    />
  );
}

export default FormButton; 