import * as Google from 'expo-google-app-auth';
import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function GoogleLogIn({
  setIsUserLoggedIn,
  setIsTruckOwnerLoggedIn,
}) {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    console.log(accessToken);
  }, [accessToken]);

  const userConfig = {
    iosClientId: process.env.EXPO_iosClientId,
    androidClientId: process.env.EXPO_androidClientId,
    scopes: ['profile', 'email'],
  };

  const truckConfig = {
    iosClientId: process.env.EXPO_iosClientId,
    androidClientId: process.env.EXPO_androidClientId,
    scopes: ['profile', 'email'],
  };

  async function signUserInWithGoogleAsync(configuration: Object) {
    try {
      const result = await Google.logInAsync(configuration);
      if (result.type === 'success') {
        setAccessToken(result.accessToken);
        setIsUserLoggedIn(true);

        axios.post(`${process.env.EXPO_LocalLan}/user/new`, {
          fullName: result.user.name,
          googleId: result.user.id,
          profilePhotoUrl: result.user.photoUrl,
        })
          .then((response) => {
            console.log('response.data', response.data);
          })
          .catch((err) => console.error(err));
        return result.accessToken;
      }
      return { cancelled: true };
    } catch (e) {
      return { error: true };
    }
  }

  async function signTruckInWithGoogleAsync(configuration: Object) {
    try {
      const result = await Google.logInAsync(configuration);
      if (result.type === 'success') {
        setAccessToken(result.accessToken);
        setIsTruckOwnerLoggedIn(true);

        return result.accessToken;
      }
      return { cancelled: true };
    } catch (e) {
      return { error: true };
    }
  }

  const userSignIn = () => {
    signUserInWithGoogleAsync(userConfig);
  };

  const truckSignIn = () => {
    signTruckInWithGoogleAsync(truckConfig);
  };

  const logOut = async() => {
    const logOutConfig = {
      iosClientId: process.env.EXPO_iosClientId,
      androidClientId: process.env.EXPO_androidClientId,
    };

    await Google.logOutAsync({ accessToken, ...logOutConfig });
    console.log(accessToken);
    setAccessToken('');
    setIsUserLoggedIn(false);
    setIsTruckOwnerLoggedIn(false);
    console.log('you have been logged out');
  };

  return (
    <View style={styles.container}>
      <View>
        <Button title="Google User Sign In" onPress={userSignIn} />
      </View>
      <View>
        <Button title="Google Truck Owner Sign In" onPress={truckSignIn} />
      </View>
      <View>
        <Button title="logout" onPress={logOut} />
      </View>
    </View>
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
