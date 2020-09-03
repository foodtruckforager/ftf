import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function SearchResults({ navigation }) {
  const pressHandler = () => {
    navigation.navigate('TruckDetails');
  };
  const searchHandler = () => {
    navigation.navigate('Search');
  };
  return (
    <View>
      <Text> Search Results Screen </Text>
      <Button title='Go To Search Screen' onPress={searchHandler} />
      <Button title='Go To Truck Details' onPress={pressHandler} />
    </View>
  );
}
