import React from 'react';
import {
  StyleSheet, Text, View, Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header({ navigation }) {
  const openMenu = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.outer}>

      <View style={styles.header}>
        <MaterialIcons
          name="menu"
          size={28}
          onPress={openMenu}
          style={styles.icon}
        />
        <View>
          <Text style={styles.headerText}> Food Truck Forager </Text>
        </View>
        <Image
          source={require('../../../assets/foodtruckstillsmall.png')}
          style={styles.logo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // flex: 5,
  },
  logo: {
    // right: -50,
    alignContent: 'flex-end',
  },
  headerText: {
    // flex: 1,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
    textAlign: 'center',
    // paddingBottom: 10,
  },
  icon: {
    // position: 'absolute',
    // left: -50,
    alignContent: 'flex-start',
  },
  outer: {
    // paddingTop: 100,
    // paddingBottom: 100,
    // position: 'absolute',
    flexDirection: 'row',
    // flex: 2,
  },
});
