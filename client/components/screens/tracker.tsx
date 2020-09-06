import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Map from '../dropIns/Map';
import Constants from 'expo-constants';

export default function Tracker({ navigation }) {
  const pressHandler = () => {
    navigation.navigate('Search');
  };
  return (
    <View style={style.container}>
      <View style={style.search}>
        <Button title="Go To Search Results" onPress={pressHandler}></Button>
      </View>
      <View style={style.map}>
        <Map />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 18,
    flex: 1,
  },
  search: {
    flex: 0.08,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  map: {
    flex: 0.92,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
