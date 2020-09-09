import React from 'react';
import { StyleSheet } from 'react-native';
import LogIn from './client/components/screens/LogIn';

export default function App() {
  return <LogIn />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
