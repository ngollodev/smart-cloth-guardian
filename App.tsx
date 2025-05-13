import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './app/hooks/useAuth';
import { SystemProvider } from './app/hooks/useSystem';
import MainTabNavigator from './app/navigation/MainTabNavigator';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';

// Create navigation stack
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <SystemProvider>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="MainApp" component={MainTabNavigator} />
          </Stack.Navigator>
        </SystemProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
