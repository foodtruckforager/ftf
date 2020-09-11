import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header({ navigation }) {
  const openMenu = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.outer}>

    <View style={styles.header}>
      <MaterialIcons
        name='menu'
        size={28}
        onPress={openMenu}
        style={styles.icon}
        />
      <View>
        <Text style={styles.headerText}> Food Truck Tracker </Text>
      </View>
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
    justifyContent: 'center',
    // flex: 5,
  },
  headerText: {
    // flex: 1,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
    // paddingBottom: 10,
  },
  icon: {
    // position: 'absolute',
    // left: 0,
  },
  outer: {
    // paddingTop: 100,
    // paddingBottom: 100,
    // position: 'absolute',
    flexDirection: 'row',
    // flex: 2,
  },
});
