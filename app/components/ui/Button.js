import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledActivityIndicator = styled(ActivityIndicator);

const variants = {
  default: 'bg-primary',
  outline: 'bg-transparent border border-primary',
  secondary: 'bg-secondary',
  destructive: 'bg-red-500',
};

const textColors = {
  default: 'text-white',
  outline: 'text-primary',
  secondary: 'text-gray-700',
  destructive: 'text-white',
};

export function Button({
  title,
  onPress,
  variant = 'default',
  disabled = false,
  loading = false,
  fullWidth = false,
  size = 'default',
  className = '',
  error = null,
  ...props
}) {
  const sizeClasses = {
    sm: 'py-2 px-3',
    default: 'py-3 px-4',
    lg: 'py-4 px-6',
  };

  return (
    <StyledTouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`${variants[variant]} rounded-lg ${sizeClasses[size]} ${
        fullWidth ? 'w-full' : ''
      } ${disabled ? 'opacity-50' : ''} items-center justify-center ${className}`}
      {...props}
    >
      {loading ? (
        <StyledActivityIndicator
          color={variant === 'outline' ? '#9B87F5' : '#FFFFFF'}
          size="small"
        />
      ) : (
        <StyledText
          className={`font-medium text-center ${textColors[variant]}`}
        >
          {title}
        </StyledText>
      )}
    </StyledTouchableOpacity>
  );
}

export default Button;
