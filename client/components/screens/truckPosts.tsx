import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';
import axios from 'axios';
import TruckPostItem from '../dropIns/TruckPostItem';
import Thumbnail from '../dropIns/Thumbnail';

export default function TruckPosts({ navigation }) {
  const [currentTruckPosts, setCurrentTruckPosts] = useState([]);
  const { currentTruck } = navigation.state.params.params;
  const { id } = currentTruck;

  useEffect(() => {
    axios.get(`${process.env.EXPO_LocalLan}/truck/truckpost/${id}`)
      .then((response) => {
        setCurrentTruckPosts(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const pressHandler = () => {
    navigation.navigate(`TruckReviews`, {
      params: { currentTruck, id, navigation, onReviews: true },
    });
  };
  const pressHandlerDetails = () => {
    navigation.navigate('TruckDetails', {
      params: {
        currentTruck, id, navigation, onDetails: true,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Go To Reviews" onPress={pressHandler} />
      <Button title="Go To Details" onPress={pressHandlerDetails} />
      <Text style={styles.title}>
        {currentTruck.full_name}
      </Text>
      <Thumbnail logo={currentTruck.logo} />
      {currentTruckPosts.map((post) => (
        <TruckPostItem currentTruck={currentTruck} post={post} key={post.id} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
  },
});
