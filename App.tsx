import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GoogleLogIn from './client/components/GoogleLogIn';
import TruckDetails from './client/components/screens/truckDetails';
import TruckPosts from './client/components/screens/truckPosts';
import TruckReviews from './client/components/screens/truckReviews';
import Navigator from './client/components/routes/truckDetailsStack';

export default function App() {
  return (
    <View style={styles.container}>
      <Navigator />
      <GoogleLogIn />
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
