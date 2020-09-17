import React, { useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, Button, AsyncStorage,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

export default function ScanQRCode() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [googleUserId, setGoogleUserId] = useState(null);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const retrieveCurrentUserId = async() => {
      try {
        let value = await AsyncStorage.getItem('userData');
        if (value !== null) {
          value = JSON.parse(value);
          setGoogleUserId(value.user.id);
        } else {
          console.log('user id not found');
        }
      } catch (error) {
        console.error(error);
      }
    };
    retrieveCurrentUserId();
  }, []);

  useEffect(() => {
    const getUserIdWithGoogleUserId = async() => {
      axios
        .get(`${process.env.EXPO_LocalLan}/user/googleId/${googleUserId}`)
        .then((response) => {
          if (response.data[0] !== undefined) {
            setUserId(+response.data[0].id);
          }
        })
        .catch((err) => console.log('CATCH: getUserIdWithGoogleUserId', err));
    };
    getUserIdWithGoogleUserId();
    console.log(googleUserId);
  }, [googleUserId]);

  useEffect(() => {
    (async() => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async({ type, data }:{ type: string, data: string }) => {
    setScanned(true);
    await axios.put(`${process.env.EXPO_LocalLan}/user/update/visits/${userId}/${data}`)
      .then((response) => {
        console.log('req.parmas scan', response);
      })
      .catch((err) => console.error(err));
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
      )}
    </View>
  );
}
