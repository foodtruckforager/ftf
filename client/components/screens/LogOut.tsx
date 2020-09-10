import React, { useState, useEffect } from 'react';
import * as Google from 'expo-google-app-auth';
import { View, Button, StyleSheet, AsyncStorage } from 'react-native';
import RNRestart from 'react-native-restart';

const LogOut = () => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    retrieveData();
    console.log('token in useEffect', accessToken);
  }, []);

  const retrieveData = async() => {
    try {
      let value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        value = JSON.parse(value);
        setAccessToken(value.accessToken);
        console.log(accessToken);
      } else {
        console.log('user token not found');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async() => {
    const logOutConfig = {
      iosClientId: process.env.EXPO_iosClientId,
      androidClientId: process.env.EXPO_androidClientId,
    };

    await Google.logOutAsync({ accessToken, ...logOutConfig });
    await AsyncStorage.removeItem('userData');
    setAccessToken('');
    console.log('you have been logged out');
  };

  return (
    <View>
      <Button title="logout" onPress={handleLogout} />
      <Button title="get asyncstorage" onPress={retrieveData} />
    </View>
  );
};

export default LogOut;
