import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import TruckOwnerProfileEdit from '../screens/TruckOwnerProfileEdit';
import TruckOwnerProfile from '../screens/TruckOwnerProfile';

const Stack = createStackNavigator();

const OwnerCreateProfileFirstStack = () => (
  <View style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TruckOwnerProfileEdit">
        <Stack.Screen name="TruckOwnerProfileEdit" component={TruckOwnerProfileEdit} />
        <Stack.Screen name="TruckOwnerProfile" component={TruckOwnerProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OwnerCreateProfileFirstStack;
