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
export default function Settings({ navigation }) {
  const [profile, setProfile] = useState(true);
  const [getUser, setGetUser] = useState([]);
  const onPress = () => {
    setProfile(!profile);
  };

  let googleData;

  useEffect(() => {
    const retrieveData = async () => {
      try {
        let value = await AsyncStorage.getItem('userData');
        if (value !== null) {
          // We have data!!
          googleData = JSON.parse(value);
          googleData = googleData.user;
          // console.log(googleData);
          return googleData;
          alert(value);
        }
      } catch (error) {
        // Error retrieving data
        console.error(error);
      }
    };
    retrieveData().then(() => {
      axios
        .get(`${process.env.EXPO_LocalLan}/user/${googleData.id}`)
        .then((response) => {
          setGetUser(response.data);
        });
    });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.EXPO_LocalLan}/user/${googleData.id}`)
  //     .then((response) => {
  //       setGetUser(response.data);
  //     });
  // }, []);
  const pressHandler = () => {
    navigation.navigate('Profile');
  };

  const retrieveData = async () => {
    try {
      let value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        // We have data!!
        value = JSON.parse(value);
        console.log('hello', value.user);
        alert(value);
      }
    } catch (error) {
      // Error retrieving data
      console.error(error);
    }
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
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={retrieveData}
          >
            <Text style={styles.editProfile}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={styles.title}> Edit Your Profile </Text>
        <Button title='Discard Changes' onPress={onPress} />
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
