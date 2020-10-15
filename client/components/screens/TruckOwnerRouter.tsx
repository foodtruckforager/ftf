import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import OwnerProfileFirstStack from '../routes/OwnerProfileFirstStack';
import OwnerCreateProfileFirstStack from '../routes/OwnerCreateProfileFirstStack';

const TruckOwnerRouter = ({ googleId }) => {
  const [alreadyRegistered, setAlreadyRegistered] = useState(null);
  const [okToLoadEditPage, setOkToLoadEditPage] = useState(null);

  useEffect(() => {
    if (googleId !== null) {
      axios.get(`${process.env.EXPO_LocalLan}/truck/login/${googleId}`)
        .then((response) => {
          console.log('response in useEffect get in router', response.data);
          if (response.data.full_name !== null) {
            setAlreadyRegistered(true);
          } else {
            setOkToLoadEditPage(true);
          }
        })
        .catch((err) => console.log('catch in router use effect', err));
    }
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      {alreadyRegistered !== null && <OwnerProfileFirstStack googleId={googleId} /> }
      {okToLoadEditPage !== null && <OwnerCreateProfileFirstStack googleId={googleId} /> }
    </View>
  );
};

export default TruckOwnerRouter;
