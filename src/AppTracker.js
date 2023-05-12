import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppInfo from 'react-native-get-app-info';
import AppState from 'react-native-appstate';

const AppTracker = () => {
  const [currentApp, setCurrentApp] = useState('');

  useEffect(() => {
    // Function to update the current app state
    const updateCurrentApp = async () => {
      const app = await AppInfo.getCurrentAppInfo();
      setCurrentApp(app.appName);
    };

    // Listen for app state changes
    AppState.addEventListener('change', updateCurrentApp);

    // Cleanup function to remove the event listener
    return () => {
      AppState.removeEventListener('change', updateCurrentApp);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current App: {currentApp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default AppTracker;
