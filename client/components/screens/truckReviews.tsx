import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, Button } from 'react-native';
import TruckPostItem from '../dropIns/TruckPostItem';

export default function TruckReviews({ navigation }) {
  const [currentTruckReviews, setCurrentTruckReviews] = useState([]);

  const currentTruck = navigation.state.params.params.currentTruck;
  const { id } = currentTruck;

  useEffect(() => {
    axios
      .get(`${process.env.EXPO_LocalLan}/truck/review/${id}`)
      .then((response) => {
        console.log('response.data', response.data);
        setCurrentTruckReviews(response.data);
        alert(JSON.stringify(response.data));
      })
      .catch((err) => console.error(err));
  }, []);

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
    <View style={StyleSheet.container}>
      <Text> Truck Reviews </Text>
      <Button title="Go To Details" onPress={pressHandler} />
      <Button title="Go To Posts" onPress={pressHandlerPost} />
      <Text> {JSON.stringify(currentTruckReviews[0])}</Text>
      {currentTruckReviews.map((review) => (
        <TruckPostItem
          currentTruck={currentTruck}
          post={review}
          key={review.id}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});
