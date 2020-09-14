import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import TruckOwnerProfileEdit from '../screens/TruckOwnerProfileEdit';
import TruckOwnerProfile from '../screens/TruckOwnerProfile';
import LogIn from '../screens/LogIn';

const Stack = createStackNavigator();

const OwnerProfileFirstStack = ({ googleId }) => (
  <View style={styles.container}>
    {googleId && (
      <NavigationContainer independent="true">
        <Stack.Navigator initialRouteName="TruckOwnerProfile" headerMode="none">
          <Stack.Screen
            name="TruckOwnerProfile"
            component={TruckOwnerProfile}
            initialParams={{ googleId }}
          />
          <Stack.Screen
            name="TruckOwnerProfileEdit"
            component={TruckOwnerProfileEdit}
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

export default OwnerProfileFirstStack;
