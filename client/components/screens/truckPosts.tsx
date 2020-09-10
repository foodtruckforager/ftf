import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import axios from 'axios';

export default function TruckPosts({ navigation }) {
  const [currentTruckPosts, setCurrentTruckPosts] = useState('');

  useEffect(() => {
    axios.get(`${EXPO_LocalLan}/truck/truckpost/1`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.error(err));
  }, []);

  const pressHandler = () => {
    navigation.navigate('TruckReviews');
  };
  const pressHandlerDetails = () => {
    navigation.navigate('TruckDetails');
  };

  return (
    <View style={styles.container}>
      <Text> Truck Posts </Text>
      <Button title='Go To Reviews' onPress={pressHandler} />
      <Button title='Go To Details' onPress={pressHandlerDetails} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});
