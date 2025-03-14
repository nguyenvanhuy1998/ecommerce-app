import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Controller, Control, FieldValues, Path, FieldError } from 'react-hook-form';
import Input from './Input';
import { useTheme } from '../../context/ThemeContext';

interface FormInputProps<T extends FieldValues> extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  leftIcon?: React.ComponentProps<typeof Input>['leftIcon'];
  rightIcon?: React.ComponentProps<typeof Input>['rightIcon'];
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  error?: FieldError;
}

function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  error,
  ...rest
}: FormInputProps<T>) {
  const { theme } = useTheme();

  const dynamicStyles = StyleSheet.create({
    container: {
      width: '100%',
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.text,
      marginBottom: 8,
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginTop: 4,
    },
  });

  return (
    <View style={[dynamicStyles.container, containerStyle]}>
      {label && <Text style={dynamicStyles.label}>{label}</Text>}
      
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value }, fieldState: { error: fieldError } }) => (
          <>
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              leftIcon={leftIcon}
              rightIcon={rightIcon}
              onRightIconPress={onRightIconPress}
              error={fieldError?.message || error?.message}
              {...rest}
            />
            {(fieldError?.message || error?.message) && (
              <Text style={dynamicStyles.errorText}>
                {fieldError?.message || error?.message}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
}

export default FormInput; 