import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function Profile({ navigation }) {
  const pressHandler = () => {
    navigation.navigate('Profile');
  };
  return (
    <View>
      <Text> Profile Screen </Text>
      {/* <Button title='Go To Search Results' onPress={pressHandler}></Button> */}
    </View>
  );
}
