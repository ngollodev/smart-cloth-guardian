
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { styled } from '../libs/styled';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';

import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth, RegisterData } from '../hooks/useAuth';
import { UserIcon } from '../components/icons/TabIcons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);

export default function RegisterScreen() {
  const [formData, setFormData] = useState<RegisterData & { passwordConfirmation: string }>({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    phone: '',
    address: ''
  });
  
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { register } = useAuth();
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };
  
  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to upload a profile picture.');
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    
    if (!result.canceled && result.assets && result.assets[0]?.uri) {
      setProfileImage(result.assets[0].uri);
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.passwordConfirmation) {
      newErrors.passwordConfirmation = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleRegister = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would upload the image to a server here
      // For now, we'll just pass the local URI
      const registrationData = {
        ...formData,
        avatar: profileImage || undefined,
      };
      
      const response = await register(registrationData);
      
      if (response.success) {
        navigation.replace('MainApp');
      } else {
        setErrors({ general: response.message || 'Registration failed' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <StyledScrollView className="flex-1 bg-background">
      <StyledView className="p-6">
        <StyledView className="items-center mb-8">
          <StyledView className="w-20 h-20 bg-primary rounded-full items-center justify-center mb-4">
            <StyledText className="text-3xl font-bold text-white">CG</StyledText>
          </StyledView>
          <StyledText className="text-3xl font-bold text-center">Smart Cloth Guardian</StyledText>
          <StyledText className="text-base text-gray-600 text-center mt-1">
            Create your account to get started
          </StyledText>
        </StyledView>
        
        <StyledView className="bg-white rounded-xl p-6 shadow-md mb-6">
          <StyledText className="text-2xl font-bold mb-6">Create Account</StyledText>
          
          <StyledView className="items-center mb-6">
            <StyledTouchableOpacity 
              onPress={selectImage}
              className="w-24 h-24 rounded-full bg-gray-100 items-center justify-center border-2 border-primary overflow-hidden"
            >
              {profileImage ? (
                <StyledImage 
                  source={{ uri: profileImage }} 
                  className="w-full h-full"
                />
              ) : (
                <UserIcon size={40} color="#9b87f5" />
              )}
            </StyledTouchableOpacity>
            <StyledText className="text-sm text-gray-500 mt-2">Tap to select profile picture</StyledText>
          </StyledView>
          
          {errors.general && (
            <StyledView className="bg-red-50 p-3 rounded-lg mb-4">
              <StyledText className="text-destructive">{errors.general}</StyledText>
            </StyledView>
          )}
          
          <Input
            label="Full Name"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            placeholder="John Doe"
            error={errors.name}
            autoCapitalize="words"
          />
          
          <Input
            label="Email"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            placeholder="youremail@example.com"
            keyboardType="email-address"
            error={errors.email}
          />
          
          <Input
            label="Password"
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            placeholder="••••••••"
            secureTextEntry
            error={errors.password}
          />
          
          <Input
            label="Confirm Password"
            value={formData.passwordConfirmation}
            onChangeText={(text) => handleInputChange('passwordConfirmation', text)}
            placeholder="••••••••"
            secureTextEntry
            error={errors.passwordConfirmation}
          />
          
          <Input
            label="Phone Number (Optional)"
            value={formData.phone || ''}
            onChangeText={(text) => handleInputChange('phone', text)}
            placeholder="+1 (555) 000-0000"
            keyboardType="phone-pad"
          />
          
          <Input
            label="Address (Optional)"
            value={formData.address || ''}
            onChangeText={(text) => handleInputChange('address', text)}
            placeholder="123 Main Street, City, Country"
          />
          
          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={isSubmitting}
            disabled={isSubmitting}
            fullWidth
            className="mt-2 mb-4"
          />
          
          <StyledView className="flex-row justify-center mt-2">
            <StyledText className="text-gray-600 mr-1">Already have an account?</StyledText>
            <StyledTouchableOpacity onPress={() => navigation.navigate('Login')}>
              <StyledText className="text-primary font-medium">Sign In</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledScrollView>
  );
}
