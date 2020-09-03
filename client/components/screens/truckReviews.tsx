import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function TruckReviews({ navigation }) {
  const pressHandler = () => {
    navigation.navigate('TruckDetails');
  };
  const pressHandlerPost = () => {
    navigation.navigate('TruckPosts');
  };
  return (
    <View style={StyleSheet.container}>
      <Text> Truck Reviews </Text>
      <Button title='Go To Details' onPress={pressHandler} />
      <Button title='Go To Posts' onPress={pressHandlerPost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});
