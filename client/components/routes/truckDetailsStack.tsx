import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import TruckDetails from '../screens/truckDetails';
import TruckPosts from '../screens/truckPosts';
import TruckReviews from '../screens/truckReviews';

const screens = {
  TruckDetails: {
    screen: TruckDetails,
  },
  TruckPosts: {
    screen: TruckPosts,
  },
  TruckReviews: {
    screen: TruckReviews,
  },
};

const TruckDetailsStack = createStackNavigator(screens);

export default createAppContainer(TruckDetailsStack);
