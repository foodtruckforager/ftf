import React, { useState, useEffect } from 'react';
import t from 'tcomb-form-native';
import {
  StyleSheet, View, Text, Button, SafeAreaView, ScrollView,
} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const { Form } = t.form;

const TruckOwnerProfileEdit = ({ navigation, route }) => {
  const [cameFromProfile, setCameFromProfile] = useState(false);
  const [cameFromCreate, setCameFromCreate] = useState(false);
  useEffect(() => {
    if (route.params.cameFromProfile) {
      setCameFromProfile(true);
    }
    if (route.params.cameFromCreate) {
      setCameFromCreate(true);
    }
    console.log('edit page params', route.params);
  }, []);

  const Owner = t.struct({
    business_name: t.String,
    phone_number: t.maybe(t.String),
    logo: t.maybe(t.String),
    food_genre: t.String,
    blurb: t.maybe(t.String),
    open_time: t.maybe(t.String),
    close_time: t.maybe(t.String),
    latitude: t.maybe(t.String),
    longitude: t.maybe(t.String),
  });

  const options = {
    auto: 'placeholders',
  };

  const handleLoginSubmit = async() => {
    const value = this._form.getValue();
    await axios.put(`${process.env.EXPO_LocalLan}/truck/create/${route.params.googleId}`, {
      fullName: value.business_name,
      phoneNumber: value.phone_number,
      logo: value.logo,
      foodGenre: value.food_genre,
      blurb: value.blurb,
      openTime: value.open_time,
      closeTime: value.close_time,
      latitude: +value.latitude,
      longitude: +value.longitude,
    })
      .then(() => {
        console.log('truck was created!');
        navigation.navigate('TruckOwnerProfile');
      })
      .catch((err) => console.error(err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        { cameFromCreate && <Text style={styles.logInPrompt}>Add Your Business Info Below</Text> }
        { cameFromProfile && <Text style={styles.logInPrompt}>Update Your Info Below</Text> }
        <Form
          type={Owner}
          ref={(c) => this._form = c}
          options={options}
        />
        <Button
          title="Save"
          onPress={handleLoginSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  logInPrompt: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TruckOwnerProfileEdit;
