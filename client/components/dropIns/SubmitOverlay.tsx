import React, { useState, useEffect } from 'react';
import {
  Button,
  Overlay,
  SearchBar,
  Text,
  AirbnbRating,
} from 'react-native-elements';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import axios from 'axios';
import ImageUploadOverlay from './ImageUploadOverlay';

const SubmitOverlay = ({
  onReviews,
  currentTruck,
  getTruckReviews,
  getTruckPosts,
}: {
  getTruckReviews: any;
  onReviews: boolean;
  currentTruck: object;
}) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(5);
  const [userId, setUserId] = useState('');
  const [photo, setPhoto] = useState('');
  const [googleUserId, setGoogleUserId] = useState(0);
  const [keywords, setKeywords] = useState([]);
  const [imageUploadOverlayVisible, setImageUploadOverlayVisible] = useState(
    false
  );
  const { id }: { id: [string, number] } = currentTruck;

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const toggleImageUploadOverlay = () => {
    setImageUploadOverlayVisible(!imageUploadOverlayVisible);
  };

  const updateTitle = (title: string) => {
    setTitle(title);
  };
  const updateDescription = (description: string) => {
    setDescription(description);
  };
  const onFinishRating = (rating: number) => {
    setRating(rating);
  };

  const onSubmit = () => {
    toggleOverlay();
    if (onReviews) {
      const submitReview = async () => {
        axios
          .post(
            `${process.env.EXPO_LocalLan}/user/review/new/${userId}/${id}`,
            {
              reviewTitle: title,
              reviewDescription: description,
              reviewStar: rating,
              reviewPhoto: photo,
              upvotes: 0,
              keywords,
            }
          )
          .then(() => {
            getTruckReviews();
          })
          .catch((err) => console.log(err));
      };
      submitReview();
    } else {
      const submitPost = async () => {
        axios
          .post(`${process.env.EXPO_LocalLan}/truck/truckpost/new/${id}`, {
            title,
            message: description,
            photo,
            keywords,
          })
          .then(() => {
            getTruckPosts();
          })
          .catch((err) => console.log(err));
      };
      submitPost();
    }
  };

  useEffect(() => {
    const retrieveCurrentUserId = async () => {
      try {
        let value = await AsyncStorage.getItem('userData');
        if (value !== null) {
          value = JSON.parse(value);
          setGoogleUserId(value.user.id);
        } else {
          console.log('user id not found');
        }
      } catch (error) {
        console.log(error);
      }
    };
    retrieveCurrentUserId();
  }, []);

  useEffect(() => {
    const getUserIdWithGoogleUserId = async () => {
      axios
        .get(`${process.env.EXPO_LocalLan}/user/googleId/${googleUserId}`)
        .then((response) => {
          if (response.data[0] !== undefined) {
            setUserId(response.data[0].id);
          }
        })
        .catch((err) => console.log(err));
    };
    getUserIdWithGoogleUserId();
  }, [googleUserId]);

  return (
    <View>
      {onReviews ? (
        <Button
          title="Write Review"
          onPress={toggleOverlay}
          buttonStyle={styles.button}
        />
      ) : (
        <Button
          title="Write Post"
          onPress={toggleOverlay}
          buttonStyle={styles.button}
        />
      )}
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        fullScreen={true}
      >
        <View style={styles.container}>
          <View style={styles.centerText}>
            <Text h3> 📝 Write a {onReviews ? 'Review' : 'Post'} </Text>
          </View>
          {onReviews && (
            <AirbnbRating
              size={22}
              defaultRating={5}
              showRating
              onFinishRating={onFinishRating}
            />
          )}
          <View style={{ flex: 3 }}>
            <SearchBar
              placeholder="Title"
              lightTheme
              searchIcon={false}
              onChangeText={updateTitle}
              value={title}
            />
            <SearchBar
              placeholder="Description"
              lightTheme
              searchIcon={false}
              onChangeText={updateDescription}
              value={description}
            />
          </View>
          <View style={styles.threeBottomButtons}>
            <View style={{ marginTop: -150, flex: 3, padding: 10 }}>
              <ImageUploadOverlay
                imageUploadOverlayVisible={imageUploadOverlayVisible}
                fullScreen={false}
                onReviews={onReviews}
                toggleImageUploadOverlay={toggleImageUploadOverlay}
                keywords={keywords}
                setKeywords={setKeywords}
                photo={photo}
                setPhoto={setPhoto}
              />
            </View>
            <View style={{ marginTop: -50, flex: 3, borderRadius: 30 }}>
              <View style={{ paddingVertical: 4 }}>
                <Button
                  buttonStyle={styles.overlayButton}
                  title="✏️ Submit Review"
                  onPress={onSubmit}
                />
              </View>
              <View style={{ paddingVertical: 4 }}>
                <Button
                  title="❌ Close"
                  onPress={toggleOverlay}
                  buttonStyle={styles.overlayButton}
                />
              </View>
            </View>
          </View>
        </View>
      </Overlay>
    </View>
  );
};

export default SubmitOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  verticalPadding: {
    paddingVertical: 10,
  },
  threeBottomButtons: {
    marginBottom: 250,
  },
  slightVerticalPadding: {
    padding: 20,
    paddingVertical: 2,
    borderRadius: 30,
  },
  button: {
    borderRadius: 15,
  },
  overlayButton: {
    borderRadius: 15,
    paddingVertical: 10,
    width: 300,
    alignSelf: 'center',
  },
  centerText: {
    flex: .4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
