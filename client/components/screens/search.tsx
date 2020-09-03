import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function Search({ navigation }) {
  const searchHandler = () => {
    navigation.navigate('SearchResults');
  };
  return (
    <View>
      <Text> Search Screen </Text>
      <Button title='Go To Search Results' onPress={searchHandler} />
    </View>
  );
}
