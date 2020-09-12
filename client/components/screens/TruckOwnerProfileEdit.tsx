import React from 'react';
import t from 'tcomb-form-native';
import {
  StyleSheet, View, Text, Button, TextInput,
} from 'react-native';

const { Form } = t.form;

const TruckOwnerProfileEdit = () => {
  const Owner = t.struct({
    businessName: t.String,
    phone_number: t.maybe(t.String),
    logo: t.maybe(t.String),
    food_genre: t.String,
    blurb: t.maybe(t.String),
    open_time: t.maybe(t.Number),
    close_time: t.maybe(t.Number),
    latitude: t.maybe(t.Number),
    longitude: t.maybe(t.Number),
  });

  const options = {
    auto: 'placeholders',
  };

  const handleLoginSubmit = async() => {
    const value = this._form.getValue();
    console.log('value', value);
    // setBusinessName(value.businessName);
    // setAttemptedPassword(value.password);

    // await axios.get(`${process.env.EXPO_LocalLan}/truck/login/${value.businessName}`)
    //   .then((response) => {
    //     // setPassword(response.data.password);
    //     setGoogleId(response.data.google_id);
    //   })
    //   .catch((err) => console.error(err));
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
