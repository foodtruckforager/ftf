import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    alignItems: 'center',
  },
  tinyLogo: {
    width: 90,
    height: 70,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

const Thumbnail = ({ logo }) => (
  <View style={styles.container}>
    <Image
      style={styles.tinyLogo}
      source={{
        uri: logo,
      }}
    />
  </View>
);

export default Thumbnail;
