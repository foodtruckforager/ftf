import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-elements';
import TimeAgo from 'react-native-timeago';

const TruckPostItem = ({ post }) => {

  return (
    <View key={post.id} style={styles.container}>
      <Card>
        <Card.Title>{post.title}</Card.Title>
        <View style={styles.alignRight}>
        <TimeAgo time={post.createdAt} /></View>
        <Card.Divider />
        <Text>{post.message}</Text>
        <Card.Image
          source={{ uri: post.photo }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.stars}>
        {post.keywords && (<Text>{post.keywords.map((prediction: Object) => `${prediction.class}, `).join('')
    .slice(0, -2)}</Text>)}
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  alignRight: {
    flex: .4,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
