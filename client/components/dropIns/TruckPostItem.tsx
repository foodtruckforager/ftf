import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Divider, Text, Card } from 'react-native-elements';

const TruckPostItem = ({ post }) => (
  <View key={post.id} style={styles.container}>
    <Card>
      <Card.Title>{post.title}</Card.Title>
      <Card.Divider />
      <Text>{`${post.createdAt.substring(0, 10)} | ${post.createdAt.substring(
        11,
        16
      )}`}</Text>

      <Text>{post.message}</Text>
      <Card.Image
        source={{ uri: post.photo }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.stars}>
        {post.keywords.map((prediction: Object) => (
          <Text>{prediction.class}, </Text>
        ))}
      </View>
    </Card>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stars: {
    flexDirection: 'row',
  },
  image: {
    padding: 20,
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
