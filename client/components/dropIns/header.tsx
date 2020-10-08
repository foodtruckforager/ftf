import React from 'react';
import {
  StyleSheet, Text, View, Image,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header({ navigation }) {
  const { colors } = useTheme();

  const openMenu = () => {
    navigation.openDrawer();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: colors.primary,
    },
    header: {
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.primary,
    },
    logo: {
      alignContent: 'flex-end',
    },
    headerText: {
      flex: 1,
      backgroundColor: colors.primary,
      fontWeight: 'bold',
      fontSize: 20,
      color: 'white',
      letterSpacing: 1,
      alignSelf: 'center',
      marginRight: 65,
    },
    icon: {
      alignContent: 'flex-start',
      backgroundColor: colors.primary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ backgroundColor: colors.primary }}>
          <MaterialIcons
            name="menu"
            size={28}
            onPress={openMenu}
            style={{ color: 'white' }}
          />
        </View>
        <View style={{ backgroundColor: colors.primary }}>
          <Text style={styles.headerText}> Food Truck Forager </Text>
        </View>
      </View>
    </View>
  );
}
