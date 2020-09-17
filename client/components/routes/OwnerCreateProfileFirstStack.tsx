import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import TruckOwnerProfileEdit from '../screens/TruckOwnerProfileEdit';
import TruckOwnerProfile from '../screens/TruckOwnerProfile';
import LogIn from '../screens/LogIn';
import GenerateQRCode from '../screens/GenerateQRCode';

const Stack = createStackNavigator();

const OwnerCreateProfileFirstStack = ({ googleId }) => (
  <View style={styles.container}>
    {googleId && (
    <NavigationContainer independent="true">
      <Stack.Navigator initialRouteName="TruckOwnerProfileEdit" headerMode="none">
        <Stack.Screen
          name="TruckOwnerProfileEdit"
          component={TruckOwnerProfileEdit}
          initialParams={{ googleId, cameFromCreate: true }}
        />
        <Stack.Screen
          name="TruckOwnerProfile"
          component={TruckOwnerProfile}
          initialParams={{ googleId, cameFromCreate: true }}
        />
        <Stack.Screen
          name="GenerateQRCode"
          component={GenerateQRCode}
          initialParams={{ googleId }}
        />
        <Stack.Screen
          name="LogIn"
          component={LogIn}
        />
      </Stack.Navigator>
    </NavigationContainer>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OwnerCreateProfileFirstStack;
