import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, Card } from 'react-native-elements';
import { useTheme } from 'react-native-paper';
import TimeAgo from 'react-native-timeago';
import foodIcons from '../../../assets/mapIcons.js';

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
  const reviewPhoto: string = review_photo || foodIcons.defaultReviewPhoto;
  const profilePhoto: string = profile_photo_url || foodIcons.defaultProfilePhoto;
  const userBadges = badge || '🎖';

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cardContainerStyle: {
      backgroundColor: 'white',
    },
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
      flexShrink: 1,
      flex: 0.7,
    },
    stars: {
      flexDirection: 'row',
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

  return (
    <View key={review.id} style={styles.container}>
      <Card containerStyle={styles.cardContainerStyle}>
        <View style={styles.reviewHeader}>
          <View style={styles.avatarNameBadge}>
            <Avatar
              rounded
              source={{
                uri: profilePhoto,
              }}
            />
            <Text>{full_name}</Text>
            <Text>{userBadges}       </Text>
            <View>
              <TimeAgo time={createdAt} />
            </View>
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
        </View>
        <Card.Divider />
        <Text>{review_description}</Text>
        <Card.Image source={{ uri: reviewPhoto }} resizeMode="cover" />
        <View style={styles.stars}>
<<<<<<< HEAD
        {keywords && (<Text>{keywords.map((prediction: Object) => `${prediction.class}, `).join('')
=======
          {keywords && (<Text>{keywords.map((prediction: Object) => `${prediction.class}, `).join('')
>>>>>>> ba14708f4d446557c04fc730e83a6596af3f1085
    .slice(0, -2)}</Text>)}
        </View>
      </Card>
    </View>
  );
};

export default TruckReviewItem;
