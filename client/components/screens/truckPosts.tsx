import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import axios from 'axios';
import TruckPostItem from '../dropIns/TruckPostItem';

export default function TruckPosts({ navigation }) {
  const [currentTruckPosts, setCurrentTruckPosts] = useState([]);
  // const currentTruckId = navigation.state.params.params.navigation.state.params.params.currentTruck.id;
  const currentTruck = navigation.state.params.params.currentTruck
  const { id } = currentTruck;

  useEffect(() => {
    console.log(id);
    console.log(currentTruck);
    axios.get(`${process.env.EXPO_LocalLan}/truck/truckpost/${id}`)
      .then((response) => {
        console.log('response.data', response.data);
        setCurrentTruckPosts(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const pressHandler = () => {
    navigation.navigate(`TruckReviews`, {
      params: { currentTruck, id, navigation, onDetails: true },
    });
  };
  const pressHandlerDetails = () => {
    navigation.navigate(`TruckDetails`, {
      params: { currentTruck, id, navigation, onDetails: true },
    });
  };

  return (
    <View style={styles.container}>
      {currentTruckPosts.map(post => (
        <TruckPostItem post={post} />
      ))}
      <Button title='Go To Reviews' onPress={pressHandler} />
      <Button title='Go To Details' onPress={pressHandlerDetails} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
