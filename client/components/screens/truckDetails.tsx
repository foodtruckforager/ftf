import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function TruckDetails({ navigation }) {
  const pressHandler = () => {
    navigation.navigate('TruckReviews');
  };
  const pressHandlerPost = () => {
    navigation.navigate('TruckPosts');
  };
  return (
    <View style={StyleSheet.container}>
      <Text> Truck Details </Text>
      <Button title='Go To Reviews' onPress={pressHandler} />
      <Button title='Go To Posts' onPress={pressHandlerPost} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 24,
  },
});
