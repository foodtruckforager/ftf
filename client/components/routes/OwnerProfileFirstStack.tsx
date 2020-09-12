import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';
import { View } from 'react-native';
import TruckOwnerProfileEdit from '../screens/TruckOwnerProfileEdit';
import TruckOwnerProfile from '../screens/TruckOwnerProfile';
import trackerStack from '../routes/trackerStack';

const Stack = createStackNavigator();

const OwnerProfileFirstStack = () => (
  <View style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TruckOwnerProfile">
        <Stack.Screen name="TruckOwnerProfile" component={TruckOwnerProfile} />
        <Stack.Screen name="TruckOwnerProfileEdit" component={TruckOwnerProfileEdit} />
      </Stack.Navigator>
    </NavigationContainer>
   </View>
);

export default OwnerProfileFirstStack;
