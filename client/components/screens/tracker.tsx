import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function Tracker({ navigation }) {
  const pressHandler = () => {
    navigation.navigate('SearchResults');
  };
  return (
    <View>
      <Text> Tracker Screen </Text>
      <Button title='Go To Search Results' onPress={pressHandler}></Button>
    </View>
  );
}

// const style = StyleSheet.create({
//   container: {
//     padding: 24,
//   },
// });
