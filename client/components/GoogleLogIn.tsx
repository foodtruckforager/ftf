import * as Google from 'expo-google-app-auth';
import React, { useState } from 'react';
import { View, Button } from 'react-native';

export default function GoogleLogIn() {
  const [accessToken, setAccessToken] = useState('');

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

  async function signInWithGoogleAsync(configuration: Object) {
    try {
      const result = await Google.logInAsync(configuration);
      if (result.type === 'success') {
        setAccessToken(result.accessToken);
        return result.accessToken;
      }
      return { cancelled: true };
    } catch (e) {
      return { error: true };
    }
  }
  const userSignIn = () => {
    signInWithGoogleAsync(userConfig);
  };

  const truckSignIn = () => {
    signInWithGoogleAsync(truckConfig);
  };

  const logOut = async() => {
    const logOutConfig = {
      iosClientId: process.env.EXPO_iosClientId,
      androidClientId: process.env.EXPO_androidClientId,
    };

    await Google.logOutAsync({ accessToken, ...logOutConfig });
    setAccessToken('');
    console.log('you have been logged out');
  };

  return (
    <View>
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
