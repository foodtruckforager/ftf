import React from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

const TruckOwnerLogin = () => {
  return (
    <View>
      <Text>Login In to Your Account Here</Text>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
    </View>
  )
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default TruckOwnerLogin;
