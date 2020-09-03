import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import FavoriteTruck, {
  FavoriteTruck as ListModelFavoriteTruck,
} from './FavoriteTruck';
import Badges, { Badges as ListModelBadges } from './Badges';

const list: ListModelFavoriteTruck = {
  name: 'User Profile Demo',
  items: [{ name: 'Food Truck Demo 1', points: 'Favorites To Go Here' }],
};
const list2: ListModelBadges = {
  name: 'Demo 2',
  items: [{ name: 'Boop', points: 'Badges to go here' }],
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
      <FavoriteTruck {...{ list }} />
      <Badges {...{ list2 }} />
    </ScrollView>
  );
};
