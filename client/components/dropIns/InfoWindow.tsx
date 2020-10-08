import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Badge, Card } from 'react-native-elements';
import { useTheme } from 'react-native-paper';
import { Callout } from 'react-native-maps';
import Thumbnail from './Thumbnail';

export default function InfoWindow({ currentTruck, navigation, onDetails }) {
  if (currentTruck) {
    const [currentTruckAverageRating, setCurrentTruckAverageRating] = useState(
      0,
    );
    const [
      currentTruckNumberOfReviews,
      setCurrentTruckNumberOfReviews,
    ] = useState(0);

    const getTruckReviews = async() => {
      axios
        .get(`${process.env.EXPO_LocalLan}/truck/review/${id}`)
        .then((response) => {
          const { data } = response;
          const ratings = data.map((review: Object) => +review.review_star);
          const numberOfReviews = ratings.length;
          const average = ratings.reduce((a: Number, b: Number) => a + b) / numberOfReviews;
          setCurrentTruckAverageRating(average);
          setCurrentTruckNumberOfReviews(numberOfReviews);
        })
        .catch((err) => console.log(err));
    };
    useEffect(() => {
      getTruckReviews();
    }, []);

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
      phone_number,
      food_genre,
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

    const { colors } = useTheme();

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
      cardContainer: {
        width: 350,
        left: -50,
        right: 50,
        backgroundColor: colors.background,
      },
      detailsContainer: {
        paddingTop: 10,
        backgroundColor: colors.background,
      },
      trackerContainer: {
        paddingTop: 10,
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
      badge: {
        right: 10,
        top: -10,
      },
      card: {
        width: 400,
      },
    });

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
            <Card containerStyle={styles.cardContainer}>
              <View style={styles.detailsContainer}>
                <View style={styles.topRow}>
                  <Thumbnail logo={logo} />
                  <View style={styles.badge}>{openBadge()}</View>
                  <View style={styles.topRowText}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                      {`${truncate(full_name, 28, '')}`}
                    </Text>
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
                          Math.floor(currentTruckAverageRating),
                        )}
                      </Text>
                      <Text style={{ color: 'black' }}>
                        {String.fromCharCode(9733).repeat(
                          5 - Math.floor(currentTruckAverageRating),
                        )}
                      </Text>
                      <Text>  ({currentTruckNumberOfReviews} Reviews)</Text>
                    </View>
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
      // <View>
      <Callout
      // containerStyle={{backgroundColor: colors.background}}
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
          <View style={styles.trackerContainer}>
            <View style={styles.topRow}>
              <Thumbnail logo={logo} />
              <View style={styles.badge}>{openBadge()}</View>
              <View style={styles.topRowText}>
                <View style={{ width: 150 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {`${truncate(full_name, 28, '')}`}
                  </Text>
                </View>
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
                      Math.floor(currentTruckAverageRating),
                    )}
                  </Text>
                  <Text style={{ color: 'lightgrey' }}>
                    {String.fromCharCode(9733).repeat(
                      5 - Math.floor(currentTruckAverageRating),
                    )}
                  </Text>
                  <Text>  ({currentTruckNumberOfReviews} Reviews)</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ width: 285 }}>
            <Text style={styles.blurb}>{`${truncate(
              blurb,
              truncateBlurbBy,
              '...',
            )}`}
            </Text>
          </View>
        </View>
      </Callout>
      // </View>
    );
  }
}
