import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, AsyncStorage,
} from 'react-native';
import axios from 'axios';
import FavoriteTruck, {
  FavoriteTruck as ListModelFavoriteTruck,
} from './FavoriteTruck';
import Badges, { Badges as ListModelBadges } from './Badges';
import Settings, { Settings as ListModelSettings } from './Settings';
import UserPosts, { UserPosts as ListModelUserPosts } from './UserPosts';
import UserSettings from '../../client/components/screens/settings';

export default () => {
  const [favorite, setFavorite] = useState([]);
  const [googleUserId, setGoogleUserId] = useState(null);
  const [userId, setUserId] = useState(0);
  const [visits, setVisits] = useState([]);
  const [badgeTheRegular, setBadgeTheRegular] = useState(false);
  const [badgeFeastMode, setBadgeFeastMode] = useState(false);
  const [badgeBerserker, setBadgeBerserker] = useState(false);
  const [badgeIGotTrucked, setBadgeIGotTrucked] = useState(false);
  const [badgeParliamentTruckaDelic, setBadgeParliamentTruckaDelic] = useState(false);
  const [badgeAroundTheWorld, setBadgeAroundTheWorld] = useState(false);
 

  useEffect(() => {
    const retrieveCurrentUserId = async() => {
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
    const getUserIdWithGoogleUserId = async() => {
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
    const retrieveCurrentUserFavorites = async() => {
      axios
        .get(`${process.env.EXPO_LocalLan}/user/favorites/${userId}`)
        .then((response) => {
          const { data } = response;
          const { length } = data;
          if (length) {
            if (data !== undefined) {
              const filteredFavorites = data.map((savedFavorite: Object) => ({
                name: savedFavorite.truck.full_name,
                points: savedFavorite.truck.food_genre,
              }));
              setFavorite(filteredFavorites);
            }
          }
        })
        .catch((err) => console.log('CATCH:retrieveCurrentUserFavorites', err));
    };
    retrieveCurrentUserFavorites();
  }, [userId]);

  useEffect(() => {
    axios.get(`${process.env.EXPO_LocalLan}/user/get/visits/${userId}`)
      .then((response) => {
        setVisits(response.data);
      })
      .catch((err) => console.error(err));
  }, [userId]);

  useEffect(() => {
    if (visits !== []) {
      if (visits.length > 3) {
        setBadgeIGotTrucked(true);
      }
      if (visits.length > 10) {
        setBadgeParliamentTruckaDelic(true);
      }
      if (visits.length > 15) {
        setBadgeFeastMode(true);
      }
      if ([...new Set(visits.map((visit: Object) => visit.id_truck))].length > 3) {
        setBadgeAroundTheWorld(true);
      }

      let berserkBoolean = false;
      visits.forEach((visit, i, visitCollection) => {
        if (visitCollection.filter((x) => ((x.createdAt.substring(0, 10)) === visit.createdAt.substring(0, 10)) && (x.truck_id === visit.truck_id)).length > 3) {
          berserkBoolean = true;
        }
      });
      setBadgeBerserker(berserkBoolean);
      // TODO: Five same truck ids in seven days (theRegular)
    }
  }, [visits]);

  const badgeArray = [];

  if (badgeIGotTrucked) {
    badgeArray.push({ name: '🥉 3 trucks', points: 'I Got Trucked' });
  }
  if (badgeParliamentTruckaDelic) {
    badgeArray.push({ name: '🥈 10 trucks', points: 'Parliament Truck-a-Delic' });
  }
  if (badgeFeastMode) {
    badgeArray.push({ name: '🥇 30 trucks', points: 'Feast Mode' });
  }
  if (badgeAroundTheWorld) {
    badgeArray.push({ name: '🎖 5 different trucks', points: 'Around The World' });
  }
  if (badgeBerserker) {
    badgeArray.push({ name: '🏅 same truck 3x 1/week', points: 'Berserker' });
  }
  if (badgeTheRegular) {
    badgeArray.push({ name: '🏆', points: 'The Regular' });
  }

  const favoriteTrucks: ListModelFavoriteTruck = {
    name: 'User Profile Demo',
    items: favorite || [
      { name: 'Food Truck Demo 1', points: 'Favorites To Go Here' },
    ],
  };

  const badges: ListModelBadges = {
    name: 'Badges',
    items: badgeArray || [{ name: 'Badges', points: 'Badges to go here' }],
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
      {/* <Text style={styles.title}>User Profile</Text> */}
      <View style={styles.settings}>
        <UserSettings />
      </View>
      <View>
        {favorite && <FavoriteTruck {...{ favoriteTrucks }} />}
        <Badges {...{ badges }} />
        <Settings {...{ settings }} />
      </View>
      {/* <UserPosts {...{ userPosts }} /> */}
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
  settings: {
    // flex: 0.1,
    height: -500,
  },
});
