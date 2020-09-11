import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, Button, TextInput,
} from 'react-native';
import t from 'tcomb-form-native';
import axios from 'axios';

const { Form } = t.form;

const TruckOwnerLogin = () => {
  const [businessName, setBusinessName] = useState('');
  const [attemptedPassword, setAttemptedPassword] = useState('');
  const [password, setPassword] = useState('');
  const [validOwner, setValidOwner] = useState(false);

  useEffect(() => {
    if (attemptedPassword === password) {
      setValidOwner(true);
    }
  }, [password]);

  const Owner = t.struct({
    businessName: t.String,
    password: t.String,
  });

  const handleLoginSubmit = async() => {
    const value = this._form.getValue();
    setBusinessName(value.businessName);
    setAttemptedPassword(value.password);

    await axios.get(`${process.env.EXPO_LocalLan}/truck/login/${value.businessName}`)
      .then((response) => {
        setPassword(response.data.password);
      })
      .catch((err) => console.error(err));
  };

  const pressHandler = () => {
    navigation.navigate(`TruckOwnerProfileEdit`, {
      // params: { currentTruck, id, navigation, onReviews: true },
    });
  };

  const options = {
    auto: 'placeholders',
    fields: {
      password: {
        password: true,
      },
    },
  };

  return (
    <View>
      <Text style={styles.logInPrompt}>Log In to Your Account Here</Text>
      <Form
        type={Owner}
        ref={(c) => this._form = c}
        options={options}
      />
      <Button
        title="Login!"
        onPress={handleLoginSubmit}
      />
      <Button
        title="Sign Up here!"
        onPress={pressHandler}
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

export default TruckOwnerLogin;
