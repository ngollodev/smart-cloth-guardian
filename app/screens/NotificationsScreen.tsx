
import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);

// Mock notifications
const notifications = [
  { id: '1', title: 'Rain detected', message: 'Clothesline automatically retracted due to rain', time: '2 hours ago', read: false },
  { id: '2', title: 'Battery low', message: 'System battery is at 15%, please charge soon', time: '1 day ago', read: true },
  { id: '3', title: 'Schedule activated', message: 'Morning extension schedule was activated', time: '2 days ago', read: true },
];

function NotificationsScreen() {
  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <StyledView className="p-4 border-b border-gray-200">
        <StyledText className="text-2xl font-bold">Notifications</StyledText>
      </StyledView>
      
      <StyledScrollView className="flex-1 p-4">
        {notifications.map(notification => (
          <StyledView 
            key={notification.id} 
            className={`bg-white rounded-xl p-4 shadow-sm mb-4 ${notification.read ? '' : 'border-l-4 border-primary'}`}
          >
            <StyledText className="text-lg font-bold">{notification.title}</StyledText>
            <StyledText className="text-gray-600 mt-1">{notification.message}</StyledText>
            <StyledText className="text-gray-500 text-xs mt-2">{notification.time}</StyledText>
          </StyledView>
        ))}
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}

export default NotificationsScreen;
