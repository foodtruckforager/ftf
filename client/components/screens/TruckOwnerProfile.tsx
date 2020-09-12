import React from 'react';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';
import TruckOwnerProfileEdit from './TruckOwnerProfileEdit';

const TruckOwnerProfile = ({ navigation }) => (
  <View>
    <Text> TruckOwner Profile </Text>
    <Button title="Edit" onPress={() => navigation.navigate('TruckOwnerProfileEdit')}> Click</Button>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TruckOwnerProfile;
