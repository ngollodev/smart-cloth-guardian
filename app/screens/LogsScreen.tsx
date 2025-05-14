import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import { useSystem } from '../hooks/useSystem';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);

function LogsScreen() {
  const { logs } = useSystem();

  const getEventTypeStyle = (eventType: string) => {
    switch (eventType) {
      case "system": return "bg-gray-100 text-gray-800";
      case "action": return "bg-green-100 text-green-800";
      case "weather": return "bg-blue-100 text-blue-800";
      case "error": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <StyledView className="p-4 border-b border-gray-200">
        <StyledText className="text-2xl font-bold">System Logs</StyledText>
      </StyledView>
      
      <StyledScrollView className="flex-1 p-4">
        {logs.map(log => (
          <StyledView key={log.id} className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <StyledView className="flex-row justify-between items-center">
              <StyledText className="text-lg font-semibold">{log.message}</StyledText>
              <StyledView className={`py-1 px-3 rounded-full ${getEventTypeStyle(log.eventType)}`}>
                <StyledText className={getEventTypeStyle(log.eventType)}>
                  {log.eventType.charAt(0).toUpperCase() + log.eventType.slice(1)}
                </StyledText>
              </StyledView>
            </StyledView>
            
            <StyledText className="text-gray-500 text-xs mt-1">
              {new Date(log.timestamp).toLocaleString()}
            </StyledText>
            
            {log.details && (
              <StyledText className="text-gray-600 mt-2">
                {log.details}
              </StyledText>
            )}
          </StyledView>
        ))}
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}

export default LogsScreen;
