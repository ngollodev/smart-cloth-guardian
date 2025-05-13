import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Image } from 'react-native';
import { styled } from '../libs/styled';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';
import { useSystem } from '../hooks/useSystem';
import { Button } from '../components/ui/Button';
import { UserIcon } from '../components/icons/TabIcons';
import ProfileModal from '../components/profile/ProfileModal';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledImage = styled(Image);

export default function DashboardScreen() {
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const { user } = useAuth();
  const { 
    systemStatus,
    weatherData,
    loading,
    refreshingData,
    refreshData,
    controlSystem
  } = useSystem();

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshData();
    setRefreshing(false);
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <StyledView className="flex-row justify-between items-center p-4 border-b border-gray-200">
        <StyledText className="text-2xl font-bold">Smart Cloth Guardian</StyledText>
        <StyledTouchableOpacity 
          onPress={() => setProfileModalVisible(true)}
          className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center overflow-hidden"
        >
          {user?.avatar ? (
            <StyledView className="w-full h-full">
              <StyledImage source={{ uri: user.avatar }} style={{ width: '100%', height: '100%' }} />
            </StyledView>
          ) : (
            <UserIcon size={20} color="#9b87f5" />
          )}
        </StyledTouchableOpacity>
      </StyledView>

      <StyledScrollView 
        className="flex-1 p-4"
        refreshControl={
          <RefreshControl refreshing={refreshing || refreshingData} onRefresh={onRefresh} />
        }
      >
        {/* System Status Card */}
        <StyledView className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <StyledText className="text-lg font-bold mb-2">System Status</StyledText>
          <StyledView className="flex-row justify-between items-center">
            <StyledText className="text-gray-600">Clothesline:</StyledText>
            <StyledView className={`py-1 px-3 rounded-full ${systemStatus.clotheslineExtended ? 'bg-green-100' : 'bg-blue-100'}`}>
              <StyledText className={systemStatus.clotheslineExtended ? 'text-green-800' : 'text-blue-800'}>
                {systemStatus.clotheslineExtended ? 'Extended' : 'Retracted'}
              </StyledText>
            </StyledView>
          </StyledView>
          
          <StyledView className="flex-row justify-between items-center mt-2">
            <StyledText className="text-gray-600">Battery:</StyledText>
            <StyledView className="flex-row items-center">
              <StyledView className={`h-2 w-16 rounded-full ${
                systemStatus.batteryLevel > 70 ? 'bg-green-500' :
                systemStatus.batteryLevel > 30 ? 'bg-yellow-500' : 'bg-red-500'
              }`}>
                <StyledView 
                  className="h-full bg-gray-200 rounded-full" 
                  style={{ width: `${100 - systemStatus.batteryLevel}%` }} 
                />
              </StyledView>
              <StyledText className="ml-2">{systemStatus.batteryLevel}%</StyledText>
            </StyledView>
          </StyledView>
          
          <StyledView className="flex-row justify-between items-center mt-2">
            <StyledText className="text-gray-600">Connection:</StyledText>
            <StyledView className="flex-row items-center">
              <StyledView className={`w-3 h-3 rounded-full ${
                systemStatus.connectionStatus === 'online' ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <StyledText className="ml-2 capitalize">{systemStatus.connectionStatus}</StyledText>
            </StyledView>
          </StyledView>
        </StyledView>
        
        {/* Weather Card */}
        <StyledView className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <StyledText className="text-lg font-bold mb-2">Weather</StyledText>
          <StyledView className="flex-row justify-between items-center">
            <StyledText className="text-gray-600">Temperature:</StyledText>
            <StyledText>{weatherData.temperature}°C</StyledText>
          </StyledView>
          
          <StyledView className="flex-row justify-between items-center mt-2">
            <StyledText className="text-gray-600">Humidity:</StyledText>
            <StyledText>{weatherData.humidity}%</StyledText>
          </StyledView>
          
          <StyledView className="flex-row justify-between items-center mt-2">
            <StyledText className="text-gray-600">Rain Probability:</StyledText>
            <StyledText>{weatherData.rainProbability}%</StyledText>
          </StyledView>
          
          <StyledView className="flex-row justify-between items-center mt-2">
            <StyledText className="text-gray-600">Location:</StyledText>
            <StyledText>{weatherData.location}</StyledText>
          </StyledView>
        </StyledView>
        
        {/* Controls Card */}
        <StyledView className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <StyledText className="text-lg font-bold mb-2">Controls</StyledText>
          <StyledText className="text-gray-600 mb-3">
            Manually control your clothesline
          </StyledText>
          
          <StyledView className="flex-row space-x-3">
            <Button
              title="Extend"
              onPress={() => controlSystem('extend')}
              disabled={systemStatus.clotheslineExtended || systemStatus.motorRunning}
              variant="primary"
              className="flex-1"
            />
            
            <Button
              title="Retract"
              onPress={() => controlSystem('retract')}
              disabled={!systemStatus.clotheslineExtended || systemStatus.motorRunning}
              variant="secondary"
              className="flex-1"
            />
          </StyledView>
          
          {systemStatus.motorRunning && (
            <StyledView className="mt-3 bg-blue-50 p-3 rounded">
              <StyledText className="text-blue-800 text-center">
                Motor is currently running...
              </StyledText>
            </StyledView>
          )}
        </StyledView>
      </StyledScrollView>
      
      <ProfileModal
        visible={profileModalVisible}
        onClose={() => setProfileModalVisible(false)}
      />
    </StyledSafeAreaView>
  );
}
