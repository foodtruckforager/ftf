import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Thumbnail from './Thumbnail';

export default function InfoWindow({ currentTruck }) {
  const { full_name, blurb, logo, star_average } = currentTruck;
  return (
    <View>
      <Text>{`${full_name}`}</Text>
      <Text>{`${blurb}`}</Text>
      <Thumbnail logo={logo} />
      <Text>{`${star_average}`}</Text>
    </View>
  );
}
