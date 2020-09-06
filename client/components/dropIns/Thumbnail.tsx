import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

const Thumbnail = ({ logo }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: logo,
        }}
      />
    </View>
  );
};

export default Thumbnail;
