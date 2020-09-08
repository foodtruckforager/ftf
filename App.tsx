import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GoogleLogIn from './client/components/dropIns/GoogleLogIn';
import RootDrawerNavigator from './client/components/routes/drawer';
import TruckOwnerProfile from './client/components/screens/truckOwnerProfile';
import LogIn from './client/components/screens/LogIn';

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isTruckOwnerLoggedIn, setIsTruckOwnerLoggedIn] = useState(false);

  return (
    <LogIn />
    // <>
    //   <>
    //     { (!isUserLoggedIn && !isTruckOwnerLoggedIn) && (
    //     <GoogleLogIn
    //       isUserLoggedIn={isUserLoggedIn}
    //       setIsUserLoggedIn={setIsUserLoggedIn}
    //       isTruckOwnerLoggedIn={isTruckOwnerLoggedIn}
    //       setIsTruckOwnerLoggedIn={setIsTruckOwnerLoggedIn}
    //     />
    //     )}
    //   </>
    //   <>
    //     { isUserLoggedIn && <RootDrawerNavigator /> }
    //     { isTruckOwnerLoggedIn && <TruckOwnerProfile /> }
    //   </>
    // </>
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
