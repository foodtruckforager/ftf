import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function TruckPosts({ navigation }) {
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
    <View style={StyleSheet.container}>
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
