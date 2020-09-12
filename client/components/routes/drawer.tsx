import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';

import TrackerStack from './trackerStack';
import Search from '../screens/search';
import ScanQRCode from '../screens/ScanQRCode';
import GenerateQRCode from '../screens/GenerateQRCode';
import ImageUpload from '../screens/ImageUpload';
import Settings from '../screens/settings';
import Accordion from '../../Accordion';
import LogOut from '../screens/LogOut';
import LogIn from '../screens/LogIn';

// const Drawer = createDrawerNavigator();

// export default function RootDrawerNavigator() {
//   return (
//     <NavigationContainer>

//     </NavigationContainer>
//   );
// }
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
  Settings: {
    screen: Settings,
  },
  Profile: {
    screen: Accordion,
  },
  ScanQRCode: {
    screen: ScanQRCode,
  },
  GenerateQRCode: {
    screen: GenerateQRCode,
  },
  ImageUpload: {
    screen: ImageUpload,
  },
  LogOut: {
    screen: LogIn,
    params: { previous_screen: 'LogOut' },
  },
});

export default createAppContainer(RootDrawerNavigator);
