import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

//TODO : Determine how truck owner profile
// will link up with routing, how to see, what Google SignIN will do
export default function TruckOwnerProfile({ navigation }) {
  const pressHandler = () => {
    navigation.navigate('TruckOwnerProfile');
  };
  return (
    <View>
      <Text> TruckOwner </Text>
      <Button title='Go To Search Results' onPress={pressHandler}></Button>
    </View>
  );
}
