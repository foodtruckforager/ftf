import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TruckPostItem = ({ post }) => (
  <View>
    <Text>{JSON.stringify(post)}</Text>
  </View>
);

export default TruckPostItem;
