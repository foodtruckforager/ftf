import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import TruckOwnerProfileEdit from '../screens/TruckOwnerProfileEdit';
import TruckOwnerProfile from '../screens/TruckOwnerProfile';

const Stack = createStackNavigator();

const OwnerProfileFirstStack = ({ googleId }) => (
  <View style={styles.container}>
    {googleId && (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TruckOwnerProfile">
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
