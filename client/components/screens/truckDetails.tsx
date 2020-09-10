import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import InfoWindow from '../dropIns/InfoWindow';

export default function TruckDetails( { navigation }) {
  const currentTruck = navigation.state.params.params.currentTruck;
  const {
    full_name,
    blurb,
    logo,
    star_average,
    phone_number,
    food_genre,
    number_of_reviews,
    open_status,
    id,
  } = currentTruck;

  const pressHandler = () => {
    navigation.navigate('TruckReviews');
  };
  const pressHandlerPost = () => {
    navigation.navigate('TruckPosts');
  };
  return (
    <View style={style.container}>
      {/* <Text>{`${full_name} Details`}</Text> */}
      <InfoWindow currentTruck={currentTruck} navigation={navigation} />
      <Button title="Go To Reviews" onPress={pressHandler} />
      <Button title="Go To Posts" onPress={pressHandlerPost} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 24,
  },
});
