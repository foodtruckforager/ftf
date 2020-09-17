import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Divider, Text, Avatar, Card } from 'react-native-elements';
import foodIcons from '../../../assets/mapIcons.js';

const TruckReviewItem = ({ review, currentTruck, currentTruckReviewers }) => {
  const {
    review_description,
    review_photo,
    review_star,
    review_title,
    upvotes,
    createdAt,
  } = review;
  const { full_name, badge, profile_photo_url } = currentTruckReviewers;
  let reviewPhoto: string = review_photo || foodIcons.defaultReviewPhoto;
  let profilePhoto: string = profile_photo_url || foodIcons.defaultProfilePhoto;
  let userBadges = badge || '🎖';
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
            </Text></View>
            <View>
              <Text>{`${createdAt.substring(0, 10)} | ${createdAt.substring(
                14,
                19
              )}`}</Text></View>
            </View>
        <Card.Divider/>
        <Text>{review_description}</Text>
        <Text>{`${upvotes} 👍`}</Text>
        <Card.Image
          source={{ uri: reviewPhoto }}
          resizeMode="cover"
        />
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
