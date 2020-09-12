import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, Button } from 'react-native';
import TruckReviewItem from '../dropIns/TruckReviewItem';
import InfoWindow from '../dropIns/InfoWindow';

export default function TruckReviews({ navigation }) {
  const [currentTruckReviews, setCurrentTruckReviews] = useState([]);
  const [currentTruckReviewers, setCurrentTruckReviewers] = useState([]);

  const currentTruck = navigation.state.params.params.currentTruck;
  const onReviews = navigation.state.params.params.onReviews;

  const { id } = currentTruck;

  useEffect(() => {
    const getTruckReviews = async () => {
      axios
        .get(`${process.env.EXPO_LocalLan}/truck/review/${id}`)
        .then((response) => {
          setCurrentTruckReviews(response.data);
        })
        .catch((err) => console.error(err));
    };
    getTruckReviews();
  }, []);

  useEffect(() => {
    const getTruckReviewers = async () => {
      currentTruckReviews
        .map((review: object) => review.id_user)
        .forEach((reviewerId: string) => {
          axios
            .get(`${process.env.EXPO_LocalLan}/user/${reviewerId}`)
            .then((response) => {
              if (response.data) {
                setCurrentTruckReviewers(response.data);
              }
            })
            .catch((err) => {
              console.error(err);
            });
        });
    };
    getTruckReviewers();
  }, [currentTruckReviews]);

  const pressHandler = () => {
    navigation.navigate(`TruckDetails`, {
      params: { currentTruck, id, navigation, onDetails: true },
    });
  };
  const pressHandlerPost = () => {
    navigation.navigate(`TruckPosts`, {
      params: { currentTruck, id, navigation, onPost: true },
    });
  };
  return (
    <View style={styles.container}>
      <Text> Truck Reviews </Text>
      <Button title="Go To Details" onPress={pressHandler} />
      <Button title="Go To Posts" onPress={pressHandlerPost} />
      <View style={styles.infoWindowShell}>
        <InfoWindow
          currentTruck={currentTruck}
          navigation={navigation}
          onReviews={onReviews}
          style={styles.infoWindow}
        />
      </View>
      <View style={styles.reviews}>
        {currentTruckReviews.map((review) => (
          <TruckReviewItem
            currentTruck={currentTruck}
            currentTruckReviewers={currentTruckReviewers}
            review={review}
            key={review.id}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  infoWindow: {
    flex: 1,
    flexGrow: 10,
  },
  reviews: {
    flex: 1,
    flexGrow: 10,
  },
  infoWindowShell: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
});
