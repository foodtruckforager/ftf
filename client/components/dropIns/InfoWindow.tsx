import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Linking, Platform, } from 'react-native';
import Thumbnail from './Thumbnail';

const styles = StyleSheet.create({
  container: {
    // paddingTop: 40,
    // backgroundColor: '#ddd',
  },
  topRow: {
    flexDirection: 'row',

  },
  topRowText: {
    flexDirection: 'column',
    paddingLeft: 10,
  },
  middleDistanceLine: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  stars: {
    flexDirection: 'row',
  },
  blurb: {
    flexWrap: 'wrap',
  },
  style: {
    paddingLeft: 10,
  },
});
export default function InfoWindow({ currentTruck }) {
  const truncate = (elem: string, limit: number, after: string) => {
    if (!elem || !limit) return;
    let content = elem.trim();
    content = `${content.slice(0, limit)}${after}`;
    return content;
  };
  const { full_name, blurb, logo, star_average, phone_number, food_genre } = currentTruck;
  // name, thumbnail, phone number, genre, distance, food pic, blurb, stars
  // for calling
  const tele = phone_number;
  // for display
  
  // let teleDisplay = phone_number
  //   if (tele.length === 7) {
  //     teleDisplay = `1 (225) ${teleDisplay.slice(0, 3)}-${teleDisplay.slice(3, 6)}`;
  //   } else if (tele.length === 10) {
  //     teleDisplay = `1 (${teleDisplay.slice(0, 3)}) ${teleDisplay.slice(3, 6)}-${teleDisplay.slice(7)}`;
  //   }
  

  function dialCall() {
    let phoneNumber = tele;
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${phoneNumber}`;
    }
    Linking.openURL(phoneNumber);
  }

  return (
    <View>
      <View
        style={styles.container}
      >
        <View
          style={styles.topRow}
        >
          <Thumbnail logo={logo} />
          <View
            style={styles.topRowText}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{`${truncate(
              full_name,
              28,
              '',
            )}`}
            </Text>
            <Text>
              {phone_number}
            </Text>
            <Text>
              {food_genre}
            </Text>
          <View style={styles.stars}>
            <Text style={{ color: 'orange' }}>
              {String.fromCharCode(9733).repeat(Math.floor(star_average))}
            </Text>
            <Text style={{ color: 'lightgrey' }}>
              {String.fromCharCode(9733).repeat(5 - Math.floor(star_average))}
            </Text>
            <Text style={styles.reviews}>
              #0 reviews
            </Text>
          </View>
          </View>
          <View>
            <Text>
              {/* Distance */}
            </Text>

          </View>
          {/* phone_number
            food_genre */}
        </View>
        <View style={styles.middleDistanceLine}>

          {/* <Text>Distance</Text> */}
        </View>
      </View>
      <Text style={styles.blurb}>{`${truncate(blurb, 80, '...')}`}</Text>
    </View>
  );
}
