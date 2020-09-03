import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import FavoriteTruck, {
  FavoriteTruck as ListModelFavoriteTruck,
} from './FavoriteTruck';
import Badges, { Badges as ListModelBadges } from './Badges';
import Settings, { Settings as ListModelSettings } from './Settings';
import UserPosts, { UserPosts as ListModelUserPosts } from './UserPosts';

const favoriteTrucks: ListModelFavoriteTruck = {
  name: 'User Profile Demo',
  items: [{ name: 'Food Truck Demo 1', points: 'Favorites To Go Here' }],
};

const badges: ListModelBadges = {
  name: 'Demo 2',
  items: [{ name: 'Badges', points: 'Badges to go here' }],
};

const settings: Settings = {
  name: 'Settings',
  items: [{ name: 'Profile', points: 'Settings to go here' }],
};

const userPosts: UserPosts = {
  name: 'User Posts',
  items: [{ name: 'User Posts', points: 'User Posts Go Here' }],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f6',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <FavoriteTruck {...{ favoriteTrucks }} />
      <Badges {...{ badges }} />
      <Settings {...{ settings }} />
      <UserPosts {...{ userPosts }} />
    </ScrollView>
  );
};
