import { SearchBar } from 'react-native-elements';
import axios from 'axios';

import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

export default function MapSearch({ search, setSearch }) {

  return (
    <View>
      <SearchBar
        placeholder="Search by food type..."
        onChangeText={(text) => setSearch(text)}
        value={search}
        lightTheme={true}
      />
    </View>
  );
}
