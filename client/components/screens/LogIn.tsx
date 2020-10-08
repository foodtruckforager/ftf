import React, { useState, useEffect } from 'react';
import { StyleSheet, AsyncStorage, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import GoogleLogIn from '../dropIns/GoogleLogIn';
import RootDrawerNavigator from '../routes/drawer';
import TruckOwnerRouter from './TruckOwnerRouter';
import PushNotifications from '../dropIns/PushNotifications';

export default function LogIn(props) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isTruckOwnerLoggedIn, setIsTruckOwnerLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [ownerGoogleId, setOwnerGoogleId] = useState(null);
  const [cameFromLogOut, setCameFromLogout] = useState(null);

  useEffect(() => {
    if (Object.keys(props).length) {
      setCameFromLogout('LogOut');
    }
    retrieveData();
    setIsUserLoggedIn(false);
    setIsTruckOwnerLoggedIn(false);
  }, []);

  useEffect(() => {
    if (cameFromLogOut) {
      handleLogout();
      setCameFromLogout(null);
    }
  }, [accessToken]);

  useEffect(() => {
     console.log('isTruckOwnerLoggedIn', isTruckOwnerLoggedIn);
     console.log('google owner id in truckowner loggedin use  effect', ownerGoogleId)
  }, [isTruckOwnerLoggedIn]);

  const retrieveData = async() => {
    try {
      let userValue = await AsyncStorage.getItem('userData');
      if (userValue !== null) {
        userValue = JSON.parse(userValue);
        setAccessToken(userValue.accessToken);
      } else {
        console.log('user token not found');
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let ownerValue = await AsyncStorage.getItem('ownerData');
      if (ownerValue !== null) {
        ownerValue = JSON.parse(ownerValue);
        setAccessToken(ownerValue.accessToken);
      } else {
        console.log('owner token not found');
      }
    } catch (error) {
      console.log(error);
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
          setOwnerGoogleId={setOwnerGoogleId}
          accessToken={accessToken}
          setAccessToken={setAccessToken}
        />
        )}
      </>
      <>
      {/* <TruckOwnerRouter googleId={ownerGoogleId} />  */}
        { isUserLoggedIn && (
        <RootDrawerNavigator
          accessToken={accessToken}
          setAccessToken={setAccessToken}
        />
        ) }
        { (isTruckOwnerLoggedIn === true && ownerGoogleId !== null)
        && <TruckOwnerRouter googleId={ownerGoogleId} /> }
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
