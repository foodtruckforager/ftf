import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';

export default function MapSearch({ search, setSearch, truckMarkers }) {
  const styles = StyleSheet.create({
    spinner: {
      alignSelf: 'flex-end',
      right: 45,
      bottom: 40,
      position: 'absolute',
    },
  });
  return (
    <View>
      <Input
        placeholder="Search by Cuisine or Truck..."
        onChangeText={(text) => setSearch(text.toLowerCase())}
        value={search}
        leftIcon={{ type: 'material', name: 'search', color: 'grey' }}
      />
      <View style={styles.spinner}>
        {!truckMarkers.length && <ActivityIndicator size="small" />}
      </View>
    </View>
  );
}
