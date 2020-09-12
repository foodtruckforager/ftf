import React from 'react';
import t from 'tcomb-form-native';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';
import axios from 'axios';
import TruckOwnerProfile from './TruckOwnerProfile';

const { Form } = t.form;

const TruckOwnerProfileEdit = ({ ownerGoogleId }) => {
  const Owner = t.struct({
    full_name: t.String,
    phone_number: t.maybe(t.String),
    logo: t.maybe(t.String),
    food_genre: t.String,
    blurb: t.maybe(t.String),
    open_time: t.maybe(t.String),
    close_time: t.maybe(t.String),
    latitude: t.maybe(t.Number),
    longitude: t.maybe(t.Number),
  });

  const options = {
    auto: 'placeholders',
  };

  const handleLoginSubmit = async() => {
    const value = this._form.getValue();

    await axios.put(`${process.env.EXPO_LocalLan}/truck/create/${ownerGoogleId}`, {
      fullName: value.full_name,
      phoneNumber: value.phone_number,
      logo: value.logo,
      foodGenre: value.food_genre,
      blurb: value.blurb,
      openTime: value.open_time,
      closeTime: value.close_time,
      latitude: value.latitude,
      longitude: value.longitude,
    })
      .then((response) => {
        // setPassword(response.data.password);
        console.log('res. data in put', response.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <View>
      <Text style={styles.logInPrompt}>Add Your Business Info Below</Text>
      <Form
        type={Owner}
        ref={(c) => this._form = c}
        options={options}
      />
      <Button
        title="Save"
        onPress={handleLoginSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  logInPrompt: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TruckOwnerProfileEdit;
