import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import axios from 'axios';
import TruckPostItem from '../dropIns/TruckPostItem';
import InfoWindow from '../dropIns/InfoWindow';
import SubmitOverlay from '../dropIns/SubmitOverlay';

export default function TruckPosts({ navigation }) {
  const [currentTruckPosts, setCurrentTruckPosts] = useState([]);
  const { currentTruck } = navigation.state.params.params;
  const { id } = currentTruck;
  const [isVisible, setIsVisible] = useState(false);

  const toggleOverlay = () => {
    setIsVisible(!isVisible);
  };

  const getTruckPosts = async () => {
    axios
      .get(`${process.env.EXPO_LocalLan}/truck/truckpost/${id}`)
      .then((response) => {
        setCurrentTruckPosts(response.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTruckPosts();
  }, []);

  const pressHandler = () => {
    navigation.navigate(`TruckReviews`, {
      params: { currentTruck, id, navigation, onReviews: true },
    });
  };
  const pressHandlerDetails = () => {
    navigation.navigate('TruckDetails', {
      params: {
        currentTruck,
        id,
        navigation,
        onDetails: true,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Go To Reviews" onPress={pressHandler} />
      <Button title="Go To Details" onPress={pressHandlerDetails} />
      <View style={styles.infoWindowShell}>
        <InfoWindow
          currentTruck={currentTruck}
          navigation={navigation}
          onReviews={true}
          style={styles.infoWindow}
        />
      </View>
      <View style={styles.posts}>
        {currentTruckPosts.map((post) => (
          <TruckPostItem
            currentTruck={currentTruck}
            post={post}
            key={post.id}
          />
        ))}
      </View>
      <View style={styles.modal}>
        <SubmitOverlay
          isVisible={isVisible}
          onBackdropPress={toggleOverlay}
          currentTruck={currentTruck}
          getTruckPosts={getTruckPosts}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  posts: {
    flex: 0.4,
    flexGrow: 10,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  modal: {
    flex: 0.1,
    flexGrow: 1.4,
  },
  infoWindow: {
    flex: 0.2,
    flexGrow: 10,
  },
  infoWindowShell: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
});
