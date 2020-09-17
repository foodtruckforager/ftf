import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { nonMaxSuppressionV3Impl } from '@tensorflow/tfjs-core/dist/backends/kernel_impls';
import Header from '../dropIns/header';
import Tracker from '../screens/tracker';
import Search from '../screens/search';
import SearchResults from '../screens/searchResults';
import TruckDetails from '../screens/truckDetails';
import TruckPosts from '../screens/truckPosts';
import TruckReviews from '../screens/truckReviews';
import Settings from '../screens/settings';

const screens = {
  Tracker: {
    screen: Tracker,
    navigationOptions: ({ navigation }) => ({
      headerTitle: () => <Header navigation={navigation} />,
    }),
  },
  Search: {
    screen: Search,
    navigationOptions: ({ navigation }) => ({
      headerTitle: () => <Header navigation={navigation} />,
    }),
  },
  SearchResults: {
    screen: SearchResults,
    navigationOptions: ({ navigation }) => ({
      headerTitle: () => <Header navigation={navigation} />,
    }),
  },
  TruckDetails: {
    screen: TruckDetails,
    navigationOptions: ({ navigation }) => ({
      headerTitle: () => <Header navigation={navigation} />,
    }),
  },
  TruckPosts: {
    screen: TruckPosts,
    navigationOptions: ({ navigation }) => ({
      headerTitle: () => <Header navigation={navigation} />,
    }),
  },
  TruckReviews: {
    screen: TruckReviews,
    navigationOptions: ({ navigation }) => ({
      headerTitle: () => <Header navigation={navigation} />,
    }),
  },
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
      headerTitle: () => <Header navigation={navigation} />,
    }),
  },
};

const TrackerStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 90 },
    headerBackTitleVisible: false,
  },
});

export default TrackerStack;
