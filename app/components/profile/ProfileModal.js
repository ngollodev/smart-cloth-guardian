
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

export default function ProfileModal({ visible, onClose }) {
  const { user, updateProfile, logout } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    avatar: user?.avatar || null
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSave = async () => {
    setIsSubmitting(true);
    
    try {
      await updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        avatar: formData.avatar
      });
      
      // Success
      onClose();
    } catch (error) {
      console.error('Update profile error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleLogout = async () => {
    await logout();
  };
  
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      setFormData(prev => ({
        ...prev,
        avatar: selectedAsset.uri
      }));
    }
  };
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <StyledView className="flex-1 bg-black/50">
        <StyledView className="flex-1 bg-background mt-20 rounded-t-3xl">
          <StyledView className="p-4 border-b border-gray-200 flex-row justify-between items-center">
            <StyledText className="text-xl font-bold">Your Profile</StyledText>
            <StyledTouchableOpacity onPress={onClose}>
              <StyledText className="text-primary font-medium">Close</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
          
          <StyledScrollView className="p-4">
            <StyledView className="items-center mb-6">
              <StyledTouchableOpacity 
                onPress={pickImage}
                className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-2 border-primary"
              >
                {formData.avatar ? (
                  <Image 
                    source={{ uri: formData.avatar }} 
                    style={{ width: '100%', height: '100%' }} 
                  />
                ) : (
                  <StyledView className="w-full h-full items-center justify-center">
                    <StyledText className="text-gray-500 text-xs">
                      Tap to add photo
                    </StyledText>
                  </StyledView>
                )}
              </StyledTouchableOpacity>
            </StyledView>
            
            <Input
              label="Name"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
              placeholder="Your Name"
              autoCapitalize="words"
              className="mb-4"
            />
            
            <Input
              label="Email"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              placeholder="your.email@example.com"
              keyboardType="email-address"
              disabled={true}
              className="mb-4"
            />
            
            <Input
              label="Phone Number"
              value={formData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              placeholder="Your Phone Number"
              keyboardType="phone-pad"
              className="mb-4"
            />
            
            <Input
              label="Address"
              value={formData.address}
              onChangeText={(text) => handleInputChange('address', text)}
              placeholder="Your Address"
              className="mb-8"
            />
            
            <Button
              title="Save Changes"
              onPress={handleSave}
              loading={isSubmitting}
              disabled={isSubmitting}
              fullWidth
              className="mb-4"
            />
            
            <Button
              title="Logout"
              onPress={handleLogout}
              variant="outline"
              fullWidth
            />
          </StyledScrollView>
        </StyledView>
      </StyledView>
    </Modal>
  );
}
