import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, AsyncStorage } from 'react-native';
import axios from 'axios';
import FavoriteTruck, {
  FavoriteTruck as ListModelFavoriteTruck,
} from './FavoriteTruck';
import Badges, { Badges as ListModelBadges } from './Badges';
import Settings, { Settings as ListModelSettings } from './Settings';
import UserPosts, { UserPosts as ListModelUserPosts } from './UserPosts';

export default () => {
  const [favorite, setFavorite] = useState([]);
  const [googleUserId, setGoogleUserId] = useState(null);
  const [userId, setUserId] = useState(0);

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
            setUserId(+response.data[0].id);
          }
        })
        .catch((err) => console.log('CATCH: getUserIdWithGoogleUserId', err));
    };
    getUserIdWithGoogleUserId();
  }, [googleUserId]);

  useEffect(() => {
    const retrieveCurrentUserFavorites = async () => {
      axios
        .get(`${process.env.EXPO_LocalLan}/user/favorites/${userId}`)
        .then((response) => {
          const { data } = response;
          const { length } = data;
          if (length) {
            if (data !== undefined) {
              const filteredFavorites = data.map((savedFavorite: Object) => {
                return {
                  name: savedFavorite.truck.full_name,
                  points: savedFavorite.truck.food_genre,
                };
              });
              setFavorite(filteredFavorites);
            }
          }
        })
        .catch((err) => console.log('CATCH:retrieveCurrentUserFavorites', err));
    };
    retrieveCurrentUserFavorites();
  }, [userId]);
  const favoriteTrucks: ListModelFavoriteTruck = {
    name: 'User Profile Demo',
    items: favorite || [
      { name: 'Food Truck Demo 1', points: 'Favorites To Go Here' },
    ],
  };
  const badges: ListModelBadges = {
    name: 'Badges',
    items: [{ name: 'Badges', points: 'Badges to go here' }],
  };
  const settings: ListModelSettings = {
    name: 'Settings',
    items: [{ name: 'Profile', points: 'Settings to go here' }],
  };
  const userPosts: ListModelUserPosts = {
    name: 'User Posts',
    items: [{ name: 'User Posts', points: 'User Posts Go Here' }],
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      {favorite && <FavoriteTruck {...{ favoriteTrucks }} />}

      <Badges {...{ badges }} />
      <Settings {...{ settings }} />
      <UserPosts {...{ userPosts }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f6',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
