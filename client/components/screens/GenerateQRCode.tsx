import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { QRCode as CustomQRCode } from 'react-native-custom-qr-codes-expo';
import SvgQRCode from 'react-native-qrcode-svg';

export default function GenerateQRCode({ navigation, route }) {
  console.log('generate qr code', route);
  let logoFromFile = require('../../../assets/foodtruckstill.png');

  const navigateToProfile = () => {
    navigation.navigate('TruckOwnerProfile');
  };

  function Simple() {
    return <SvgQRCode value="http://example.com" />;
  }

  return (
    <View style={styles.container}>
      {/* <Simple /> */}
      <CustomQRCode
        linearGradient={['blue']}
        content={route.params.truckId.toString()}
      />
      <Button title="Profile" onPress={navigateToProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
});
