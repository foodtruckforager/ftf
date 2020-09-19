import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, AsyncStorage, Button,
} from 'react-native';
import axios from 'axios';
import TruckOwnerProfileEdit from './TruckOwnerProfileEdit';
import TruckOwnerProfileFirstStack from '../routes/TruckOwnerProfileFirstStack';
import OwnerProfileFirstStack from '../routes/OwnerProfileFirstStack';
import OwnerCreateProfileFirstStack from '../routes/OwnerCreateProfileFirstStack';

const TruckOwnerRouter = ({ googleId }) => {
  const [alreadyRegistered, setAlreadyRegistered] = useState(null);
  const [okToLoadEditPage, setOkToLoadEditPage] = useState(null);
  const [ownerGoogleId, setOwnerGoogleId] = useState(null);
  const [dataRetrieved, setDataRetrieved] = useState(false);

  // useEffect(() => {
  //   if (dataRetrieved === false) {
  //     retrieveData();
  //     setDataRetrieved(true);
  //   }
  // }, []);
  useEffect(() => {
    console.log('google iddd in router', googleId);
  }, []);

  useEffect(() => {
    if (googleId) {
      axios.get(`${process.env.EXPO_LocalLan}/truck/login/${googleId}`)
        .then((response) => {
          if (response.data.full_name !== null) {
            console.log(response.data)
            setAlreadyRegistered(true);
          } else {
            console.log('else is usee effect');
            setOkToLoadEditPage(true);
          }
        })
        .catch((err) => console.error('err in router', err));
    }
  }, []);

  const retrieveData = async() => {
    try {
      let value = await AsyncStorage.getItem('ownerData');
      if (value !== null) {
        value = JSON.parse(value);
        setOwnerGoogleId(value.user.id);
      } else {
        console.log('user token not found');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {alreadyRegistered !== null && <OwnerProfileFirstStack googleId={googleId} /> }
      {okToLoadEditPage !== null && <OwnerCreateProfileFirstStack googleId={googleId} /> }
      {/* <OwnerCreateProfileFirstStack googleId={googleId} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TruckOwnerRouter;
