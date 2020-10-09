import React, { useState } from 'react';
import {
  StyleSheet, View, ActivityIndicator,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Constants from 'expo-constants';
import Map from '../dropIns/Map';
import MapSearch from '../dropIns/MapSearch';

export default function Tracker({ navigation }) {
  const [truckMarkers, setTruckMarkers] = useState([]);
  const [search, setSearch] = useState('');

  const { colors } = useTheme();

  const style = StyleSheet.create({
    container: {
      padding: 18,
      flex: 1,
      backgroundColor: colors.background,
      // flexDirection: 'row',
    },
    search: {
      // flex: 0.08,
      // flex: 1,
      // alignItems: 'stretch',
      // justifyContent: 'center',
      // flexDirection: 'row',
    },
    map: {
      flex: 0.92,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
    },
  });

  return (
    <View style={style.container}>
      <View style={style.search}>
        <MapSearch
          search={search}
          setSearch={setSearch}
          truckMarkers={truckMarkers}
        />
      </View>
      <View style={style.map}>
        <Map
          search={search}
          setSearch={setSearch}
          truckMarkers={truckMarkers}
          setTruckMarkers={setTruckMarkers}
          navigation={navigation}
        />
      </View>
    </View>
  );
}
