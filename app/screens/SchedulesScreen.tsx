import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import { useSystem } from '../hooks/useSystem';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);

export default function SchedulesScreen() {
  const { schedules } = useSystem();

  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <StyledView className="p-4 border-b border-gray-200">
        <StyledText className="text-2xl font-bold">Schedules</StyledText>
      </StyledView>
      
      <StyledScrollView className="flex-1 p-4">
        {schedules.map(schedule => (
          <StyledView key={schedule.id} className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <StyledView className="flex-row justify-between items-center">
              <StyledText className="text-lg font-bold">{schedule.name}</StyledText>
              <StyledView className={`py-1 px-3 rounded-full ${schedule.enabled ? 'bg-green-100' : 'bg-gray-100'}`}>
                <StyledText className={schedule.enabled ? 'text-green-800' : 'text-gray-800'}>
                  {schedule.enabled ? 'Enabled' : 'Disabled'}
                </StyledText>
              </StyledView>
            </StyledView>
            
            <StyledText className="text-gray-600 mt-2">
              Time: {schedule.time} | Action: {schedule.action === 'extend' ? 'Extend' : 'Retract'}
            </StyledText>
            
            <StyledText className="text-gray-600">
              Days: {schedule.days.join(', ')}
            </StyledText>
          </StyledView>
        ))}
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}
