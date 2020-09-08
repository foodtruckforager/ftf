import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LogIn from './client/components/screens/LogIn';

export default function App() {
  return (
    <LogIn />
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
