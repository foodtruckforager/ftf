import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import TruckOwnerProfile from './truckOwnerProfile';
import TruckOwnerProfileEdit from './TruckOwnerProfileEdit';

const TruckOwnerRouter = ({ ownerGoogleId }) => {
  const [alreadyRegisterd, setAlreadyRegistered] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.EXPO_LocalLan}/truck/login/${ownerGoogleId}`)
      .then((response) => {
        if (response.data.full_name !== undefined) {
          setAlreadyRegistered(true);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <View>
      <Text>Router</Text>
      {alreadyRegisterd ? <TruckOwnerProfile /> : <TruckOwnerProfileEdit />}
    </View>
  );
};

export default TruckOwnerRouter;
