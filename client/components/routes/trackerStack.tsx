import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
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
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} />,
      };
    },
  },
  Search: {
    screen: Search,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} />,
      };
    },
  },
  SearchResults: {
    screen: SearchResults,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} />,
      };
    },
  },
  TruckDetails: {
    screen: TruckDetails,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} />,
      };
    },
  },
  TruckPosts: {
    screen: TruckPosts,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} />,
      };
    },
  },
  TruckReviews: {
    screen: TruckReviews,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} />,
      };
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} />,
      };
    },
  },
};

const TrackerStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 },
  },
});

export default TrackerStack;
