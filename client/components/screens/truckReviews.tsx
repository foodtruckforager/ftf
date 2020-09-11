import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function TruckReviews({ navigation }) {
  const currentTruck = navigation.state.params.params.currentTruck;
  const pressHandler = () => {
    navigation.navigate(`TruckDetails`, {
      params: { currentTruck, id, navigation, onDetails: true },
    });
  };
  const pressHandlerPost = () => {
    navigation.navigate(`TruckPosts`, {
      params: { currentTruck, id, navigation, onDetails: true },
    });
  };
  return (
    <View style={StyleSheet.container}>
      <Text> Truck Reviews </Text>
      <Button title="Go To Details" onPress={pressHandler} />
      <Button title="Go To Posts" onPress={pressHandlerPost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});
