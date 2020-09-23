import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  StyleSheet, View, AsyncStorage, Dimensions,
} from 'react-native';
import { Button, Icon, Card } from 'react-native-elements';
import MapView, { Marker, Callout } from 'react-native-maps';
import InfoWindow from '../dropIns/InfoWindow';
import foodIcons from '../../../assets/mapIcons.js';

export default function TruckDetails({ navigation }) {
  const { currentTruck } = navigation.state.params.params;
  const onDetails = navigation.state.params.params.onDetails || false;
  const [favorite, setFavorite] = useState(false);
  const [googleUserId, setGoogleUserId] = useState(null);
  const [userId, setUserId] = useState('');
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
    latitude,
    longitude,
  } = currentTruck;
  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const region = {
    latitude: +latitude,
    longitude: +longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  useEffect(() => {
    const retrieveCurrentUserId = async() => {
      try {
        let value = await AsyncStorage.getItem('userData');
        if (value !== null) {
          value = JSON.parse(value);
          setGoogleUserId(value.user.id);
        } else {
          console.log('user id not found');
        }
      } catch (error) {
        console.error(error);
      }
    };
    retrieveCurrentUserId();
  }, []);

  useEffect(() => {
    const getUserIdWithGoogleUserId = async() => {
      axios
        .get(`${process.env.EXPO_LocalLan}/user/googleId/${googleUserId}`)
        .then((response) => {
          if (response.data[0] !== undefined) {
            setUserId(response.data[0].id);
          }
        })
        .catch((err) => console.error(err));
    };
    getUserIdWithGoogleUserId();
  }, [googleUserId]);

  useEffect(() => {
    const retrieveCurrentUserFavorites = async() => {
      axios
        .get(`${process.env.EXPO_LocalLan}/user/favorites/${userId}`)
        .then((response) => {
          const { data } = response;
          const { length } = data;
          if (length) {
            if (data.id !== undefined) {
              setFavorite(data.id);
            }
          }
        })
        .catch((err) => console.error(err));
    };
    if (userId) {
      retrieveCurrentUserFavorites();
      const createUserFavorite = async() => {
        axios
          .post(
            `${process.env.EXPO_LocalLan}/user/update/favoritetruck/add/${userId}/${id}`,
          )
          .then(() => {
          })
          .catch((err) => {
            console.log(err);
          });
      };
      createUserFavorite();
    }
  }, [userId]);

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  useEffect(() => {
    const updateUserFavorite = async() => {
      const favoriteRemove = favorite ? 'favorite' : 'remove';
      axios
        .put(
          `${process.env.EXPO_LocalLan}/user/update/favoritetruck/${favoriteRemove}/${userId}/${id}`,
        )
        .then((response) => {
          console.log(`updateUserFavorite: ${favoriteRemove}/${userId}/${id}`);
        })
        .catch((err) => console.error(err));
    };
    if (userId) {
      updateUserFavorite();
    }
  }, [favorite]);

  const pressHandler = () => {
    navigation.navigate('TruckReviews', {
      params: {
        currentTruck, id, navigation, onReviews: true, onDetails: true,
      },
    });
  };
  const pressHandlerPost = () => {
    navigation.navigate('TruckPosts', {
      params: {
        currentTruck, id, navigation, onPosts: true, onDetails: true,
      },
    });
  };
  return (
    <View style={style.container}>
      <View style={style.buttonsContainer}>
        <View style={style.buttonContainer}>
          <Button title="Reviews" onPress={pressHandler} />
        </View>
        <View style={style.buttonContainer}>
          <Button
            title="Details"
            buttonStyle={{
              backgroundColor: 'darkblue',
            }}
            onPress={() => {}}
          />
        </View>
        <View style={style.buttonContainer}>
          <Button title="Posts" onPress={pressHandlerPost} />
        </View>
      </View>
      {/* <Card> */}
      <View style={style.infoWindowShell}>
        <InfoWindow
          currentTruck={currentTruck}
          navigation={navigation}
          onDetails={onDetails}
          style={style.infoWindow}
        />
        <View style={style.favorite}>
          {favorite ? (
            <Icon
              raised
              name="heart"
              type="font-awesome"
              color="#f50"
              onPress={toggleFavorite}
            />
          ) : (
            <Icon
              raised
              name="heart"
              type="font-awesome"
              color="gray"
              onPress={toggleFavorite}
            />
          )}
        </View>
      </View>
      {/* </Card> */}
      <View style={style.buffer} />
      <View style={style.map}>
        <MapView
          style={style.innerMap}
          initialRegion={region}
          zoomTapEnabled={false}
          showsUserLocation
          followsUserLocation={false}
        >
          <View key={id}>
            <Marker
              coordinate={{
                latitude: +latitude,
                longitude: +longitude,
              }}
              image={foodIcons[food_genre]}
            >
              <Callout style={style.customView}>
                <View>
                  <InfoWindow
                    currentTruck={currentTruck}
                    navigation={navigation}
                  />
                </View>
              </Callout>
            </Marker>
          </View>
        </MapView>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  tabOutline: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
  },
  buffer: {
    // padding:10
  },
  container: {
    flex: 1,
    padding: 10,
  },
  map: {
    flex: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 100,
  },
  innerMap: {
    ...StyleSheet.absoluteFillObject,
  },
  navigation: {
    flex: 0.5,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  favorite: {
    width: 260,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  infoWindow: {
    flex: 1,
    flexGrow: 10,
  },
  customView: {
    width: 280,
    height: 140,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    alignItems: 'flex-end',
    paddingLeft: 40,
    paddingRight: 40,
  },
  infoWindowShell: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    // marginBottom: 100,
    // paddingBottom: 100,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: -20,
  },
  buttonContainer: {
    paddingBottom: 10,
    flex: 1,
    paddingHorizontal: 1,
  },
});
