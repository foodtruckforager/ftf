import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  // Image,
  TouchableOpacity,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  Avatar,
  Badge,
  Card,
  Icon,
  withBadge,
  Image,
} from 'react-native-elements';
import { Callout } from 'react-native-maps';
import Constants from 'expo-constants';
import Thumbnail from './Thumbnail';

export default function InfoWindow({ currentTruck, navigation, onDetails }) {
  if (currentTruck) {
    const truncateBlurbBy = onDetails ? 9999 : 80;

    const truncate = (elem: string, limit: number, after: string) => {
      if (!elem || !limit) return;
      let content = elem.trim();
      content = `${content.slice(0, limit)}${after}`;
      return content;
    };
    const {
      full_name,
      blurb,
      logo,
      star_average,
      phone_number,
      food_genre,
      number_of_reviews,
      open_status,
      id,
    } = currentTruck;
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

    if (onDetails) {
      return (
        <Callout
          style={onDetails ? styles.customView : styles.customDetailsView}
          onPress={() => {
            const { id } = currentTruck;
            navigation.navigate('TruckDetails', {
              params: {
                currentTruck,
                id,
                navigation,
                onDetails: true,
              },
            });
          }}
        >
          <View>
            <Card containerStyle={{ width: 350, left: -50, right: 50 }}>
              <View style={styles.container}>
                <View style={styles.topRow}>
                  <Thumbnail logo={logo} />
                  <View style={styles.badge}>{openBadge()}</View>
                  <View style={styles.topRowText}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                      {`${truncate(full_name, 28, '')}`}
                    </Text>
                    {/* <Icon name="phone" size={30} color="#900" /> */}
                    <TouchableOpacity onPress={makeCall}>
                      <Text>
                        {String.fromCharCode(9990)}
                        {phone_number}
                      </Text>
                    </TouchableOpacity>
                    <Text>
                      {food_genre.charAt(0).toUpperCase()}
                      {food_genre.slice(1)}
                    </Text>
                    <View style={styles.stars}>
                      <Text style={{ color: 'orange' }}>
                        {String.fromCharCode(9733).repeat(
                          Math.floor(star_average)
                        )}
                      </Text>
                      <Text style={{ color: 'lightgrey' }}>
                        {String.fromCharCode(9733).repeat(
                          5 - Math.floor(star_average)
                        )}
                      </Text>
                      {/* <Text>{number_of_reviews} Reviews</Text> */}
                    </View>
                  </View>
                  <View>
                    <Text>{/* Distance */}</Text>
                  </View>
                </View>
              </View>
              <SafeAreaView>
                <ScrollView>
                  <Text style={styles.blurb}>{blurb}</Text>
                </ScrollView>
              </SafeAreaView>
            </Card>
          </View>
        </Callout>
      );
    }
    return (
      <Callout
        style={onDetails ? styles.customView : styles.customDetailsView}
        onPress={() => {
          const { id } = currentTruck;
          navigation.navigate('TruckDetails', {
            params: {
              currentTruck,
              id,
              navigation,
              onDetails: true,
            },
          });
        }}
      >
        <View>
          <View style={styles.container}>
            <View style={styles.topRow}>
              <Thumbnail logo={logo} />
              <View style={styles.badge}>{openBadge()}</View>
              <View style={styles.topRowText}>
                <View style={{ width: 150 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {`${truncate(full_name, 28, '')}`}
                  </Text>
                </View>
                {/* <Icon name="phone" size={30} color="#900" /> */}
                <TouchableOpacity onPress={makeCall}>
                  <Text>
                    {String.fromCharCode(9990)}
                    {phone_number}
                  </Text>
                </TouchableOpacity>
                <Text>
                  {food_genre.charAt(0).toUpperCase()}
                  {food_genre.slice(1)}
                </Text>
                <View style={styles.stars}>
                  <Text style={{ color: 'orange' }}>
                    {String.fromCharCode(9733).repeat(Math.floor(star_average))}
                  </Text>
                  <Text style={{ color: 'lightgrey' }}>
                    {String.fromCharCode(9733).repeat(
                      5 - Math.floor(star_average)
                    )}
                  </Text>
                  {/* <Text>{number_of_reviews} Reviews</Text> */}
                </View>
              </View>
              <View>
                <Text>{/* Distance */}</Text>
              </View>
            </View>
          </View>
          {/* <SafeAreaView>
                  <ScrollView> */}
          <View style={{ width: 285 }}>
            <Text style={styles.blurb}>{`${truncate(
              blurb,
              truncateBlurbBy,
              '...'
            )}`}</Text>
          </View>
          {/* </ScrollView>
                </SafeAreaView> */}
        </View>
      </Callout>
    );
  }
}

const styles = StyleSheet.create({
  customView: {
    width: 280,
    height: 140,
  },
  customDetailsView: {
    padding: 8,
    width: 420,
    height: 800,
  },
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
    right: 10,
    top: -10,
  },
  card: {
    width: 400,
  },
});
