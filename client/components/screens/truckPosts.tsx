import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, ScrollView,
} from 'react-native';
import { Button } from 'react-native-elements';
import { useTheme } from 'react-native-paper';
import axios from 'axios';
import TruckPostItem from '../dropIns/TruckPostItem';
import InfoWindow from '../dropIns/InfoWindow';

export default function TruckPosts({ navigation }) {
  const [currentTruckPosts, setCurrentTruckPosts] = useState([]);
  const { currentTruck } = navigation.state.params.params;
  const { id } = currentTruck;

  const { colors } = useTheme();

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

  const styles = StyleSheet.create({
    posts: {
      paddingTop: 34,
      flex: 0.2,
      flexGrow: 10,
      marginHorizontal: -12.5,
      marginBottom: -10,
    },
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: colors.backgroundCard,
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
      marginTop: -5,
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
      flex: 1.4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: -2,
      marginTop: -2,
    },
    buttonContainer: {
      flex: 1,
      paddingHorizontal: 1,
    },
    topButtons: {
      backgroundColor: colors.background,
    },
    topButtonsTitle: {
      color: 'black',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <Button
            title="Reviews"
            onPress={pressHandler}
            buttonStyle={styles.topButtons}
            titleStyle={styles.topButtonsTitle}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Details"
            onPress={pressHandlerDetails}
            buttonStyle={styles.topButtons}
            titleStyle={styles.topButtonsTitle}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Posts"
            buttonStyle={{
              backgroundColor: colors.pressedButton,
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
          onDetails
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
