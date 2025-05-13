
import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Card, CardHeader, CardContent } from '../components/ui/Card';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

// Mock notifications
const notifications = [
  {
    id: '1',
    title: 'Rain Alert',
    message: 'Rain detected! Your clothesline has been automatically retracted.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
    type: 'alert'
  },
  {
    id: '2',
    title: 'Schedule Executed',
    message: 'Morning Extension schedule has been executed successfully.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    read: true,
    type: 'info'
  },
  {
    id: '3',
    title: 'Battery Low',
    message: 'Your device battery is at 20%. Please charge soon.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: false,
    type: 'warning'
  }
];

export default function NotificationsScreen() {
  const getNotificationStyle = (type, read) => {
    let bgColor = read ? 'bg-white' : 'bg-blue-50';
    
    switch (type) {
      case 'alert':
        return `${bgColor} border-l-4 border-l-red-500`;
      case 'warning':
        return `${bgColor} border-l-4 border-l-yellow-500`;
      default:
        return `${bgColor} border-l-4 border-l-blue-500`;
    }
  };
  
  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <StyledView className="px-4 py-4">
        <StyledText className="text-2xl font-bold">Notifications</StyledText>
        <StyledText className="text-muted">Stay informed about your system</StyledText>
      </StyledView>
      
      <StyledScrollView className="flex-1 px-4">
        {notifications.map(notification => (
          <Card 
            key={notification.id} 
            className={`mb-4 overflow-hidden ${getNotificationStyle(notification.type, notification.read)}`}
          >
            <CardContent>
              <StyledView className="flex-row justify-between mb-1">
                <StyledText className="font-bold">{notification.title}</StyledText>
                <StyledText className="text-muted text-xs">
                  {new Date(notification.timestamp).toLocaleTimeString()}
                </StyledText>
              </StyledView>
              
              <StyledText className="text-sm text-muted mb-2">
                {new Date(notification.timestamp).toLocaleDateString()}
              </StyledText>
              
              <StyledText className="text-sm mb-3">{notification.message}</StyledText>
              
              <StyledView className="flex-row">
                <StyledTouchableOpacity className="flex-1 items-center py-2">
                  <StyledText className="text-primary">Mark as {notification.read ? 'unread' : 'read'}</StyledText>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="flex-1 items-center py-2">
                  <StyledText className="text-muted">Dismiss</StyledText>
                </StyledTouchableOpacity>
              </StyledView>
            </CardContent>
          </Card>
        ))}
        
        {notifications.length === 0 && (
          <StyledView className="items-center justify-center p-8">
            <StyledText className="text-muted">No notifications</StyledText>
          </StyledView>
        )}
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}
