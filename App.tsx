import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GoogleLogIn from './client/components/dropIns/GoogleLogIn';
import TruckDetails from './client/components/screens/truckDetails';
import TruckPosts from './client/components/screens/truckPosts';
import TruckReviews from './client/components/screens/truckReviews';
import RootDrawerNavigator from './client/components/routes/drawer';
import LogInStack from './client/components/routes/loginStack';

export default function App() {
  return (
    <RootDrawerNavigator />

    // <View style={styles.container}>
    //   <LogInStack />
    //   <Text>Open up App.tsx to start working on your app!</Text>
    //   <StatusBar style='auto' />
    // </View>
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
