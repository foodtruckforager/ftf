import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, Button, Switch,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

const TruckOwnerProfile = ({ navigation, route }) => {
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
  const [cameFromProfileEdit, setCameFromProfileEdit] = useState(false);

  const isFocused = useIsFocused();

  const getData = async() => {
    await axios.get(`${process.env.EXPO_LocalLan}/truck/login/${route.params.googleId}`)
      .then((response) => {
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

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [isFocused]);

  const toggleSwitch = () => setOpenStatus((previousState) => !previousState);

  return (
    <View>
      <Switch
        trackColor={{ false: '767577', true: '#81b0ff' }}
        thumbColor={openStatus ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={openStatus}
      />
      <Text>{truckName}</Text>
      <Button title="Edit" onPress={() => navigation.navigate('TruckOwnerProfileEdit')} />
      <Button
        title="Logout"
        onPress={() => {
          navigation.navigate('LogIn',
            { previous_screen: 'LogOut' });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TruckOwnerProfile;
