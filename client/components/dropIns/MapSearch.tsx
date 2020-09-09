import React from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';

export default function MapSearch({ search, setSearch }) {
  return (
    <View>
      <Input
        placeholder="Search by Type of Food..."
        onChangeText={(text) => setSearch(text.toLowerCase())}
        value={search}
        leftIcon={{ type: 'material', name: 'search' }}
      />
    </View>
  );
}
