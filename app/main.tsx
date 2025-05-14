// Import React first
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';

// Register the app component
AppRegistry.registerComponent('main', () => App);

// For web compatibility
if (typeof document !== 'undefined') {
  const rootTag = document.getElementById('root');
  if (rootTag) {
    AppRegistry.runApplication('main', { rootTag });
  }
}

export default App; // Add default export for expo-router compatibility
