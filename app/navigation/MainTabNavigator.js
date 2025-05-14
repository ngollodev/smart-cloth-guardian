import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { styled } from 'nativewind';
import DashboardScreen from '../screens/DashboardScreen';
import SchedulesScreen from '../screens/SchedulesScreen';
import LogsScreen from '../screens/LogsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TabIcons from '../components/TabIcons';

const Tab = createBottomTabNavigator();
const StyledView = styled(View);

function MainTabNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={{
        tabBarActiveTintColor: '#9b87f5',
        tabBarInactiveTintColor: '#8E9196',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <TabIcons.Home size={size} color={color} />
        }}
      />
      <Tab.Screen 
        name="Schedules" 
        component={SchedulesScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <TabIcons.Calendar size={size} color={color} />
        }}
      />
      <Tab.Screen 
        name="Logs" 
        component={LogsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <TabIcons.List size={size} color={color} />
        }}
      />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <TabIcons.Bell size={size} color={color} />
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <TabIcons.Settings size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
