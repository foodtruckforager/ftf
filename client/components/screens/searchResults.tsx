import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import TruckDetails from './truckDetails';

export default function SearchResults({ navigation }) {
  const [foodTrucks, setFoodTrucks] = useState([]);

  const value = navigation.getParam('value').toLowerCase();

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`${process.env.EXPO_LocalLan}/truck/search/${value}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setFoodTrucks(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const pressHandler = () => {
    navigation.navigate('TruckDetails');
  };
  const searchHandler = () => {
    navigation.navigate('Search');
  };

  return (
    <View>
      <Button title='Go To Search Screen' onPress={searchHandler} />
      <Button title='Go To Truck Details' onPress={pressHandler} />
      {foodTrucks.map((truck) => (
        <View key={truck.id}>
          <Text>{truck.food_genre}</Text>
          <Text>{truck.full_name}</Text>
          <Text>{truck.phone_number}</Text>
          <Text>
            {truck.blurb}
            {'\n'}
          </Text>
        </View>
      ))}
    </View>
  );
}
