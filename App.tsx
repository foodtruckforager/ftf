import * as React from 'react';
import color from 'color';
import { StyleSheet } from 'react-native';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import LogIn from './client/components/screens/LogIn';

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      accent: 'yellow',
    },
  };

  const customTheme = {
    dark: false,
    roundness: 15,
    colors: {
      ...DefaultTheme.colors,
      primary: '#2DC86E', // header, lighter emerald green
      loginScreen: '#27AE5F', // gif color, sea green
      accent: '#03dac4',
      background: '#BCD6F0', // screen background, light blue
      backgroundCard: '#384E77', // dark blue
      button: '#384E77',
      backgroundMap: '#384E77',
      surface: 'white',
      error: '#B00020',
      text: 'black',
      onBackground: '#000000',
      onSurface: '#000000',
      // disabled: color(black).alpha(0.26).rgb().string(),
      // placeholder: color(black).alpha(0.54).rgb().string(),
      // backdrop: color(black).alpha(0.5).rgb().string(),
      // notification: pinkA400,
    },
    fonts: configureFonts(),
    animation: {
      scale: 1.0,
    },
  };

  return (
    <PaperProvider theme={customTheme}>
      <LogIn />
    </PaperProvider>
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
