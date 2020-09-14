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
  const [photo, setPhoto] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRTmpzHIZ9FYP3DqV-ahD1ngl9CwAmRmjsAhQ&usqp=CAU'
  );
  const [googleUserId, setGoogleUserId] = useState(0);
  const { id }: { id: [string, number] } = currentTruck;

  const toggleOverlay = () => {
    setVisible(!visible);
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
            `${process.env.EXPO_LocalLan}/user/review/new/${id}/${userId}`,
            {
              reviewTitle: title,
              reviewDescription: description,
              reviewStar: rating,
              reviewPhoto: photo,
              upvotes: 0,
            }
          )
          .then(() => {
            getTruckReviews();
          })
          .catch((err) => console.error(err));
      };
      submitReview();
    } else {
      const submitPost = async () => {
        axios
          .post(`${process.env.EXPO_LocalLan}/truck/truckpost/new/${id}`, {
            title,
            message: description,
            photo,
          })
          .then(() => {
            getTruckPosts();
          })
          .catch((err) => console.error(err));
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
        console.error(error);
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
        .catch((err) => console.error(err));
    };
    getUserIdWithGoogleUserId();
  }, [googleUserId]);

  return (
    <View>
      {onReviews ? (
        <Button title="Write Review" onPress={toggleOverlay} />
      ) : (
        <Button title="Write Post" onPress={toggleOverlay} />
      )}
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        fullScreen={false}
      >
        <Text h3> 📝 Write {onReviews ? `Review` : `Post`} </Text>
        {onReviews && (
          <AirbnbRating
            size={22}
            defaultRating={5}
            showRating
            onFinishRating={onFinishRating}
          />
        )}
        <SearchBar
          placeholder="Title"
          lightTheme={true}
          searchIcon={false}
          onChangeText={updateTitle}
          value={title}
        />
        <SearchBar
          placeholder="Description"
          lightTheme={true}
          searchIcon={false}
          onChangeText={updateDescription}
          value={description}
        />
        <View style={styles.verticalPadding}>
          <Button title="📎 Attach Photo" onPress={() => {}} />
          <Button
            style={styles.slightVerticalPadding}
            title="✏️ Submit Review"
            onPress={onSubmit}
          />
          <Button title="❌ Close" onPress={toggleOverlay} />
        </View>
      </Overlay>
    </View>
  );
};

export default SubmitOverlay;

const styles = StyleSheet.create({
  verticalPadding: {
    paddingVertical: 10,
  },
  slightVerticalPadding: {
    paddingVertical: 2,
  },
});
