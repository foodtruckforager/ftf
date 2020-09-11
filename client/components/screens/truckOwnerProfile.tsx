import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import TruckOwnerProfileEdit from './TruckOwnerProfileEdit';

export default function TruckOwnerProfile({ navigation }) {
  return (
    <View style={styles.container}>
      <Text> TruckOwner Profile </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
