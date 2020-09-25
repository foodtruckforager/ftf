import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import axios from 'axios';
import Cloud from 'react-native-word-cloud';

export default function PhotoForager({ navigation }) {
  const [keywords, setKeywords] = useState([]);
  const [currentTruckPosts, setCurrentTruckPosts] = useState([]);
  const [currentTruckReviews, setCurrentTruckReviews] = useState([]);

  useEffect(() => {
    getTruckReviews();
    getTruckPosts();
  }, []);

  useEffect(() => {
    if (currentTruckPosts || currentTruckReviews) {
      let reviewsPostsCombined = currentTruckPosts.map((post) => {
        if (post.keywords !== null) {
          return post.keywords.map((x) => x.class);
        }
      });
      reviewsPostsCombined.push(
        ...currentTruckReviews.map((review) => {
          if (review.keywords !== null) {
            return review.keywords.map((x) => x.class);
          }
        })
      );

      const wordCloudKeywords = reviewsPostsCombined
        .filter((x) => {
          if (Array.isArray(x)) {
            return x;
          }
        })
        .flat(1)
        .map((word) => ({ keyword: word, frequency: 1, color: 'white' }));
      setKeywords(wordCloudKeywords);
    }
  }, [currentTruckPosts, currentTruckReviews]);

  const getTruckPosts = async () => {
    axios
      .get(`${process.env.EXPO_LocalLan}/truck/truckpost/0`)
      .then((response) => {
        setCurrentTruckPosts(response.data);
      })
      .catch((err) => console.log(err));
  };

  const getTruckReviews = async () => {
    axios
      .get(`${process.env.EXPO_LocalLan}/truck/review/0`)
      .then((response) => {
        setCurrentTruckReviews(response.data);
      })
      .catch((err) => console.log(err));
  };

  const onPress = (e) => {
    alert(JSON.stringify(e));
  }
  return (
    <View>
      {/* {keywords.map((keyword) => (
        <View key={keyword}>
          <Text>{keyword}</Text>
        </View>
      ))} */}
      <Cloud
        keywords={keywords}
        scale={250}
        largestAtCenter={true}
        drawContainerCircle={false}
        containerCircleColor={'#345678'}
        onPress={onPress}
      />
    </View>
  );
}
