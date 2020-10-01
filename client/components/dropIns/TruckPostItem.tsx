import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-elements';
import TimeAgo from 'react-native-timeago';

const TruckPostItem = ({ post }) => {
  const keywordsMapped = post.keywords
    .map((prediction: Object) => `${prediction.class}, `).join('')
    .slice(0, -2);

  return (
    <View key={post.id} style={styles.container}>
      <Card>
        <Card.Title>{post.title}</Card.Title>
        <Card.Divider />
        <TimeAgo time={post.createdAt} />
        <Text>{post.message}</Text>
        <Card.Image
          source={{ uri: post.photo }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.stars}>
          <Text>{keywordsMapped}</Text>
        </View>
      </Card>
    </View>
  );
};

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
