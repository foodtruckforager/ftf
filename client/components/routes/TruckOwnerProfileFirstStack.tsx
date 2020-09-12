import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import TruckOwnerProfile from '../screens/TruckOwnerProfile';
import TruckOwnerProfileEdit from '../screens/TruckOwnerProfileEdit';
import Header from '../dropIns/header';
import { createAppContainer } from 'react-navigation';

const screens = {
  TruckOwnerProfile: {
    screen: TruckOwnerProfile,
    // navigationOptions: ({ navigation }) => ({
    //   headerTitle: () => <Header navigation={navigation} />,
    // }),
  },
  TruckOwnerProfileEdit: {
    screen: TruckOwnerProfileEdit,
    // navigationOptions: ({ navigation }) => ({
    //   headerTitle: () => <Header navigation={navigation} />,
    // }),
  },
};

const TruckOwnerProfileFirstStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 90 },
  },
});

export default createAppContainer(TruckOwnerProfileFirstStack);
