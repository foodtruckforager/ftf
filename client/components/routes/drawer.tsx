import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import TrackerStack from './trackerStack';
import Search from '../screens/search';
import ScanQRCode from '../screens/ScanQRCode';
import ImageUpload from '../screens/ImageUpload';
import Accordion from '../../Accordion';
import LogIn from '../screens/LogIn';

const RootDrawerNavigator = createDrawerNavigator({
  Tracker: {
    screen: TrackerStack,
  },
  // Search: {
  //   screen: Search,
  // },
  Profile: {
    screen: Accordion,
  },
  ScanQRCode: {
    screen: ScanQRCode,
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
