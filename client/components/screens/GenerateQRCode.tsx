import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { QRCode as CustomQRCode } from 'react-native-custom-qr-codes-expo';

export default function GenerateQRCode() {
  let logoFromFile = require('../../../assets/favicon.png');
  return (
    <View style={styles.container}>
      <CustomQRCode
        value="Just some string value"
        content="QR code with circles"
        logo={logoFromFile}
      />
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
