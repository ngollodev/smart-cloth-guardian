import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuth, LoginCredentials } from '../hooks/useAuth';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

function LoginScreen() {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { login } = useAuth();
  
  const handleInputChange = (field: keyof LoginCredentials, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user types
    if (errors[field as 'email' | 'password']) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await login(formData);
      
      if (response.success) {
        navigation.replace('MainApp');
      } else {
        setErrors({ email: response.message || 'Login failed' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ email: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <StyledView className="flex-1 bg-background p-6 justify-center">
      <StyledView className="items-center mb-8">
        <StyledView className="w-20 h-20 bg-primary rounded-full items-center justify-center mb-4">
          <StyledText className="text-3xl font-bold text-white">CG</StyledText>
        </StyledView>
        <StyledText className="text-3xl font-bold text-center">Smart Cloth Guardian</StyledText>
        <StyledText className="text-base text-gray-600 text-center mt-1">
          Your intelligent clothesline protection system
        </StyledText>
      </StyledView>
      
      <StyledView className="bg-white rounded-xl p-6 shadow-md">
        <StyledText className="text-2xl font-bold mb-6">Welcome Back</StyledText>
        
        <Input
          label="Email"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          placeholder="youremail@example.com"
          keyboardType="email-address"
          error={errors.email}
          autoCapitalize="none"
        />
        
        <Input
          label="Password"
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
          placeholder="••••••••"
          secureTextEntry
          error={errors.password}
        />
        
        <Button
          title="Sign In"
          onPress={handleLogin}
          loading={isSubmitting}
          disabled={isSubmitting}
          fullWidth
          className="mt-2 mb-4"
        />
        
        <StyledView className="flex-row justify-center mt-2">
          <StyledText className="text-gray-600 mr-1">Don't have an account?</StyledText>
          <StyledTouchableOpacity onPress={() => navigation.navigate('Register')}>
            <StyledText className="text-primary font-medium">Register</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </StyledView>
  );
}

export default LoginScreen;
