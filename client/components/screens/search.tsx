import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

export default function Search({ navigation }) {
  const [value, onChangeText] = React.useState('');
  // Commented out for MVP, implement long-term Undefined Solution afterwards
  // const searchHandler = () => {
  //   navigation.navigate('SearchResults', { value });
  // };

  return (
    <View>
      <Text> Search Screen </Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />
      <Button
        title="Search"
        onPress={() => {
          if (value.trim() === '') {
            alert(JSON.stringify('Please enter Search Criteria'));
          } else {
            navigation.navigate('SearchResults', { value });
          }
        }}
      />
    </View>
  );
}
