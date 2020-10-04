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

  useEffect(() => {
    console.log('goggleId in useeffect router', googleId);
    console.log(process.env.EXPO_LocalLan);
    if (googleId) {
      axios.get(`${process.env.EXPO_LocalLan}/truck/login/${googleId}`)
      // axios.get(`http://192.168.1.183:5000/truck/login/${googleId}`)
        .then((response) => {
          console.log('response in useEffect get in router', response);


          if (response.data.full_name !== null) {
            setAlreadyRegistered(true);
          } else {
            setOkToLoadEditPage(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <View style={styles.container}>
      {alreadyRegistered !== null && <OwnerProfileFirstStack googleId={googleId} /> }
      {okToLoadEditPage !== null && <OwnerCreateProfileFirstStack googleId={googleId} /> }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TruckOwnerRouter;
