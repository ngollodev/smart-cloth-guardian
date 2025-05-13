import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    phone: '',
    address: '',
  });
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace('MainApp');
    }
  }, [isAuthenticated, navigation]);

  const updateForm = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    // Basic validation
    if (!form.name || !form.email || !form.password) {
      setError('Name, email and password are required');
      return;
    }
    
    if (form.password !== form.passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const response = await register({
        ...form,
        avatar
      });
      
      if (!response.success) {
        setError(response.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred during registration');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <StyledScrollView className="flex-1 px-4 py-6">
        <StyledView className="items-center mb-6">
          <StyledView className="w-16 h-16 bg-primary rounded-full items-center justify-center mb-4">
            <StyledText className="text-white text-2xl font-bold">CG</StyledText>
          </StyledView>
          <StyledText className="text-2xl font-bold text-center">Smart Cloth Guardian</StyledText>
          <StyledText className="text-muted text-center mt-1">Your intelligent clothesline protection system</StyledText>
        </StyledView>
        
        <Card className="w-full mb-6">
          <CardHeader title="Create an Account" subtitle="Enter your details to get started" />
          
          <CardContent>
            <StyledView className="items-center mb-6">
              <StyledTouchableOpacity 
                onPress={pickImage}
                className="w-24 h-24 rounded-full bg-gray-200 items-center justify-center overflow-hidden"
              >
                {avatar ? (
                  <StyledImage source={{ uri: avatar }} className="w-full h-full" />
                ) : (
                  <StyledText className="text-gray-500 text-5xl">+</StyledText>
                )}
              </StyledTouchableOpacity>
              <StyledText className="text-muted mt-2">Tap to add a profile photo</StyledText>
            </StyledView>
            
            <Input
              label="Full Name"
              value={form.name}
              onChangeText={text => updateForm('name', text)}
              placeholder="John Doe"
              autoCapitalize="words"
            />
            
            <Input
              label="Email"
              value={form.email}
              onChangeText={text => updateForm('email', text)}
              placeholder="youremail@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <Input
              label="Password"
              value={form.password}
              onChangeText={text => updateForm('password', text)}
              placeholder="••••••••"
              secureTextEntry
            />
            
            <Input
              label="Confirm Password"
              value={form.passwordConfirmation}
              onChangeText={text => updateForm('passwordConfirmation', text)}
              placeholder="••••••••"
              secureTextEntry
            />
            
            <Input
              label="Phone Number (Optional)"
              value={form.phone}
              onChangeText={text => updateForm('phone', text)}
              placeholder="+1 (555) 000-0000"
              keyboardType="phone-pad"
            />
            
            <Input
              label="Address (Optional)"
              value={form.address}
              onChangeText={text => updateForm('address', text)}
              placeholder="123 Main Street, City, Country"
            />
            
            {error ? (
              <StyledText className="text-destructive mb-4">{error}</StyledText>
            ) : null}
            
            <Button
              title={isLoading ? "Creating Account..." : "Create Account"}
              onPress={handleRegister}
              disabled={isLoading}
              loading={isLoading}
              fullWidth
            />
          </CardContent>
          
          <CardFooter>
            <StyledView className="items-center">
              <StyledText className="text-muted">
                Already have an account?{' '}
                <StyledTouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <StyledText className="text-primary font-medium">Sign in</StyledText>
                </StyledTouchableOpacity>
              </StyledText>
            </StyledView>
          </CardFooter>
        </Card>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}
