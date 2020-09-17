import React, { useState, useEffect } from 'react';
import {
  Button,
  Overlay,
  SearchBar,
  Text,
  AirbnbRating,
} from 'react-native-elements';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import axios from 'axios';

const UserProfileSettingsOverlay = () => {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(5);
  const [userId, setUserId] = useState('');
  const [photo, setPhoto] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRTmpzHIZ9FYP3DqV-ahD1ngl9CwAmRmjsAhQ&usqp=CAU'
  );
  const [googleUserId, setGoogleUserId] = useState(0);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const updateUsername = (username: string) => {
    setUsername(username);
  };
  const updateDescription = (description: string) => {
    setDescription(description);
  };
  const onFinishRating = (rating: number) => {
    setRating(rating);
  };

  const onSubmit = () => {
    toggleOverlay();
  };

  useEffect(() => {
    const retrieveCurrentUserId = async () => {
      try {
        let value = await AsyncStorage.getItem('userData');
        if (value !== null) {
          value = JSON.parse(value);
          setGoogleUserId(value.user.id);
        } else {
          console.log('user id not found');
        }
      } catch (error) {
        console.error(error);
      }
    };
    retrieveCurrentUserId();
  }, []);

  useEffect(() => {
    const getUserIdWithGoogleUserId = async () => {
      axios
        .get(`${process.env.EXPO_LocalLan}/user/googleId/${googleUserId}`)
        .then((response) => {
          if (response.data[0] !== undefined) {
            setUserId(response.data[0].id);
          }
        })
        .catch((err) => console.error(err));
    };
    getUserIdWithGoogleUserId();
  }, [googleUserId]);

  return (
    <View>
      {(
        <Button title="Edit User Settings" onPress={toggleOverlay} buttonStyle={styles.button} />
      )}
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        fullScreen={false}
      >
        <Text h3> 📝 User Settings </Text>
        <SearchBar
          placeholder="Username"
          lightTheme={true}
          searchIcon={false}
          onChangeText={updateUsername}
          value={username}
        />
        <SearchBar
          placeholder="Description"
          lightTheme={true}
          searchIcon={false}
          onChangeText={updateDescription}
          value={description}
        />
        <View style={styles.verticalPadding}>
          <Button title="📎 Edit Profile Photo" onPress={() => {}} />
          <Button
            style={styles.slightVerticalPadding}
            title="✏️ Apply Changes"
            onPress={onSubmit}
          />
          <Button title="❌ Close" onPress={toggleOverlay} />
        </View>
      </Overlay>
    </View>
  );
};

export default UserProfileSettingsOverlay;

const styles = StyleSheet.create({
  verticalPadding: {
    paddingVertical: 10,
  },
  slightVerticalPadding: {
    paddingVertical: 2,
  },
  button: {
    borderRadius: 30,
  },
});
