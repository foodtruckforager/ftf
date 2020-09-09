import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Map from '../dropIns/Map';
import MapSearch from '../dropIns/MapSearch';
import Constants from 'expo-constants';

export default function Tracker({ navigation }) {
  const [truckMarkers, setTruckMarkers] = useState([]);
  const [search, setSearch] = useState('');

  return (
    <View style={style.container}>
      <View style={style.search}>
        <MapSearch search={search} setSearch={setSearch} />
      </View>
      <View style={style.map}>
        <Map
          search={search}
          setSearch={setSearch}
          truckMarkers={truckMarkers}
          setTruckMarkers={setTruckMarkers}
        />
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
