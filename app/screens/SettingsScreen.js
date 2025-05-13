import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { styled } from 'nativewind';
import { useAuth } from '../hooks/useAuth';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledSwitch = styled(Switch);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

export default function SettingsScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoRetract, setAutoRetract] = useState(true);
  
  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };
  
  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <StyledView className="px-4 py-4">
        <StyledText className="text-2xl font-bold">Settings</StyledText>
        <StyledText className="text-muted">Customize your experience</StyledText>
      </StyledView>
      
      <StyledScrollView className="flex-1 px-4">
        {/* Profile Card */}
        <Card className="mb-4">
          <CardContent>
            <StyledView className="flex-row items-center mb-4">
              {user?.avatar ? (
                <StyledImage 
                  source={{ uri: user.avatar }} 
                  className="w-16 h-16 rounded-full" 
                />
              ) : (
                <StyledView className="w-16 h-16 rounded-full bg-gray-300 items-center justify-center">
                  <StyledText className="text-lg font-bold text-gray-500">
                    {user?.name?.charAt(0) || 'U'}
                  </StyledText>
                </StyledView>
              )}
              
              <StyledView className="ml-4 flex-1">
                <StyledText className="font-bold text-lg">{user?.name || 'User'}</StyledText>
                <StyledText className="text-muted">{user?.email || 'user@example.com'}</StyledText>
              </StyledView>
              
              <StyledTouchableOpacity className="bg-gray-100 rounded-full p-2">
                <StyledText className="text-primary font-medium">Edit</StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </CardContent>
        </Card>
        
        {/* App Settings */}
        <Card className="mb-4">
          <CardHeader title="App Settings" />
          <CardContent>
            <StyledView className="mb-4 flex-row justify-between items-center">
              <StyledText>Push Notifications</StyledText>
              <StyledSwitch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: "#E2E8F0", true: "#9b87f5" }}
                thumbColor="#ffffff"
              />
            </StyledView>
            
            <StyledView className="mb-4 flex-row justify-between items-center">
              <StyledText>Dark Mode</StyledText>
              <StyledSwitch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: "#E2E8F0", true: "#9b87f5" }}
                thumbColor="#ffffff"
              />
            </StyledView>
          </CardContent>
        </Card>
        
        {/* System Settings */}
        <Card className="mb-4">
          <CardHeader title="System Settings" />
          <CardContent>
            <StyledView className="mb-4 flex-row justify-between items-center">
              <StyledText>Auto-retract on Rain</StyledText>
              <StyledSwitch
                value={autoRetract}
                onValueChange={setAutoRetract}
                trackColor={{ false: "#E2E8F0", true: "#9b87f5" }}
                thumbColor="#ffffff"
              />
            </StyledView>
            
            <StyledView className="mb-4">
              <StyledTouchableOpacity className="py-2 flex-row justify-between">
                <StyledText>Device Information</StyledText>
                <StyledText className="text-muted">></StyledText>
              </StyledTouchableOpacity>
            </StyledView>
            
            <StyledView className="mb-4">
              <StyledTouchableOpacity className="py-2 flex-row justify-between">
                <StyledText>Sensor Calibration</StyledText>
                <StyledText className="text-muted">></StyledText>
              </StyledTouchableOpacity>
            </StyledView>
            
            <StyledView>
              <StyledTouchableOpacity className="py-2 flex-row justify-between">
                <StyledText>Network Settings</StyledText>
                <StyledText className="text-muted">></StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </CardContent>
        </Card>
        
        {/* Support & About */}
        <Card className="mb-4">
          <CardHeader title="Support & About" />
          <CardContent>
            <StyledView className="mb-4">
              <StyledTouchableOpacity className="py-2 flex-row justify-between">
                <StyledText>Help Center</StyledText>
                <StyledText className="text-muted">></StyledText>
              </StyledTouchableOpacity>
            </StyledView>
            
            <StyledView className="mb-4">
              <StyledTouchableOpacity className="py-2 flex-row justify-between">
                <StyledText>Privacy Policy</StyledText>
                <StyledText className="text-muted">></StyledText>
              </StyledTouchableOpacity>
            </StyledView>
            
            <StyledView className="mb-4">
              <StyledTouchableOpacity className="py-2 flex-row justify-between">
                <StyledText>Terms of Service</StyledText>
                <StyledText className="text-muted">></StyledText>
              </StyledTouchableOpacity>
            </StyledView>
            
            <StyledView>
              <StyledTouchableOpacity className="py-2 flex-row justify-between">
                <StyledText>About</StyledText>
                <StyledText className="text-muted">v1.0.0</StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </CardContent>
        </Card>
        
        {/* Logout Button */}
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="destructive"
          fullWidth
          className="mb-8"
        />
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}
