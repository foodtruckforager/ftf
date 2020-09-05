import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function SearchResults({ navigation, value }) {
  const pressHandler = () => {
    navigation.navigate('TruckDetails');
  };
  const searchHandler = () => {
    navigation.navigate('Search');
  };
  const value2 = navigation.getParam('value');
  console.log(value2);

  // spinner
  // need to make a search query to server with
  // value and then map data and replace spinner
  return (
    <View>
      <Text> {value2} hellooo </Text>

      <Button title='Go To Search Screen' onPress={searchHandler} />
      <Button title='Go To Truck Details' onPress={pressHandler} />
    </View>
  );
}
