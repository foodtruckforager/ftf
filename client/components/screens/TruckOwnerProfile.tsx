import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import TruckOwnerProfileEdit from './TruckOwnerProfileEdit';

const TruckOwnerProfile = ({ ownerGooleId }) => {
  return (
    <View style={styles.container}>
      <Text> TruckOwner Profile </Text>
      <Button title="button in profile" onPress={() => console.log('profile')}>Profile button</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TruckOwnerProfile;
