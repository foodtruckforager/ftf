import React from 'react';
import * as Google from 'expo-google-app-auth';
import { View, Button, StyleSheet } from 'react-native';

const LogOut = ({
  accessToken,
  setAccessToken,
  setIsUserLoggedIn,
  setIsTruckOwnerLoggedIn,
}) => {
  console.log('access token in logout', accessToken);
  const handleLogout = async() => {
    const logOutConfig = {
      iosClientId: process.env.EXPO_iosClientId,
      androidClientId: process.env.EXPO_androidClientId,
    };

    await Google.logOutAsync({ accessToken, ...logOutConfig });
    console.log(accessToken);
    // setAccessToken('');
    setIsUserLoggedIn(false);
    setIsTruckOwnerLoggedIn(false);
    console.log('you have been logged out');
    console.log('accessToken after logout', accessToken);
  };

  return (
    <View>
      <Button title="logout" onPress={handleLogout} />
    </View>
  );
};

export default LogOut;
