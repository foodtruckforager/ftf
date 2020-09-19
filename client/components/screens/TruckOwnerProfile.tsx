import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, Switch, Image, SafeAreaView, ScrollView,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
  Card, ListItem, Button, Icon,
} from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import axios from 'axios';
import Constants from 'expo-constants';
import LocationSelectionMap from '../dropIns/LocationSelectMap';
import SubmitOverlay from '../dropIns/SubmitOverlay';

const TruckOwnerProfile = ({ navigation, route }) => {
  const [truckId, setTruckId] = useState(null);
  const [currentTruck, setCurrentTruck] = useState({});
  const [truckName, setTruckName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [logo, setlogo] = useState('');
  const [foodGenre, setFoodGenre] = useState('');
  const [blurb, setBlurb] = useState('');
  const [starAverage, setStarAverage] = useState(null);
  const [numberOfReviews, setNumberOfReviews] = useState(null);
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [openStatus, setOpenStatus] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [cameFromProfileEdit, setCameFromProfileEdit] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTruckPosts, setCurrentTruckPosts] = useState([]);

  const isFocused = useIsFocused();

  const navigateToQrGenerate = () => {
    navigation.navigate('GenerateQRCode', {
      truckId,
    });
  };

  const toggleOverlay = () => {
    setIsVisible(!isVisible);
  };

  const getTruckPosts = async() => {
    axios
      .get(`${process.env.EXPO_LocalLan}/truck/truckpost/${id}`)
      .then((response) => {
        setCurrentTruckPosts(response.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTruckPosts();
  }, []);

  const getData = async() => {
    await axios.get(`${process.env.EXPO_LocalLan}/truck/login/${route.params.googleId}`)
      .then((response) => {
        setCurrentTruck(response.data);
        setTruckName(response.data.full_name);
        setTruckId(response.data.id);
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

  useEffect(() => {
    console.log(currentTruck);
  }, [currentTruck]);

  // TODO: update open status and latitude/longitude in database
  useEffect(() => {
    if (latitude && longitude) {
      const updateOpenAndLocation = async() => {
        await axios
          .put(`${process.env.EXPO_LocalLan}/truck/update/${truckId}`, {
            latitude,
            longitude,
            openStatus,
          })
          .then(() => {
            // alert(
              // `Your truck was updated with a Open Status:${openStatus}, Latitude: ${latitude}, Longitude: ${longitude}`,
            // );
          })
          .catch((err) => console.error(err));
      };
      updateOpenAndLocation();
    }
  }, [openStatus, latitude, longitude]);

  const toggleSwitch = () => setOpenStatus((previousState) => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
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
            <Card containerStyle={{width: 350, left: -20, right: 100 }}>
              <View style={styles.topTitleCard}>
                <Card.Title>
                  <Text>
                    {truckName}
                  </Text>
                </Card.Title>
                <View style={styles.slider}>
                  <Switch
                    trackColor={{ false: '#767577', true: '#3cb37' }}
                    thumbColor={openStatus ? '#FFFFFF' : '#FFFFFF'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={openStatus}
                  />
                </View>
              </View>
              {/* <View style={styles.stars}>
                <Text style={{ color: 'orange' }}>
                  {String.fromCharCode(9733).repeat(Math.floor(4.0))}
                </Text>
                <Text style={{ color: 'lightgrey' }}>
                  {String.fromCharCode(9733).repeat(
                    5 - Math.floor(4.0),
                  )}
                </Text>
                <Text>{numberOfReviews} Reviews</Text>
              </View> */}
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>Phone Number:</ListItem.Title>
                  <ListItem.Subtitle>{phoneNumber}</ListItem.Subtitle>
                  <Card.Divider />
                  <ListItem.Title>Food Genre:</ListItem.Title>
                  <ListItem.Subtitle>{foodGenre}</ListItem.Subtitle>
                  <ListItem.Title>{starAverage}</ListItem.Title>
                  <ListItem.Title>Open Time:</ListItem.Title>
                  <ListItem.Subtitle>{openTime}</ListItem.Subtitle>
                  <Card.Divider />
                  <ListItem.Title>Close Time:</ListItem.Title>
                  <ListItem.Subtitle>{closeTime}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              <Dropdown
                label="Blurb"
                data={[{ value: blurb }]}
              />
              <Card.Image source={{ uri: logo }} />
              <Card.Divider />
              <Button
                title="Edit"
                onPress={() => navigation.navigate('TruckOwnerProfileEdit')}
              // icon={<Icon name="code" color="#ffffff" />}
                buttonStyle={styles.button}
              />
              <Card.Divider />
              <View style={styles.modal}>
                <SubmitOverlay
                  isVisible={isVisible}
                  onBackdropPress={toggleOverlay}
                  currentTruck={currentTruck}
                  getTruckPosts={getTruckPosts}
                />
              </View>
              <Card.Divider />
              <Button
                title="Generate QR Code"
                onPress={navigateToQrGenerate}
                buttonStyle={styles.button}
              />
              <Card.Divider />
              <Button
                title="Logout"
                onPress={() => {
                  navigation.navigate('LogIn', { previous_screen: 'LogOut' });
                }}
                buttonStyle={styles.button}
              />
            </Card>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  map: {
    padding: 140,
    paddingTop: Constants.statusBarHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  topTitleCard: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  slider: {
    margin: -5,
    marginHorizontal: 10,
  },
  stars: {
    flexDirection: 'row',
  },
  modal: {
    flex: 0.1,
    flexGrow: 1.4,
  },
  button: {
    borderRadius: 30,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
});

export default TruckOwnerProfile;
