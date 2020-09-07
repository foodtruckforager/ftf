import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import TrackerStack from './trackerStack';
import Search from '../screens/search';
import Profile from '../screens/profile';
import Accordion from '../../Accordion';

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
  Trucks: {
    screen: Profile,
  },
  UserProfile: {
    screen: Accordion,
  },
});

export default createAppContainer(RootDrawerNavigator);
