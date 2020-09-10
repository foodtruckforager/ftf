import React from 'react';
import * as Google from 'expo-google-app-auth';
import { View, Button, StyleSheet, AsyncStorage } from 'react-native';

const LogOut = ({
  // accessToken,
  setAccessToken,
  setIsUserLoggedIn,
  setIsTruckOwnerLoggedIn,
}) => {
  console.log('access token in logout', accessToken);
  let accessToken = '';

  const retrieveData = async() => {
    try {
      let value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        // We have data!!
        value = JSON.parse(value);
        accessToken = value.accessToken;
        console.log(accessToken);
      }
    } catch (error) {
      // Error retrieving data
      console.error(error);
    }
  };

  const handleLogout = async() => {
    const logOutConfig = {
      iosClientId: process.env.EXPO_iosClientId,
      androidClientId: process.env.EXPO_androidClientId,
    };

    console.log(accessToken);
    await Google.logOutAsync({ accessToken, ...logOutConfig });
    // setAccessToken('');
    // setIsUserLoggedIn(false);
    // setIsTruckOwnerLoggedIn(false);
    console.log('you have been logged out');
    // console.log('accessToken after logout', accessToken);
  };

  return (
    <View>
      <Button title="logout" onPress={handleLogout} />
      <Button title="get asyncstorage" onPress={retrieveData} />
    </View>
  );
};

export default LogOut;
