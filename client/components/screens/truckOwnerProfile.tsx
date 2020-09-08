import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import RootDrawerNavigator from '../routes/drawer';

//TODO : Determine how truck owner profile
// will link up with routing, how to see, what Google SignIN will do
export default function TruckOwnerProfile({ navigation }) {
  // const pressHandler = () => {
  //   navigation.navigate('TruckOwnerProfile');
  // };
  return (
    <View style={styles.container}>
      {/* <RootDrawerNavigator /> */}
      <Text> TruckOwner </Text>
      {/* <Button title='Truck Profile' onPress={pressHandler}></Button> */}
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
