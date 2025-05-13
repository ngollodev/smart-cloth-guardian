import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, SafeAreaView, Image } from 'react-native';
import { styled } from '../libs/styled';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import ProfileModal from '../components/profile/ProfileModal';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledSwitch = styled(Switch);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledImage = styled(Image);

export default function SettingsScreen() {
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoRetract: true,
    soundAlerts: true,
  });
  
  const { logout, user } = useAuth();
  
  const handleToggleSetting = (setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <StyledView className="p-4 border-b border-gray-200">
        <StyledText className="text-2xl font-bold">Settings</StyledText>
      </StyledView>
      
      <StyledScrollView className="flex-1 p-4">
        {/* User Profile Section */}
        <StyledView className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <StyledText className="text-lg font-bold mb-4">Account</StyledText>
          
          <StyledView className="flex-row items-center mb-4">
            <StyledView className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden mr-3">
              {user?.avatar ? (
                <StyledImage source={{ uri: user.avatar }} style={{ width: '100%', height: '100%' }} />
              ) : (
                <StyledView className="w-full h-full bg-primary items-center justify-center">
                  <StyledText className="text-white font-bold">
                    {user?.name?.charAt(0) || 'U'}
                  </StyledText>
                </StyledView>
              )}
            </StyledView>
            <StyledView>
              <StyledText className="font-bold text-base">{user?.name || 'User'}</StyledText>
              <StyledText className="text-gray-600 text-sm">{user?.email || 'user@example.com'}</StyledText>
            </StyledView>
          </StyledView>
          
          <Button
            title="Edit Profile"
            onPress={() => setProfileModalVisible(true)}
            variant="outline"
            size="sm"
            error={null}
          />
        </StyledView>
        
        {/* App Settings */}
        <StyledView className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <StyledText className="text-lg font-bold mb-4">App Settings</StyledText>
          
          <StyledView className="flex-row justify-between items-center mb-4">
            <StyledText>Enable Notifications</StyledText>
            <StyledSwitch
              value={settings.notifications}
              onValueChange={(value) => handleToggleSetting('notifications', value)}
              trackColor={{ false: '#d1d5db', true: '#9b87f5' }}
            />
          </StyledView>
          
          <StyledView className="flex-row justify-between items-center mb-4">
            <StyledText>Dark Mode</StyledText>
            <StyledSwitch
              value={settings.darkMode}
              onValueChange={(value) => handleToggleSetting('darkMode', value)}
              trackColor={{ false: '#d1d5db', true: '#9b87f5' }}
            />
          </StyledView>
          
          <StyledView className="flex-row justify-between items-center mb-4">
            <StyledText>Auto-Retract on Rain</StyledText>
            <StyledSwitch
              value={settings.autoRetract}
              onValueChange={(value) => handleToggleSetting('autoRetract', value)}
              trackColor={{ false: '#d1d5db', true: '#9b87f5' }}
            />
          </StyledView>
          
          <StyledView className="flex-row justify-between items-center">
            <StyledText>Sound Alerts</StyledText>
            <StyledSwitch
              value={settings.soundAlerts}
              onValueChange={(value) => handleToggleSetting('soundAlerts', value)}
              trackColor={{ false: '#d1d5db', true: '#9b87f5' }}
            />
          </StyledView>
        </StyledView>
        
        {/* Logout Button */}
        <Button
          title="Logout"
          onPress={() => logout()}
          variant="destructive"
          className="mt-2"
          error={null}
        />
        
        <StyledView className="mt-4 items-center">
          <StyledText className="text-gray-500 text-sm">Smart Cloth Guardian v1.0.0</StyledText>
        </StyledView>
      </StyledScrollView>
      
      <ProfileModal
        visible={profileModalVisible}
        onClose={() => setProfileModalVisible(false)}
      />
    </StyledSafeAreaView>
  );
}
