import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useTheme } from 'react-native-paper';
import axios from 'axios';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';

const TruckOwnerProfileEdit = ({ navigation, route, currentTruck }) => {
  const [cameFromProfile, setCameFromProfile] = useState(false);
  const [cameFromCreate, setCameFromCreate] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [foodGenre, setFoodGenre] = useState('');
  const [blurb, setBlurb] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [logo, setLogo] = useState('');

  const { colors } = useTheme();

  useEffect(() => {
    // alert(JSON.stringify(route.params));
    if (route.params.cameFromProfile) {
      setCameFromProfile(true);
    }
    if (route.params.cameFromCreate) {
      setCameFromCreate(true);
    }
  }, []);

  const openImagePickerAsync = async() => {
    const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/upload`;

    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    if (pickerResult.cancelled === true) {
      return;
    }

    const base64Img = `data:image/jpg;base64,${pickerResult.base64}`;

    const data = {
      file: base64Img,
      upload_preset: `${process.env.CLOUDINARY_UPLOAD_PRESET}`,
    };

    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })
      .then(async(response) => {
        const responseData = await response.json();
        setLogo(responseData.url);
      })
      .catch((err) => console.log(err));
  };

  const handleLoginSubmit = () => {
    axios.put(`${process.env.EXPO_LocalLan}/truck/create/${route.params.googleId}`, {
      fullName: businessName,
      phoneNumber,
      foodGenre,
      logo,
      blurb,
      openTime,
      closeTime,
      latitude: +latitude,
      longitude: +longitude,
    })
      .then(() => {
        console.log('truck was created!');
        navigation.navigate('TruckOwnerProfile');
      })
      .catch((err) => console.log(err));
  };

  const styles = StyleSheet.create({
    container: {
      marginTop: Constants.statusBarHeight,
      backgroundColor: colors.background,
    },
    scrollView: {
      backgroundColor: colors.background,
    },
    logInPrompt: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.backgroundCard,
    },
    input: {
      color: colors.backgroundCard,
    },
    button: {
      backgroundColor: colors.button,
      borderRadius: 15,
      width: 330,
      alignSelf: 'center',
      marginBottom: 23,
    },
  });
  if (cameFromProfile === true) {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView style={styles.scrollView}>
          { cameFromCreate && <Text style={styles.logInPrompt}>Add Your Business Info Below</Text> }
          { cameFromProfile && <Text style={styles.logInPrompt}>Update Your Info Below</Text> }
          {cameFromProfile
        && (
        <Input
          label="Truck Name"
          labelStyle={styles.input}
          placeholder={route.params.currentTruck.full_name}
          onChangeText={(value) => setBusinessName(value)}
          inputStyle={styles.input}
        />
        )}
          <Input
            label="Phone Number"
            labelStyle={styles.input}
            placeholder={route.params.currentTruck.phone_number}
            keyboardType="phone-pad"
            onChangeText={(value) => setPhoneNumber(value)}
          />
          <Input
            label="Food Genre"
            labelStyle={styles.input}
            placeholder={route.params.currentTruck.food_genre}
            onChangeText={(value) => setFoodGenre(value)}
          />
          <Input
            label="Blurb"
            labelStyle={styles.input}
            placeholder={route.params.currentTruck.blurb}
            onChangeText={(value) => setBlurb(value)}
            multiline
          />
          <Input
            label="Open Time"
            labelStyle={styles.input}
            placeholder={route.params.currentTruck.open_time}
            onChangeText={(value) => setOpenTime(value)}
          />
          <Input
            label="Close Time"
            labelStyle={styles.input}
            placeholder={route.params.currentTruck.close_time}
            onChangeText={(value) => setCloseTime(value)}
          />
          <Input
            label="Latitude"
            labelStyle={styles.input}
            placeholder={route.params.currentTruck.latitude}
            onChangeText={(value) => setLatitude(value)}
          />
          <Input
            label="Longitude"
            labelStyle={styles.input}
            placeholder={route.params.currentTruck.longitude}
            onChangeText={(value) => setLongitude(value)}
          />
          <Button
            title="Upload Logo Here"
            type="clear"
            buttonStyle={{ alignSelf: 'flex-start', marginTop: -10, marginBottom: 10 }}
            onPress={openImagePickerAsync}
          />
          <Button
            title="Save"
            onPress={handleLoginSubmit}
            buttonStyle={styles.button}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView style={styles.scrollView}>
        { cameFromCreate && <Text style={styles.logInPrompt}>Add Your Business Info Below</Text> }
        { cameFromProfile && <Text style={styles.logInPrompt}>Update Your Info Below</Text> }
        <Input
          label="Truck Name"
          labelStyle={styles.input}
          placeholder="Enter Truck Name"
          onChangeText={(value) => setBusinessName(value)}
          inputStyle={styles.input}
        />
        {/* )} */}
        <Input
          label="Phone Number"
          labelStyle={styles.input}
          placeholder="Enter Phone Number"
          keyboardType="phone-pad"
          onChangeText={(value) => setPhoneNumber(value)}
        />
        <Input
          label="Food Genre"
          labelStyle={styles.input}
          placeholder="Enter Food Genre"
          onChangeText={(value) => setFoodGenre(value)}
        />
        <Input
          label="Blurb"
          labelStyle={styles.input}
          placeholder="Enter Blurb"
          onChangeText={(value) => setBlurb(value)}
          multiline
        />
        <Input
          label="Open Time"
          labelStyle={styles.input}
          placeholder="Enter Open Time"
          onChangeText={(value) => setOpenTime(value)}
        />
        <Input
          label="Close Time"
          labelStyle={styles.input}
          placeholder="Enter Close Time"
          onChangeText={(value) => setCloseTime(value)}
        />
        <Input
          label="Latitude"
          labelStyle={styles.input}
          placeholder="Enter Latitude"
          onChangeText={(value) => setLatitude(value)}
        />
        <Input
          label="Longitude"
          labelStyle={styles.input}
          placeholder="Enter Longitude"
          onChangeText={(value) => setLongitude(value)}
        />
        <Button
          title="Upload Logo Here"
          type="clear"
          buttonStyle={{ alignSelf: 'flex-start', marginTop: -10, marginBottom: 10 }}
          onPress={openImagePickerAsync}
        />
        <Button
          title="Save"
          onPress={handleLoginSubmit}
          buttonStyle={styles.button}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TruckOwnerProfileEdit;
