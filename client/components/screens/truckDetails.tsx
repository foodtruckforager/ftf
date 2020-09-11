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
        <View style={style.tabs}>
          <View style={style.tabOutline}>
            <Button title="Reviews" onPress={pressHandler} style={style.buttonTabs} />    
          </View>
          <View style={style.tabOutline}>
            <Button title="Posts" onPress={pressHandlerPost} style={style.buttonTabs}/>
          </View>
        </View>
      </View>
      <View style={style.infoWindowShell} >
        <InfoWindow
          currentTruck={currentTruck}
          navigation={navigation}
          onDetails={onDetails}
          style={style.infoWindow}
        />
      </View>
      <View style={style.buffer}/>
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
  tabOutline: {
    backgroundColor: 'lightgrey',
    borderRadius: 10
  },
  buffer: {
    // padding:10
  },
  container: {
    flex: 1,
    padding: 10,
    // width: '100%',
    // height: '100%',
    // backgroundColor: 'blue'
  },
  map: {
    flex: 6,
    // ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // paddingTop: 200
  },
  innerMap: {
    ...StyleSheet.absoluteFillObject,
  },
  navigation: {
    flex: 0.5,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
    // backgroundColor: 'red'
  },
  infoWindow: {
    flex: 1,
    // backgroundColor: 'pink',
    flexGrow: 10,
    // alignSelf: 'stretch'
  },
  customView: {
    width: 280,
    height: 140,
    // backgroundColor: 'yellow',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // justifyContent: 'flex-end',
    flex: 1,
    // backgroundColor: 'orange',
    alignItems: 'flex-end',
    paddingLeft: 40,
    paddingRight: 40,
  },
  infoWindowShell: {
    flex: 4,
    alignItems: 'center',
    // backgroundColor: '#ecf0f1',
    // backgroundColor: 'green',
    justifyContent: 'flex-start',
    // padding: 10
    flexDirection: "column",
  },
  buttonTabs: {
    // backgroundColor: 'grey',
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center',
    // fontSize: 40
  },
});
