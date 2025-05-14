
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { AuthProvider } from './hooks/useAuth';
import { SystemProvider } from './hooks/useSystem';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainTabNavigator from './navigation/MainTabNavigator';

// Define RootStackParamList to properly type the navigator
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainApp: undefined;
};

// Create navigation stack with the correct typing
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
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

export default App;
