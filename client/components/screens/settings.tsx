import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, Image, AsyncStorage,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

export default function Settings({ navigation, onSettings }) {
  const [profile, setProfile] = useState(true);
  const [getUser, setGetUser] = useState([]);
  const [picture, setPicture] = useState('');
  const [userHasChangedPhoto, setUserHasChangedPhoto] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/upload`;

  const openImagePickerAsync = async() => {
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

    setSelectedImage({ localUri: pickerResult.uri });

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
      .then(async(r) => {
        const data = await r.json();
        setUserHasChangedPhoto(true);
        setPicture(data.url);
      })
      .catch((err) => console.log(err));
  };
  // ADD THIS TO SUBMIT OVERLAY // INTEGRATE W ALREADY GOING ON AXIOS CALL
  useEffect(() => {
    if (userHasChangedPhoto) {
      axios
        .post(`${process.env.EXPO_LocalLan}/user/update/photo`, {
          profilePhotoUrl: picture,
          userId: getUser[0].id,
        })
        .then(() => {
          console.log('picture stored in database');
        })
        .catch((err) => console.log(err));
    }
  }, [picture]);
  // NOT BELOW THIS POINT THOUGH
  let googleData;
  let userData;

  useEffect(() => {
    const retrieveData = async() => {
      try {
        const value = await AsyncStorage.getItem('userData');
        if (value !== null) {
          googleData = JSON.parse(value);
          googleData = googleData.user;
          return googleData;
        }
      } catch (error) {
        console.log(error);
      }
    };
    retrieveData()
      .then((response) => {
        console.log('response in user settings', response)
        console.log('googleData', googleData)
        axios
          .get(`${process.env.EXPO_LocalLan}/user/googleId/${googleData.id}`)
          .then((response) => {
            console.log('log after get', response)
            userData = response.data[0].id;
            setGetUser(response.data);
            setPicture(response.data[0].profile_photo_url);
          });
      });
  }, []);

  // if (profile) {
    return (
      <View>
        {getUser.map((user) => (
          <React.Fragment key={user.id}>
            <Text style={styles.title}>{user.full_name}</Text>
            <Image
              style={styles.avatar}
              source={{
                uri: `${picture}`,
              }}
            />
          </React.Fragment>
        ))}
        <View style={{ paddingVertical: onSettings ? 112 : 65 }}>
          {onSettings && (
            <View style={styles.camera}>
              <Icon
                onPress={openImagePickerAsync}
                name="camera"
                type="entypo"
              />
            </View>
          )}
        </View>
      </View>
    );
  }
// }

const styles = StyleSheet.create({
  camera: {
    marginLeft: 118,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 40,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 70,
  },
  editProfile: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 40,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  picture: {
    width: 50,
    height: 50,
  },
  title: {
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
