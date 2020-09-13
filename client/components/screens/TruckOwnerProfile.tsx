import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';

const TruckOwnerProfile = ({ navigation, route }) => {
  console.log(' navigation in profile', navigation);
  console.log(' route in profile', route.params.googleId);
  const []
  return (
    <View>
      <Text> TruckOwner Profile </Text>
      <Button title="Edit" onPress={() => navigation.navigate('TruckOwnerProfileEdit')}> Click</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TruckOwnerProfile;
