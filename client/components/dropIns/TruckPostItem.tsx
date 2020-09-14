import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Divider, Text } from 'react-native-elements';

const TruckPostItem = ({ post }) => (
  <View key={post.id} style={styles.container}>
    <Text style={styles.title}>{post.title}</Text>
    <Text>{`${post.createdAt.substring(0, 10)} | ${post.createdAt.substring(11, 16)}`}</Text>

    <Text>{post.message}</Text>
    <Image source={{ uri: post.photo }} style={styles.image} resizeMode="contain" />
    <Divider style={{ backgroundColor: 'blue' }} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  truck: {
    height: 100,
    width: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 20,
  },
  message: {
    padding: 20,
  },
});

export default TruckPostItem;
