import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Switch, SafeAreaView, ScrollView,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
  Card, ListItem, Button, Text,
} from 'react-native-elements';
import ViewMoreText from 'react-native-view-more-text';
import axios from 'axios';
import Constants from 'expo-constants';
import LocationSelectionMap from '../dropIns/LocationSelectMap';
import SubmitOverlay from '../dropIns/SubmitOverlay';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

const TruckOwnerProfile = ({ navigation, route }) => {
  const [truckId, setTruckId] = useState(null);
  const [currentTruck, setCurrentTruck] = useState({});
  const [truckName, setTruckName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [logo, setlogo] = useState('');
  const [foodGenre, setFoodGenre] = useState('');
  const [blurb, setBlurb] = useState('');
  const [starAverage, setStarAverage] = useState(0);
  const [numberOfReviews, setNumberOfReviews] = useState(0);
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [openStatus, setOpenStatus] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
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
      .get(`${process.env.EXPO_LocalLan}/truck/truckpost/${truckId}`)
      .then((response) => {
        setCurrentTruckPosts(response.data);
      })
      .catch((err) => console.log(err));
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
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // console.log('route.params in profile use effect', route.params);
    // console.log('env varaiable in owner', process.env.EXPO_LocalLan)
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [isFocused]);

  useEffect(() => {
    console.log('current truck in profile', currentTruck);
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
            console.log('open status was updated');
          })
          .catch((err) => console.log(err));
      };
      updateOpenAndLocation();
    }
  }, [openStatus, latitude, longitude]);

  const toggleSwitch = () => setOpenStatus((previousState) => !previousState);

  const renderViewMore = (onPress) => (
    <Text style={styles.renderViewBlurb} onPress={onPress}>View More</Text>
  );

  const renderViewLess = (onPress) => (
    <Text style={styles.renderViewBlurb} onPress={onPress}>View Less</Text>
  );

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
            <Card containerStyle={styles.cardContainer}>
              <View style={styles.topTitleCard}>
                <View style={styles.businessTitle}>
                  <Card.Title>
                    <Text h2>
                      {truckName}
                    </Text>
                  </Card.Title>
                </View>
              </View>
              {/* <View style={styles.stars}>
                <Text style={{ color: 'orange' }}>
                  {String.fromCharCode(9733).repeat(Math.floor(starAverage))}
                </Text>
                <Text style={{ color: 'lightgrey' }}>
                  {String.fromCharCode(9733).repeat(
                    5 - Math.floor(starAverage),
                  )}
                </Text>
              </View> */}
              <View style={styles.logoSliderRow}>
                <ListItem
                  leftAvatar={{
                    source: { uri: logo },
                    size: 'large',
                  }}
                />
                <View style={styles.slider}>
                  <View style={styles.openStatusText}>
                    {openStatus && <Text>Open</Text>}
                    {!openStatus && <Text>Closed</Text>}
                  </View>
                  <Switch
                    trackColor={{ false: '#767577', true: '#3cb37' }}
                    thumbColor={openStatus ? '#FFFFFF' : '#FFFFFF'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={openStatus}
                  />
                </View>
              </View>
              <View style={styles.listItem}>
                <ListItem>
                  <ListItem.Content>
                    <View style={styles.listItemTitle}>
                      <ListItem.Title><Text h4>Phone#:</Text></ListItem.Title>
                      <View style={styles.listItemSubTitlePhoneNumber}>
                        <ListItem.Subtitle>
                          <Text style={styles.listItemSubTitleText}>
                            {phoneNumber}
                          </Text>
                        </ListItem.Subtitle>
                      </View>
                    </View>
                    <Card.Divider />
                    <View style={styles.listItemTitle}>
                      <ListItem.Title><Text h4>Food:</Text></ListItem.Title>
                      <View style={styles.listItemSubTitleFoodGenre}>
                        <ListItem.Subtitle>
                          <Text style={styles.listItemSubTitleText}>
                            {foodGenre}
                          </Text>
                        </ListItem.Subtitle>
                      </View>
                    </View>
                    <Card.Divider />
                    <View style={styles.listItemTitle}>
                      <ListItem.Title><Text h4>Open:</Text></ListItem.Title>
                      <View style={styles.listItemSubTitleOpenTime}>
                        <ListItem.Subtitle>
                          <Text style={styles.listItemSubTitleText}>
                            {openTime}
                          </Text>
                        </ListItem.Subtitle>
                      </View>
                    </View>
                    <Card.Divider />
                    <View style={styles.listItemTitle}>
                      <ListItem.Title><Text h4>Close:</Text></ListItem.Title>
                      <View style={styles.listItemSubTitleCloseTime}>
                        <ListItem.Subtitle>
                          <Text style={styles.listItemSubTitleText}>
                            {closeTime}
                          </Text>
                        </ListItem.Subtitle>
                      </View>
                    </View>
                  </ListItem.Content>
                </ListItem>
              </View>
              <ViewMoreText
                numberOfLines={3}
                renderViewMore={renderViewMore}
                renderViewLess={renderViewLess}
                textStyle={{ textAlign: 'left' }}
              >
                <Text>
                  {blurb}
                </Text>
              </ViewMoreText>
              <Card.Divider />
              <Button
                title="Edit"
                onPress={() => navigation.navigate('TruckOwnerProfileEdit')}
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
  cardContainer: {
    width: 350,
    left: -20,
    right: 100,
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
  businessTitle: {
    flex: 1,
    alignSelf: 'center',
  },
  logoSliderRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slider: {
    marginTop: 7,
    marginHorizontal: 10,
    flexDirection: 'column',
  },
  openStatusText: {
    marginTop: 8,
    paddingLeft: 6,
    marginBottom: 10,
  },
  listItem: {
    marginTop: -6,
  },
  listItemTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  listItemSubTitlePhoneNumber: {
    marginTop: 5,
    marginLeft: 80,
  },
  listItemSubTitleText: {
    fontSize: 20,
    flex: 2,
    alignSelf: 'flex-end',
  },
  listItemSubTitleFoodGenre: {
    marginTop: 4,
    marginLeft: 155,
  },
  listItemSubTitleOpenTime: {
    marginTop: 5,
    marginLeft: 167,
  },
  listItemSubTitleCloseTime: {
    marginTop: 5,
    marginLeft: 172,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 3,
    marginLeft: 13,
  },
  renderViewBlurb: {
    paddingTop: 5,
    color: 'blue',
  },
  modal: {
    flex: 0.1,
    flexGrow: 1.4,
    borderRadius: 15,
  },
  button: {
    borderRadius: 15,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
});

export default TruckOwnerProfile;
