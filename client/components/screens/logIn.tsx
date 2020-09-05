import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import GoogleLogIn from '../dropIns/GoogleLogIn';

export default function LogIn() {
  //   const pressHandler = () => {
  //     navigation.navigate('TruckReviews');
  //   };
  return (
    <View style={style.container}>
      <GoogleLogIn />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 24,
  },
});
