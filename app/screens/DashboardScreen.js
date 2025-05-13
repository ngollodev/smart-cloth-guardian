
import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, RefreshControl, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';
import { useSystem } from '../hooks/useSystem';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

export default function DashboardScreen() {
  const { 
    systemStatus, 
    weatherData, 
    refreshData, 
    refreshingData,
    controlSystem,
    loading 
  } = useSystem();
  
  const [controlling, setControlling] = useState(false);
  
  const handleRefresh = () => {
    refreshData();
  };
  
  const handleControl = async (action) => {
    setControlling(true);
    try {
      await controlSystem(action);
    } finally {
      setControlling(false);
    }
  };
  
  if (loading) {
    return (
      <StyledSafeAreaView className="flex-1 bg-background">
        <StyledView className="flex-1 justify-center items-center p-4">
          <StyledText className="text-lg text-muted">Loading system status...</StyledText>
        </StyledView>
      </StyledSafeAreaView>
    );
  }
  
  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <StyledView className="px-4 py-4">
        <StyledText className="text-2xl font-bold">Dashboard</StyledText>
        <StyledText className="text-muted">Monitor and control your clothesline</StyledText>
      </StyledView>
      
      <StyledScrollView 
        className="flex-1 px-4"
        refreshControl={
          <RefreshControl
            refreshing={refreshingData}
            onRefresh={handleRefresh}
            colors={['#9b87f5']}
          />
        }
      >
        {/* System Status Card */}
        <Card className="mb-4">
          <CardHeader title="System Status" />
          <CardContent>
            <StyledView className="flex-row justify-between items-center mb-4">
              <StyledView className="flex-row items-center">
                <StyledView
                  className={`w-3 h-3 rounded-full mr-2 ${
                    systemStatus.connectionStatus === 'online' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <StyledText className="font-medium">
                  {systemStatus.connectionStatus === 'online' ? 'Online' : 'Offline'}
                </StyledText>
              </StyledView>
              <StyledText className="text-muted text-sm">
                Battery: {systemStatus.batteryLevel}%
              </StyledText>
            </StyledView>
            
            <StyledView className="bg-gray-100 p-4 rounded-lg mb-4 items-center">
              <StyledText className="text-lg font-bold mb-2">
                Clothesline is {systemStatus.clotheslineExtended ? 'Extended' : 'Retracted'}
              </StyledText>
              <StyledText className="text-muted text-sm">
                Last updated: {new Date(systemStatus.lastUpdate).toLocaleString()}
              </StyledText>
            </StyledView>
            
            {systemStatus.motorRunning ? (
              <StyledView className="items-center p-4">
                <StyledText className="text-secondary mb-2">Motor is running</StyledText>
                <StyledView className="w-6 h-6 border-4 border-secondary rounded-full border-t-transparent animate-spin" />
              </StyledView>
            ) : (
              <StyledView className="flex-row justify-between">
                <Button
                  title="Extend"
                  onPress={() => handleControl('extend')}
                  disabled={controlling || systemStatus.clotheslineExtended}
                  loading={controlling && !systemStatus.clotheslineExtended}
                  className="flex-1 mr-2"
                />
                <Button
                  title="Retract"
                  onPress={() => handleControl('retract')}
                  disabled={controlling || !systemStatus.clotheslineExtended}
                  loading={controlling && systemStatus.clotheslineExtended}
                  variant="secondary"
                  className="flex-1 ml-2"
                />
              </StyledView>
            )}
          </CardContent>
        </Card>
        
        {/* Weather Card */}
        <Card className="mb-4">
          <CardHeader title="Weather Conditions" />
          <CardContent>
            <StyledView className="flex-row justify-between mb-3">
              <StyledView>
                <StyledText className="text-3xl font-bold">{Math.round(weatherData.temperature)}°C</StyledText>
                <StyledText className="text-muted">{weatherData.conditions}</StyledText>
              </StyledView>
              <StyledView className="items-end">
                <StyledText className="font-medium">{weatherData.location}</StyledText>
                <StyledText className="text-muted text-sm">
                  Updated: {new Date(weatherData.updatedAt).toLocaleTimeString()}
                </StyledText>
              </StyledView>
            </StyledView>
            
            <StyledView className="flex-row justify-between bg-gray-100 p-3 rounded-lg">
              <StyledView className="items-center">
                <StyledText className="text-muted text-sm">Humidity</StyledText>
                <StyledText className="font-medium">{Math.round(weatherData.humidity)}%</StyledText>
              </StyledView>
              <StyledView className="items-center">
                <StyledText className="text-muted text-sm">Rain Chance</StyledText>
                <StyledText className="font-medium">{Math.round(weatherData.rainProbability)}%</StyledText>
              </StyledView>
              <StyledView className="items-center">
                <StyledText className="text-muted text-sm">Wind</StyledText>
                <StyledText className="font-medium">{Math.round(weatherData.windSpeed)} km/h</StyledText>
              </StyledView>
            </StyledView>
          </CardContent>
        </Card>
        
        {/* Rain Alert Card */}
        <Card className="mb-4 bg-blue-50 border border-blue-200">
          <CardHeader title="Rain Protection" className="border-b border-blue-200" />
          <CardContent>
            <StyledView className="flex-row items-center mb-2">
              <StyledText className="font-medium flex-1">
                Auto-retract when rain detected
              </StyledText>
              <StyledView className="w-12 h-6 bg-primary rounded-full p-0.5 justify-center">
                <StyledView className="w-5 h-5 bg-white rounded-full ml-6" />
              </StyledView>
            </StyledView>
            <StyledText className="text-muted text-sm">
              Your clothesline will automatically retract when the rain sensor detects precipitation
            </StyledText>
          </CardContent>
        </Card>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}
