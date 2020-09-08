import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GoogleLogIn from '../dropIns/GoogleLogIn';
import RootDrawerNavigator from '../routes/drawer';
import TruckOwnerProfile from './truckOwnerProfile';

export default function LogIn() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isTruckOwnerLoggedIn, setIsTruckOwnerLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  return (
    <>
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
