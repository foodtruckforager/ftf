import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const TruckPostItem = ({ currentTruck, post }) => (
  <View key={post.id} style={styles.container}>
    <Text style={styles.truck}>{currentTruck.full_name}</Text>
    <Text>{post.title}</Text>
    <Text>{post.message}</Text>
    <Image source={{ uri: post.photo }} style={styles.image} resizeMode="contain" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: 150,
    width: 150,
  },
  truck:{
    height: 100,
    width: 100,
  },
  title: {

  },
  message: {

  },
});

export default TruckPostItem;
