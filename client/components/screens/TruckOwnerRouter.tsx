import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, AsyncStorage,
} from 'react-native';
import axios from 'axios';
import TruckOwnerProfile from './TruckOwnerProfile';
import TruckOwnerProfileEdit from './TruckOwnerProfileEdit';

const TruckOwnerRouter = () => {
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [ownerGoogleId, setOwnerGoogleId] = useState(null);
  const [dataRetrieved, setDataRetrieved] = useState(false);

  useEffect(() => {
    if (dataRetrieved === false) {
      retrieveData();
      setDataRetrieved(true);
    }
  }, []);

  useEffect(() => {
    if (ownerGoogleId !== null) {
      axios.get(`${process.env.EXPO_LocalLan}/truck/login/${ownerGoogleId}`)
        .then((response) => {
          if (response.data.full_name !== undefined) {
            setAlreadyRegistered(true);
          } else {
            setAlreadyRegistered(false);
          }
        })
        .catch((err) => console.error('err in router use effect', err));
    }
  }, [ownerGoogleId]);

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
    <View>
      {alreadyRegistered
        ? (
          <TruckOwnerProfile
            ownerGoogleId={ownerGoogleId}
          />
        )
        : (
          <TruckOwnerProfileEdit
            ownerGoogleId={ownerGoogleId}
          />
        )}
    </View>
  );
};

export default TruckOwnerRouter;
