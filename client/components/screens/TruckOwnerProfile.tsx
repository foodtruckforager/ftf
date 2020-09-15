import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Switch } from 'react-native';
import axios from 'axios';
import LocationSelectionMap from '../dropIns/LocationSelectMap';
import Constants from 'expo-constants';

const TruckOwnerProfile = ({ navigation, route }) => {
  // const [isEnabled, setIsEnabled] = useState(false);
  const [truckId, setTruckId] = useState(null);
  const [truckName, setTruckName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [logo, setlogo] = useState('');
  const [foodGenre, setFoodGenre] = useState('');
  const [blurb, setBlurb] = useState('');
  const [starAverage, setStarAverage] = useState(null);
  const [numberOfReview, setNumberOfReviews] = useState(null);
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [openStatus, setOpenStatus] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(
          `${process.env.EXPO_LocalLan}/truck/login/${route.params.googleId}`
        )
        .then((response) => {
          setTruckId(response.data.id);
          setTruckName(response.data.full_name);
          setPhoneNumber(response.data.phone_number);
          setQrCode(response.data.qrCode);
          setlogo(response.data.logo);
          setFoodGenre(response.data.food_genre);
          setBlurb(response.data.blurb);
          setStarAverage(response.data.starAverage);
          setNumberOfReviews(response.data.number_of_review);
          setOpenTime(response.data.open_time);
          setCloseTime(response.data.close_time);
          setOpenStatus(response.data.open_status);
          setLatitude(response.data.latitude);
          setLongitude(response.data.longitude);
        })
        .catch((err) => console.error(err));
    };
    getData();
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const updateOpenAndLocation = async () => {
        await axios
          .put(`${process.env.EXPO_LocalLan}/truck/update/${truckId}`, {
            latitude,
            longitude,
            openStatus,
          })
          .then(() => {
            alert(
              `Your truck was updated with a Open Status:${openStatus}, Latitude: ${latitude}, Longitude: ${longitude}`
            );
          })
          .catch((err) => console.error(err));
      };
      updateOpenAndLocation();
    }
  }, [openStatus, latitude, longitude]);

  const toggleSwitch = () => setOpenStatus((previousState) => !previousState);

  return (
    <View>
      {latitude && longitude && (
        <View style={styles.map}>
          <LocationSelectionMap
            latitude={latitude}
            longitude={longitude}
            navigation={navigation}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
        </View>
      )}
      <View>
        <Switch
          trackColor={{ false: '767577', true: '#81b0ff' }}
          thumbColor={openStatus ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={openStatus}
        />
      </View>
      <View>
        <Text>{truckName}</Text>
        <Button
          title="Edit"
          onPress={() => navigation.navigate('TruckOwnerProfileEdit')}
        >
          Click
        </Button>
        <Button
          title="Logout"
          onPress={() => {
            navigation.navigate('LogIn', { previous_screen: 'LogOut' });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    flex: 1,
  },
  map: {
    padding: 300,
    paddingTop: Constants.statusBarHeight,
  },
});

export default TruckOwnerProfile;
