import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

export default function Search({ navigation }) {
  const searchHandler = () => {
    // reroute to search results, passing the data value from the
    // the search bar
    navigation.navigate('SearchResults', { value: value });
  };

  const [value, onChangeText] = React.useState('');

  return (
    <View>
      <Text> Search Screen </Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />
      <Button title='Search' onPress={searchHandler} />
    </View>
  );
}
