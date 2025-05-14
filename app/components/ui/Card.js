import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

export function Card({ children, className = '' }) {
  return (
    <StyledView className={`bg-white rounded-xl shadow-sm p-4 ${className}`}>
      {children}
    </StyledView>
  );
}

export function CardHeader({ children, title, subtitle, className = '' }) {
  return (
    <StyledView className={`mb-3 ${className}`}>
      {title && <StyledText className="text-lg font-bold">{title}</StyledText>}
      {subtitle && <StyledText className="text-sm text-muted">{subtitle}</StyledText>}
      {children}
    </StyledView>
  );
}

export function CardContent({ children, className = '' }) {
  return (
    <StyledView className={className}>
      {children}
    </StyledView>
  );
}

export function CardFooter({ children, className = '' }) {
  return (
    <StyledView className={`mt-3 pt-3 border-t border-border ${className}`}>
      {children}
    </StyledView>
  );
}

// Create a default export combining all components
const CardComponents = {
  Card,
  CardHeader,
  CardContent,
  CardFooter
};

export default CardComponents;
