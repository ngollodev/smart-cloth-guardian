import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

export function Input({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry, 
  keyboardType, 
  error,
  className,
  autoCapitalize = 'none',
  disabled = false
}) {
  return (
    <StyledView className="mb-4">
      <StyledText className="text-gray-700 mb-1">{label}</StyledText>
      <StyledTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        className={`bg-white border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 ${disabled ? 'bg-gray-100 text-gray-500' : ''} ${className || ''}`}
        autoCapitalize={autoCapitalize}
        editable={!disabled}
      />
      {error ? (
        <StyledText className="text-red-500 text-sm mt-1">{error}</StyledText>
      ) : null}
    </StyledView>
  );
}

export default Input;
