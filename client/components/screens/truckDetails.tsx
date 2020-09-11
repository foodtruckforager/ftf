import React from 'react';
import { StyleSheet, View, Text, Button, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import InfoWindow from '../dropIns/InfoWindow';
import foodIcons from '../../../assets/mapIcons.js';

export default function TruckDetails({ navigation }) {
  const currentTruck = navigation.state.params.params.currentTruck;
  const onDetails = navigation.state.params.params.onDetails || false;
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
  const LATITUDE = 29.9990674;
  const LONGITUDE = -90.0852767;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const region = {
    latitude: +latitude,
    longitude: +longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const pressHandler = () => {
    navigation.navigate(`TruckReviews`, {
      params: { currentTruck, id, navigation, onReviews: true },
    });
  };
  const pressHandlerPost = () => {
    navigation.navigate(`TruckPosts`, {
      params: { currentTruck, id, navigation, onPosts: true },
    });
  };
  return (
    <View style={style.container}>
      <View style={style.navigation}>
        <Button title="Reviews" onPress={pressHandler} />
        <Button title="Posts" onPress={pressHandlerPost} />
      </View>
      <View style={style.infoWindow}>
        <InfoWindow
          currentTruck={currentTruck}
          navigation={navigation}
          onDetails={onDetails}
        />
      </View>

      <View style={style.map}>
        <MapView
          style={style.innerMap}
          initialRegion={region}
          zoomTapEnabled={false}
          showsUserLocation={true}
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
  container: {
    flex: 1,
    padding: 24,
  },
  map: {
    flex: 0.4,
    // ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  innerMap: {
    ...StyleSheet.absoluteFillObject,
  },
  navigation: {
    flex: 0.1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  infoWindow: {
    flex: 0.4,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  customView: {
    width: 280,
    height: 140,
  },
});
