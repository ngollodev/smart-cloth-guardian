import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useSystem } from '../hooks/useSystem';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledSwitch = styled(Switch);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function SchedulesScreen() {
  const { schedules } = useSystem();
  
  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <StyledView className="px-4 py-4">
        <StyledText className="text-2xl font-bold">Schedules</StyledText>
        <StyledText className="text-muted">Automate your clothesline</StyledText>
      </StyledView>
      
      <StyledScrollView className="flex-1 px-4">
        <StyledView className="mb-4">
          <Button
            title="Add New Schedule"
            variant="outline"
            fullWidth
          />
        </StyledView>
        
        {schedules.map(schedule => (
          <Card key={schedule.id} className="mb-4">
            <CardContent>
              <StyledView className="flex-row justify-between items-center mb-2">
                <StyledText className="font-bold text-lg">{schedule.name}</StyledText>
                <StyledSwitch
                  value={schedule.enabled}
                  trackColor={{ false: "#E2E8F0", true: "#9b87f5" }}
                  thumbColor="#ffffff"
                />
              </StyledView>
              
              <StyledView className="bg-gray-100 p-3 rounded-lg mb-3">
                <StyledView className="flex-row items-center mb-2">
                  <StyledText className="text-muted font-medium w-20">Time:</StyledText>
                  <StyledText>{schedule.time}</StyledText>
                </StyledView>
                
                <StyledView className="flex-row items-center mb-2">
                  <StyledText className="text-muted font-medium w-20">Action:</StyledText>
                  <StyledText className="capitalize">{schedule.action}</StyledText>
                </StyledView>
                
                <StyledView className="flex-row items-center">
                  <StyledText className="text-muted font-medium w-20">Days:</StyledText>
                  <StyledText>{schedule.days.join(', ')}</StyledText>
                </StyledView>
              </StyledView>
              
              <StyledView className="flex-row">
                <StyledTouchableOpacity className="flex-1 items-center py-2">
                  <StyledText className="text-primary">Edit</StyledText>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="flex-1 items-center py-2">
                  <StyledText className="text-destructive">Delete</StyledText>
                </StyledTouchableOpacity>
              </StyledView>
            </CardContent>
          </Card>
        ))}
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}
