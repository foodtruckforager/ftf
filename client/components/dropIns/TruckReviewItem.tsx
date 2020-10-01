import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, Card } from 'react-native-elements';
import foodIcons from '../../../assets/mapIcons.js';
import TimeAgo from 'react-native-timeago';

const TruckReviewItem = ({ review, currentTruck, currentTruckReviewers }) => {
  const {
    review_description,
    review_photo,
    review_star,
    review_title,
    upvotes,
    createdAt,
    keywords,
  } = review;
  const { full_name, badge, profile_photo_url } = currentTruckReviewers;
  let reviewPhoto: string = review_photo || foodIcons.defaultReviewPhoto;
  let profilePhoto: string = profile_photo_url || foodIcons.defaultProfilePhoto;
  let userBadges = badge || '🎖';
  const keywordsMapped = review.keywords
  .map((prediction: Object) => `${prediction.class}, `).join('')
    .slice(0, -2);
  
  return (
    <View key={review.id} style={styles.container}>
      <Card>
        <View style={styles.reviewHeader}>
          <View style={styles.avatarNameBadge}>
            <Avatar
              rounded
              source={{
                uri: profilePhoto,
              }}
            />
            <Text>{full_name}</Text>
            <Text>{userBadges}</Text>
          </View>
        </View>
        <Card.Title>
          <Text style={styles.title}>{review_title}</Text>
        </Card.Title>
        <View style={styles.column}>
          <View style={styles.stars}>
            <Text style={{ color: 'orange' }}>
              {String.fromCharCode(9733).repeat(Math.floor(review_star))}
            </Text>
            <Text style={{ color: 'lightgrey' }}>
              {String.fromCharCode(9733).repeat(5 - Math.floor(review_star))}
            </Text>
          </View>
          <View>
            <TimeAgo time={createdAt} />
          </View>
        </View>
        <Card.Divider />
        <Text>{review_description}</Text>
        <Text>{`${upvotes} 👍`}</Text>
        <Card.Image source={{ uri: reviewPhoto }} resizeMode="cover" />
        <View style={styles.stars}>
            <Text>{keywordsMapped}</Text>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarNameBadge: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
  },
  reviewHeader: {
    // alignItems: 'center',
    flexShrink: 1,
    flex: 0.7,
  },
  stars: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 0.4,
    height: undefined,
    width: undefined,
  },
  truck: {
    height: 100,
    width: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 2,
  },
  message: {
    padding: 2,
  },
});

export default TruckReviewItem;
