import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';

import MapView, { Marker, Callout } from 'react-native-maps';
import { View } from '../themes/Themed';
import InfoWindow from './InfoWindow';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 29.9990674;
const LONGITUDE = -90.0852767;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const foodIcons = {
  mexican: 'http://www.myiconfinder.com/uploads/iconsets/64-64-ae3644852016062df814998796ff33ee.png',
  thai: 'http://www.myiconfinder.com/uploads/iconsets/64-64-c654ee76ae877fc15cdb875c8967340a.png',
  vietnamese: 'http://www.myiconfinder.com/uploads/iconsets/64-64-dfd2711db65faec35f04cd584e0bbafe.png',
  american: 'http://www.myiconfinder.com/uploads/iconsets/64-64-b030adac9955cf87d7abe3e5f2106d90.png',
  southern: 'http://www.myiconfinder.com/uploads/iconsets/64-64-1359518671313df152c737d1139a62ba.png',
  french: 'http://www.myiconfinder.com/uploads/iconsets/64-64-6b0328c200de412cca7196d0e552b6fe.png',
  barbecue: 'http://www.myiconfinder.com/uploads/iconsets/64-64-01d44b233ea2287e8b8776a5e7fec0d3.png',
  mediterranean: 'http://www.myiconfinder.com/uploads/iconsets/64-64-1ac2c860f7eaf21a46cdbf3c203e220c-grapes.png',
}
export default function Map({
  provider,
  truckMarkers,
  setTruckMarkers,
  search,
  setSearch,
}) {
  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const getAllTrucks = () => {
    axios
      .get(`${process.env.EXPO_LocalLan}/truck/`)
      .then((response) => {
        const { data } = response;
        setTruckMarkers(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    getAllTrucks();
  }, []);

  // search bar search
  useEffect(() => {
    if (search !== '') {
      axios
        .get(`${process.env.EXPO_LocalLan}/truck/search/${search}`)
        .then((response) => {
          const { data } = response;
          if (data.length) {
            setTruckMarkers([]);
            setTruckMarkers(data);
          } else {
            getAllTrucks();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [search]);

  return (
    <View style={styles.container}>
      <MapView
        provider={provider}
        style={styles.map}
        initialRegion={region}
        zoomTapEnabled={false}
      >
        {truckMarkers &&
          truckMarkers.map((currentTruck) => (
            <View key={currentTruck.id}>
              <Marker
                coordinate={{
                  latitude: +currentTruck.latitude,
                  longitude: +currentTruck.longitude,
                }}
                image={foodIcons[currentTruck.food_genre]}
              >
                <Callout style={styles.customView}>
                  <View>
                    <InfoWindow currentTruck={currentTruck} />
                  </View>
                </Callout>
              </Marker>
            </View>
          ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  customView: {
    width: 280,
    height: 140,
  },
  plainView: {
    width: 60,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(70,70,70,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  calloutButton: {
    width: 'auto',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
