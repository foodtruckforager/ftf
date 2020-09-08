import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GoogleLogIn from './client/components/dropIns/GoogleLogIn';
import TruckDetails from './client/components/screens/truckDetails';
import TruckPosts from './client/components/screens/truckPosts';
import TruckReviews from './client/components/screens/truckReviews';
import RootDrawerNavigator from './client/components/routes/drawer';
import LogInStack from './client/components/routes/loginStack';
import TruckOwnerProfile from './client/components/screens/truckOwnerProfile';

export default function App() {
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
