import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Linking, Platform, } from 'react-native';
// import Icon from 'react-native-vector-icons';
import Thumbnail from './Thumbnail';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements';
// import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
  },
  style: {
    paddingLeft: 10,
  },
  badge: {
    // position: 'absolute',
    right: 10,
    top: -10,
  },
});

export default function InfoWindow({ currentTruck }) {
  const truncate = (elem: string, limit: number, after: string) => {
    if (!elem || !limit) return;
    let content = elem.trim();
    content = `${content.slice(0, limit)}${after}`;
    return content;
  };
  const { full_name, blurb, logo, star_average, phone_number, food_genre, number_of_reviews, open_status } = currentTruck;
  const openBadge = () => {
    if (open_status) {
      return (
        <View>
          <Badge value=" " status="success" />
        </View>
      );
    }
    return (
      <View>
        <Badge value=" " status="error" />
      </View>
    );
  };
  const makeCall = () => {
    let phoneNumber = phone_number;
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${phoneNumber}';
    } else {
      phoneNumber = 'telprompt:${phoneNumber}';
    }
    Linking.openURL(phoneNumber);
  };
  return (
    <View>
      <View
        style={styles.container}
      >
        <View
          style={styles.topRow}
        >
          <Thumbnail logo={logo} />
          <View style={styles.badge}>
            {openBadge()}
          </View>
          <View
            style={styles.topRowText}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{`${truncate(
              full_name,
              28,
              '',
            )}`}
            </Text>
            {/* <Icon name="phone" size={30} color="#900" /> */}
            <TouchableOpacity onPress={makeCall}>
              <Text>
                {String.fromCharCode(9990)}{phone_number}
              </Text>
            </TouchableOpacity>
            <Text>
              {food_genre.charAt(0).toUpperCase()}{food_genre.slice(1)}
            </Text>
            <View style={styles.stars}>
              <Text style={{ color: 'orange' }}>
                {String.fromCharCode(9733).repeat(Math.floor(star_average))}
              </Text>
              <Text style={{ color: 'lightgrey' }}>
                {String.fromCharCode(9733).repeat(5 - Math.floor(star_average))}
              </Text>
              <Text style={styles.reviews}>
                {number_of_reviews} Reviews
              </Text>
            </View>
          </View>
          <View>
            <Text>
              {/* Distance */}
            </Text>

          </View>
        </View>
      </View>
      <Text style={styles.blurb}>{`${truncate(blurb, 80, '...')}`}</Text>
    </View>
  );
}
