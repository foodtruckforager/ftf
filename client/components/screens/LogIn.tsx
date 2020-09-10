import React, { useState, useEffect } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import * as Google from 'expo-google-app-auth';
import GoogleLogIn from '../dropIns/GoogleLogIn';
import RootDrawerNavigator from '../routes/drawer';
import TruckOwnerProfile from './truckOwnerProfile';
import PushNotifications from '../dropIns/PushNotifications';

export default function LogIn() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isTruckOwnerLoggedIn, setIsTruckOwnerLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    retrieveData();
    setIsUserLoggedIn(false);
    setIsTruckOwnerLoggedIn(false);
  }, []);

  useEffect(() => {
    handleLogout();
  }, [accessToken]);

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
    <><><PushNotifications /></>
      <>
        { (!isUserLoggedIn && !isTruckOwnerLoggedIn) && (
        <GoogleLogIn
          isUserLoggedIn={isUserLoggedIn}
          setIsUserLoggedIn={setIsUserLoggedIn}
          isTruckOwnerLoggedIn={isTruckOwnerLoggedIn}
          setIsTruckOwnerLoggedIn={setIsTruckOwnerLoggedIn}
          accessToken={accessToken}
          setAccessToken={setAccessToken}
        />
        )}
      </>
      <>
        { isUserLoggedIn && (
        <RootDrawerNavigator
          accessToken={accessToken}
          setAccessToken={setAccessToken}
        />
        ) }
        { isTruckOwnerLoggedIn && <TruckOwnerProfile /> }
      </>
    </>
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
