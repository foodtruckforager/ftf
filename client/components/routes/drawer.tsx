import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import TrackerStack from './trackerStack';
import Search from '../screens/search';
import Profile from '../screens/profile';
import Accordion from '../../Accordion';
import LogOut from '../screens/LogOut';

const RootDrawerNavigator = createDrawerNavigator({ accessToken }, {
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
    screen: LogOut,
  },
});

export default createAppContainer(RootDrawerNavigator);
