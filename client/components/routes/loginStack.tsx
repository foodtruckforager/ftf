import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Header from '../dropIns/header';
import LogIn from '../screens/LogIn';

const screens = {
  LogIn: {
    screen: LogIn,
  },
};

const LogInStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 },
  },
});

export default createAppContainer(LogInStack);
