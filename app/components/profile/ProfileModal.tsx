
import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image, ScrollView } from 'react-native';
import { styled } from '../../libs/styled';
import * as ImagePicker from 'expo-image-picker';

import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { UserIcon } from '../icons/TabIcons';
import { useAuth, User } from '../../hooks/useAuth';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);

type ProfileModalProps = {
  visible: boolean;
  onClose: () => void;
};

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function ProfileModal({ visible, onClose }: ProfileModalProps) {
  const { user, updateProfile, logout } = useAuth();
  
  const [formData, setFormData] = React.useState<ProfileFormData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  
  const [profileImage, setProfileImage] = React.useState<string | undefined>(user?.avatar);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  // Reset form when modal opens
  React.useEffect(() => {
    if (visible && user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
      setProfileImage(user.avatar);
    }
  }, [visible, user]);
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
  
  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      await updateProfile({
        ...formData,
        avatar: profileImage,
      });
      onClose();
    } catch (error) {
      console.error('Update profile error:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <StyledView className="flex-1 justify-end bg-black/50">
        <StyledView className="bg-white rounded-t-3xl h-[85%]">
          <StyledView className="flex-row justify-between items-center p-6 border-b border-gray-200">
            <StyledText className="text-xl font-bold">Your Profile</StyledText>
            <StyledTouchableOpacity onPress={onClose} className="p-2">
              <StyledText className="text-primary font-semibold">Close</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
          
          <StyledScrollView className="flex-1 p-6">
            <StyledView className="items-center mb-6">
              <StyledTouchableOpacity 
                onPress={selectImage}
                className="w-24 h-24 rounded-full bg-gray-100 items-center justify-center border-2 border-primary overflow-hidden"
              >
                {profileImage ? (
                  <StyledImage 
                    source={{ uri: profileImage }} 
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <UserIcon size={40} color="#9b87f5" />
                )}
              </StyledTouchableOpacity>
              <StyledText className="text-sm text-gray-500 mt-2">Tap to change profile picture</StyledText>
            </StyledView>
            
            <Input
              label="Full Name"
              value={formData.name}
              onChangeText={(text: string) => handleInputChange('name', text)}
              placeholder="John Doe"
              autoCapitalize="words"
              error={null}
            />
            
            <Input
              label="Email"
              value={formData.email}
              onChangeText={(text: string) => handleInputChange('email', text)}
              placeholder="youremail@example.com"
              keyboardType="email-address"
              disabled
              className="bg-gray-50"
              error={null}
            />
            
            <Input
              label="Phone Number"
              value={formData.phone || ''}
              onChangeText={(text: string) => handleInputChange('phone', text)}
              placeholder="+1 (555) 000-0000"
              keyboardType="phone-pad"
              error={null}
            />
            
            <Input
              label="Address"
              value={formData.address || ''}
              onChangeText={(text: string) => handleInputChange('address', text)}
              placeholder="123 Main Street, City, Country"
              error={null}
            />
            
            <Button
              title="Update Profile"
              onPress={handleUpdateProfile}
              loading={isSubmitting}
              disabled={isSubmitting}
              fullWidth
              className="mt-4"
            />
            
            <Button
              title="Logout"
              onPress={handleLogout}
              variant="outline"
              fullWidth
              className="mt-4"
            />
          </StyledScrollView>
        </StyledView>
      </StyledView>
    </Modal>
  );
}
