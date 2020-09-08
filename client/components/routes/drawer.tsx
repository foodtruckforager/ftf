import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import TrackerStack from './trackerStack';
import Search from '../screens/search';
import Profile from '../screens/profile';
import Accordion from '../../Accordion';
import LogIn from '../screens/LogIn';

const RootDrawerNavigator = createDrawerNavigator({
  Tracker: {
    screen: TrackerStack,
  },
  Search: {
    screen: TrackerStack,
  },
  // Trucks: {
  //   screen: 'Something',
  // },
  Profile: {
    screen: Profile,
  },
  UserProfile: {
    screen: Accordion,
  },
  LogOut: {
    screen: LogIn,
  },
});

export default createAppContainer(RootDrawerNavigator);
