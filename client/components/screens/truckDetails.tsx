import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function TruckDetails({ navigation }) {
  const pressHandler = () => {
    navigation.navigate('TruckReviews');
  };
  return (
    <View style={StyleSheet.container}>
      <Text> Truck Details </Text>
      <Button title='Go To Reviews' onPress={pressHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});
