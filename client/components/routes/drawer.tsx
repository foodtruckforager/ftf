import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import TrackerStack from './trackerStack';
import Search from '../screens/search';
import ScanQRCode from '../screens/ScanQRCode';
import GenerateQRCode from '../screens/GenerateQRCode';
import Profile from '../screens/profile';
import Accordion from '../../Accordion';
import LogIn from '../screens/LogIn';

const RootDrawerNavigator = createDrawerNavigator({
  Tracker: {
    screen: TrackerStack,
  },
  Search: {
    screen: Search,
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
  ScanQRCode: {
    screen: ScanQRCode,
  },
  GenerateQRCode: {
    screen: GenerateQRCode,
  },
  LogOut: {
    screen: LogIn,
  },
});

export default createAppContainer(RootDrawerNavigator);
