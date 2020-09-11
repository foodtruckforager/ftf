import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Image } from 'react-native-elements';

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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  noTitle: {
    height: 0,
  },
});

const Thumbnail = ({ logo, title }) => (
  <View style={styles.container}>
    <Text style={title ? styles.title : styles.noTitle}>{title ? title : ''}</Text>
    <Image
      style={styles.tinyLogo}
      source={{
        uri: logo,
      }}
    />
  </View>
);

export default Thumbnail;
