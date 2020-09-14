import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import TruckOwnerProfileEdit from '../screens/TruckOwnerProfileEdit';
import TruckOwnerProfile from '../screens/TruckOwnerProfile';

const Stack = createStackNavigator();

const OwnerCreateProfileFirstStack = ({ googleId }) => (
  <View style={styles.container}>
    {googleId && (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TruckOwnerProfileEdit">
        <Stack.Screen
          name="TruckOwnerProfileEdit"
          component={TruckOwnerProfileEdit}
          initialParams={{ googleId }}
        />
        <Stack.Screen
          name="TruckOwnerProfile"
          component={TruckOwnerProfile}
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

export default OwnerCreateProfileFirstStack;
