import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GoogleLogIn from '../dropIns/GoogleLogIn';
import RootDrawerNavigator from '../routes/drawer';
import TruckOwnerProfile from './truckOwnerProfile';

export default function LogIn() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isTruckOwnerLoggedIn, setIsTruckOwnerLoggedIn] = useState(false);

  return (
    <>
      <>
        { (!isUserLoggedIn && !isTruckOwnerLoggedIn) && (
        <GoogleLogIn
          isUserLoggedIn={isUserLoggedIn}
          setIsUserLoggedIn={setIsUserLoggedIn}
          isTruckOwnerLoggedIn={isTruckOwnerLoggedIn}
          setIsTruckOwnerLoggedIn={setIsTruckOwnerLoggedIn}
        />
        )}
      </>
      <>
        { isUserLoggedIn && <RootDrawerNavigator /> }
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
