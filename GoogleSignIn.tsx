import * as Google from 'expo-google-app-auth';
import React from 'react';
import { Text } from 'react-native';
import Expo from 'expo';

export default function GoogleSignIn() {
  const config = {
    // iosClientId: '438690718870-b2j6pnvf1lnoga3uo0neoglh8jiedljs.apps.googleusercontent.com',
    // androidClientId: '438690718870-f4th8brfn0r3dc1u9bdiau1llb4l5ilq.apps.googleusercontent.com',
    iosClientId: process.env.EXPO_iosClientId,
    androidClientId: process.env.EXPO_androidClientId,
    scopes: ['profile', 'email'],
  };

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync(config);
      console.log(result);
      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
  signInWithGoogleAsync();
  return <Text>Hello Sally</Text>;
}
