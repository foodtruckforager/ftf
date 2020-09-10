import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import InfoWindow from '../dropIns/InfoWindow';

export default function TruckDetails({ navigation }) {
  const currentTruck = navigation.state.params.params.currentTruck;
  const onDetails = navigation.state.params.params.onDetails || false;
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
      <View style={style.navigation}>
        <Button title="Reviews" onPress={pressHandler} />
        <Button title="Posts" onPress={pressHandlerPost} />
      </View>
      <View style={style.infoWindow}>
        <InfoWindow
          currentTruck={currentTruck}
          navigation={navigation}
          onDetails={onDetails}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  navigation: {
    flex: 0.10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  infoWindow: {
    flex: 0.90,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
});
