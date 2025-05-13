
import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useSystem } from '../hooks/useSystem';
import { Card, CardHeader, CardContent } from '../components/ui/Card';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);

export default function LogsScreen() {
  const { logs } = useSystem();
  
  const getEventTypeColor = (type) => {
    switch (type) {
      case 'error':
        return 'bg-red-100 border-red-200';
      case 'action':
        return 'bg-blue-100 border-blue-200';
      case 'weather':
        return 'bg-yellow-100 border-yellow-200';
      default:
        return 'bg-gray-100 border-gray-200';
    }
  };
  
  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <StyledView className="px-4 py-4">
        <StyledText className="text-2xl font-bold">System Logs</StyledText>
        <StyledText className="text-muted">Activity history and events</StyledText>
      </StyledView>
      
      <StyledScrollView className="flex-1 px-4">
        {logs.map(log => (
          <Card 
            key={log.id} 
            className={`mb-4 border ${getEventTypeColor(log.eventType)}`}
          >
            <CardContent>
              <StyledView className="flex-row justify-between mb-1">
                <StyledText className="font-bold">{log.message}</StyledText>
                <StyledText className="text-muted text-xs">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </StyledText>
              </StyledView>
              
              <StyledText className="text-sm text-muted mb-2">
                {new Date(log.timestamp).toLocaleDateString()}
              </StyledText>
              
              {log.details && (
                <StyledText className="text-sm">{log.details}</StyledText>
              )}
              
              <StyledView className="mt-2">
                <StyledView className="px-2 py-1 bg-gray-200 rounded-full self-start">
                  <StyledText className="text-xs text-muted capitalize">{log.eventType}</StyledText>
                </StyledView>
              </StyledView>
            </CardContent>
          </Card>
        ))}
        
        {logs.length === 0 && (
          <StyledView className="items-center justify-center p-8">
            <StyledText className="text-muted">No logs available</StyledText>
          </StyledView>
        )}
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}
