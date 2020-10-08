import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useTheme } from 'react-native-paper';
import { QRCode as CustomQRCode } from 'react-native-custom-qr-codes-expo';
import SvgQRCode from 'react-native-qrcode-svg';

export default function GenerateQRCode({ navigation, route }) {
  console.log('generate qr code', route);
  let logoFromFile = require('../../../assets/foodtruckstill.png');

  const { colors } = useTheme();

  const navigateToProfile = () => {
    navigation.navigate('TruckOwnerProfile');
  };

  function Simple() {
    return <SvgQRCode value="http://example.com" />;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-around',
      paddingTop: 20,
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    button: {
      borderRadius: 30,
      width: 200,
      height: 50,
      marginBottom: 50,
      backgroundColor: colors.button,
    },
  });

  return (
    <View style={styles.container}>
      {/* <Simple /> */}
      <CustomQRCode
        linearGradient={['blue']}
        content={route.params.truckId.toString()}
      />
      <Button title="Profile" onPress={navigateToProfile} buttonStyle={styles.button} />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'space-around',
//     paddingTop: 20,
//     alignItems: 'center',
//     backgroundColor: '#ecf0f1',
//   },
//   button: {
//     borderRadius: 30,
//     width: 200,
//     height: 50,
//     marginBottom: 50,
//   },
// });
