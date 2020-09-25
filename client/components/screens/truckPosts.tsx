import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, ScrollView,
} from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import TruckPostItem from '../dropIns/TruckPostItem';
import InfoWindow from '../dropIns/InfoWindow';

export default function TruckPosts({ navigation }) {
  const [currentTruckPosts, setCurrentTruckPosts] = useState([]);
  const { currentTruck } = navigation.state.params.params;
  const { id } = currentTruck;

  const getTruckPosts = async() => {
    axios
      .get(`${process.env.EXPO_LocalLan}/truck/truckpost/${id}`)
      .then((response) => {
        setCurrentTruckPosts(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTruckPosts();
  }, []);

  const pressHandler = () => {
    navigation.navigate('TruckReviews', {
      params: {
        currentTruck, id, navigation, onReviews: true, onDetails: true,
      },
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
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <Button title="Reviews" onPress={pressHandler} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Details" onPress={pressHandlerDetails} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Posts"
            buttonStyle={{
              backgroundColor: 'darkblue',
            }}
            onPress={() => {}}
          />
        </View>
      </View>
      <View style={styles.infoWindowShell}>
        <InfoWindow
          currentTruck={currentTruck}
          navigation={navigation}
          style={styles.infoWindow}
          onDetails={true}
        />
      </View>
      <View style={styles.posts}>
        <ScrollView>
          {currentTruckPosts.map((post) => (
            <TruckPostItem
              currentTruck={currentTruck}
              post={post}
              key={post.id}
            />
          ))}
        </ScrollView>
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
    padding: 10,
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
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 1,
  },
});
