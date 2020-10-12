import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Switch,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Card, ListItem, Button, Text } from 'react-native-elements';
import ViewMoreText from 'react-native-view-more-text';
import { useTheme } from 'react-native-paper';
import axios from 'axios';
import Constants from 'expo-constants';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
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

  const { colors } = useTheme();

  const navigateToQrGenerate = () => {
    navigation.navigate('GenerateQRCode', {
      truckId,
    });
  };

  const navigateToEdit = () => {
    navigation.navigate('TruckOwnerProfileEdit', {
      currentTruck,
    });
  };


  const toggleOverlay = () => {
    setIsVisible(!isVisible);
  };

  const getTruckPosts = async () => {
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

  const getData = async () => {
    await axios
      .get(`${process.env.EXPO_LocalLan}/truck/login/${route.params.googleId}`)
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
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [isFocused]);

  // useEffect(() => {
  //   console.log('current truck in profile', currentTruck);
  // }, [currentTruck]);

  // TODO: update open status and latitude/longitude in database
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
            console.log('open status was updated');
          })
          .catch((err) => console.log(err));
      };
      updateOpenAndLocation();
    }
  }, [openStatus, latitude, longitude]);

  const toggleSwitch = () => setOpenStatus((previousState) => !previousState);

  const renderViewMore = (onPress) => (
    <Text style={styles.renderViewBlurb} onPress={onPress}>
      View More
    </Text>
  );

  const renderViewLess = (onPress) => (
    <Text style={styles.renderViewBlurb} onPress={onPress}>
      View Less
    </Text>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundCard,
    },
    safeAreaContainer: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
    },
    cardContainer: {
      width: 350,
      left: -20,
      right: 100,
      backgroundColor: colors.background,
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
    logoContainer: {
      backgroundColor: colors.background,
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
      backgroundColor: colors.background,
    },
    listItemContainerStyle: {
      backgroundColor: colors.background,
    },
    listItemTitle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      backgroundColor: colors.background,
    },
    listItemSubTitlePhoneNumber: {
      marginTop: 2,
      marginLeft: 58,
    },
    listItemSubTitleText: {
      fontSize: 22,
      flex: 2,
      alignSelf: 'flex-end',
    },
    listItemSubTitleFoodGenre: {
      marginTop: 2,
      marginLeft: 135,
    },
    listItemSubTitleOpenTime: {
      marginTop: 2,
      marginLeft: 133,
    },
    listItemSubTitleCloseTime: {
      marginTop: 2,
      marginLeft: 137,
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
      backgroundColor: colors.backgroundCard,
    },
    spinner: {
      alignSelf: 'center',
      position: 'absolute',
      marginTop: 180,
      zIndex: 5,
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaContainer}>
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
                      <Text h2>{truckName}</Text>
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
                    containerStyle={styles.logoContainer}
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
                      trackColor={{ false: '#767577', true: '#27AE5F' }}
                      thumbColor={openStatus ? '#FFFFFF' : '#FFFFFF'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={openStatus}
                    />
                  </View>
                </View>
                <View style={styles.listItem}>
                  <ListItem containerStyle={styles.listItemContainerStyle}>
                    <ListItem.Content style={styles.listItemContainerStyle}>
                      <View style={styles.listItemTitle}>
                        <ListItem.Title>
                          <Text h4>Phone#:</Text>
                        </ListItem.Title>
                        <View style={styles.listItemSubTitlePhoneNumber}>
                          <ListItem.Subtitle>
                            <Text h4>{phoneNumber}</Text>
                          </ListItem.Subtitle>
                        </View>
                      </View>
                      <Card.Divider />
                      <View style={styles.listItemTitle}>
                        <ListItem.Title>
                          <Text h4>Food:</Text>
                        </ListItem.Title>
                        <View style={styles.listItemSubTitleFoodGenre}>
                          <ListItem.Subtitle>
                            <Text h4>
                              {foodGenre.charAt(0).toUpperCase()}
                              {foodGenre.slice(1)}
                            </Text>
                          </ListItem.Subtitle>
                        </View>
                      </View>
                      <Card.Divider />
                      <View style={styles.listItemTitle}>
                        <ListItem.Title>
                          <Text h4>Open:</Text>
                        </ListItem.Title>
                        <View style={styles.listItemSubTitleOpenTime}>
                          <ListItem.Subtitle>
                            <Text h4>{openTime}</Text>
                          </ListItem.Subtitle>
                        </View>
                      </View>
                      <Card.Divider />
                      <View style={styles.listItemTitle}>
                        <ListItem.Title>
                          <Text h4>Close:</Text>
                        </ListItem.Title>
                        <View style={styles.listItemSubTitleCloseTime}>
                          <ListItem.Subtitle>
                            <Text h4>{closeTime}</Text>
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
                  <Text>{blurb}</Text>
                </ViewMoreText>
                <Card.Divider />
                <Button
                  title="Edit"
                  onPress={navigateToEdit}
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
    </View>
  );
};

export default TruckOwnerProfile;
