import React, { useState, useEffect, Fragment } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { normalize } from 'react-native-elements';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

export default function Settings({ navigation }) {
  const [profile, setProfile] = useState(true);
  const [getUser, setGetUser] = useState([]);
  const onPress = () => {
    setProfile(!profile);
  };

  const [selectedImage, setSelectedImage] = useState('');

  let CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_KEY}/upload`;

  let cloudImage;

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });

    let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;

    let data = {
      file: base64Img,
      upload_preset: `${process.env.CLOUDINARY_PRESET}`,
    };

    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })
      .then(async (r) => {
        let data = await r.json();
        cloudImage = data.url;
      })
      .then(() => {
        axios
          .post(`${process.env.EXPO_LocalLan}/user/update/photo`, {
            profilePhotoUrl:
              'https://res.cloudinary.com/ds4z8idpg/image/upload/v1599777028/nhhdk8vszyf0t3kzlun5.jpg',
            userId: getUser[0]['id'],
          })
          .then(() => {
            // TO DO --> SET NEW STATE AND RENDER NEW PIC
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  let googleData;
  let userData;

  useEffect(() => {
    const retrieveData = async () => {
      try {
        let value = await AsyncStorage.getItem('userData');
        if (value !== null) {
          googleData = JSON.parse(value);
          googleData = googleData.user;
          return googleData;
        }
      } catch (error) {
        console.error(error);
      }
    };
    retrieveData().then(() => {
      axios
        .get(`${process.env.EXPO_LocalLan}/user/${googleData.id}`)
        .then((response) => {
          userData = response.data[0]['id'];
          console.log('USER DATA NUMBER', userData);
          setGetUser(response.data);
        });
    });
  }, []);

  const pressHandler = () => {
    navigation.navigate('Profile');
  };

  if (profile) {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>

        {getUser.map((user) => {
          return (
            <React.Fragment key={user.id}>
              <Text style={styles.bodyContent}>Name: {user.full_name}</Text>
              <Image
                style={styles.avatar}
                source={{
                  uri: `${user.profile_photo_url}`,
                }}
              />
            </React.Fragment>
          );
        })}

        <View style={styles.bodyContent}>
          <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <Text style={styles.editProfile}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>

        {getUser.map((user) => {
          return (
            <React.Fragment key={user.id}>
              <Text style={styles.bodyContent}>Name: {user.full_name}</Text>
              <Image
                style={styles.avatar}
                source={{
                  uri: `${user.profile_photo_url}`,
                }}
              />
            </React.Fragment>
          );
        })}

        <View style={styles.bodyContent}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={openImagePickerAsync}
          >
            <Text style={styles.editProfile}>Upload A Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <Text style={styles.editProfile}>Discard Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
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
    marginTop: 130,
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
    marginTop: 50,
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
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  picture: {
    width: 50,
    height: 50,
  },
});
