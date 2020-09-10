import React, { useState, useEffect, Fragment } from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import { normalize } from 'react-native-elements';
import axios from 'axios';
export default function Profile({ navigation }) {
  const [profile, setProfile] = useState(true);
  const [getUser, setGetUser] = useState([]);
  const onPress = () => {
    setProfile(!profile);
  };
  useEffect(() => {
    axios.get(`${process.env.EXPO_LocalLan}/user/1`).then((response) => {
      setGetUser([response]);
    });
  }, []);
  const pressHandler = () => {
    navigation.navigate('Profile');
  };
  const styles = StyleSheet.create({
    title: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    picture: {
      width: 50,
      height: 50,
    },
  });
  if (profile) {
    return (
      <View>
        <Text style={styles.title}> Profile Page </Text>
        <Text style={styles.name}>Name: Your Name Here</Text>
        {getUser.map((user) => {
          return (
            <React.Fragment>
              <Text key={user.data.id}>{user.data.full_name}</Text>
              <Image
                style={styles.picture}
                source={{
                  uri: `${user.data.profile_photo_url}`,
                }}
              />
              <Text> {user.data.full_name} testing 2</Text>
            </React.Fragment>
          );
        })}
        <Text>Image: Image will go here</Text>
        <Button title='Edit Profile' onPress={onPress} />
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
