import React, { useState, useEffect } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import * as Google from 'expo-google-app-auth';
import GoogleLogIn from '../dropIns/GoogleLogIn';
import RootDrawerNavigator from '../routes/drawer';
import TruckOwnerLogin from './TruckOwnerLogin';
import PushNotifications from '../dropIns/PushNotifications';

export default function LogIn(props) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isTruckOwnerLoggedIn, setIsTruckOwnerLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [cameFromLogOut, setCameFromLogOut] = useState(null);

  useEffect(() => {
    if (Object.keys(props).length) {
      setCameFromLogOut(props.navigation.state.params.previous_screen);
    }
    retrieveData();
    setIsUserLoggedIn(false);
    setIsTruckOwnerLoggedIn(false);
  }, []);

  useEffect(() => {
    if (cameFromLogOut === 'LogOut') {
      handleLogout();
    }
  }, [accessToken]);

  const retrieveData = async() => {
    try {
      let value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        value = JSON.parse(value);
        setAccessToken(value.accessToken);
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
    await AsyncStorage.removeItem('ownerData');
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
        { isTruckOwnerLoggedIn && <TruckOwnerLogin /> }
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
