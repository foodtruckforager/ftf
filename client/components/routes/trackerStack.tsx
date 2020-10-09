import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Header from '../dropIns/header';
import Tracker from '../screens/tracker';
import Search from '../screens/search';
import SearchResults from '../screens/searchResults';
import TruckDetails from '../screens/truckDetails';
import TruckPosts from '../screens/truckPosts';
import TruckReviews from '../screens/truckReviews';
import PhotoForager from '../screens/PhotoForager';
import PhotoKeywordResult from '../screens/PhotoForager';
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
  // PhotoForager: {
  //   screen: PhotoForager,
  //   navigationOptions: ({ navigation }) => ({
  //     headerTitle: () => <Header navigation={navigation} />,
  //   }),
  // },
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
    headerTintColor: '#FFFFFF',
    headerStyle: { backgroundColor: '#5497A7', height: 90 },
    headerBackTitleVisible: false,
    headerTitleAlign: 'left',
    headerMode: 'screen',
  },
});

export default TrackerStack;
