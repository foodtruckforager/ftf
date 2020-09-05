import React, { useState, useEffect } from 'react';
import {
  Button, StyleSheet, Dimensions, TouchableOpacity, Alert,
} from 'react-native';

import MapView, { Marker, Callout, CalloutSubview } from 'react-native-maps';
import { Text, View } from '../themes/Themed';
import CustomCallout from './CustomCallout';
import InfoWindow from './InfoWindow';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 29.9990674;
const LONGITUDE = -90.0852767;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
const currentTruck = {
  id: 4,
  full_name: 'Rolling Fatties',
  phone_number: null,
  google_id: null,
  qr_code: null,
  logo: 'https://reactnative.dev/img/tiny_logo.png',
  food_genre: null,
  blurb: 'rolling fatties is the best',
  star_average: 5,
  open_time: null,
  close_time: null,
  latitude: null,
  longitude: null,
};

export default function Map({ provider }) {
  const [count, setCount] = useState(0);
  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [markers, setMarkers] = useState([
    {
      coordinate: {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE + SPACE,
      },
    },
    {
      coordinate: {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE - SPACE,
      },
    },
    {
      coordinate: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
    },
    {
      coordinate: {
        latitude: LATITUDE,
        longitude: LONGITUDE - SPACE / 2,
      },
    },
  ]);

  const [markerRefs, setMarkerRefs] = useState([
    {
      ref: null,
    },
    {
      ref: null,
    },
    {
      ref: null,
    },
    {
      ref: null,
    },
  ]);

  useEffect(() => {
    fetch(`${process.env.EXPO_LocalLan}/truck/`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
        // setMarkers([jsonResponse]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={provider}
        style={styles.map}
        initialRegion={region}
        zoomTapEnabled={false}
      >
        <Marker
          ref={(ref) => {
            const updateRef = markerRefs;
            updateRef[0].ref = ref;
            setMarkerRefs(updateRef);
          }}
          coordinate={markers[0].coordinate}
          title="Taqueria El Paraiso"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
        />
        <Marker coordinate={markers[1].coordinate}>
          <Callout style={styles.plainView}>
            <View>
              <Text>Taqueria El Poblano</Text>
            </View>
          </Callout>
        </Marker>
        <Marker
          coordinate={markers[2].coordinate}
          calloutOffset={{ x: -8, y: 28 }}
          calloutAnchor={{ x: 0.5, y: 0.4 }}
          ref={(ref) => {
            const updateRef = markerRefs;
            updateRef[1].ref = ref;
            setMarkerRefs(updateRef);
          }}
        >
          <Callout
            alphaHitTest
            tooltip
            onPress={(e) => {
              if (
                e.nativeEvent.action === 'marker-inside-overlay-press'
                || e.nativeEvent.action === 'callout-inside-press'
              ) {

              }
            }}
            style={styles.customView}
          >
            <CustomCallout>
              <InfoWindow currentTruck={currentTruck} />
              {/* <Text>{`Rollin Fatties, visited ${count} times`}</Text> */}
              {/* <CalloutSubview
                onPress={() => {
                  setCount(count + 1);
                }}
                style={[styles.calloutButton]}
              >
                <Text>Click me</Text>
              </CalloutSubview> */}
            </CustomCallout>
          </Callout>
        </Marker>
        <Marker
          ref={(ref) => {
            const updateRef = markerRefs;
            updateRef[3].ref = ref;
            setMarkerRefs(updateRef);
          }}
          coordinate={markers[3].coordinate}
          title="Queen on Wheels Foodtruck and Catering"
          description="Queen on Wheels is a food truck that deserves your utmost adoration and respect, cruising the streets of New Orleans and offering up some seriously good grub. Because let's face it, when hunger comes calling, there's really only one way to answer it, with good food on the go."
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  customView: {
    width: 140,
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
    backgroundColor: 'rgba(255,255,255,0.7)',
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
