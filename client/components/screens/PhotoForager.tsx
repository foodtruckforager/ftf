import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import axios from 'axios';

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
          return post.keywords;
        }
      });
      reviewsPostsCombined.push(
        ...currentTruckReviews.map((review) => {
          if (review.keywords !== null) {
            return review.keywords;
          }
        })
      );
      alert(JSON.stringify(reviewsPostsCombined));
      setKeywords(reviewsPostsCombined);
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

  return (
    <View>
      {/* {keywords.map((keyword) => (
        <View key={keyword.class}>
          <Text>{keyword.class}</Text>
        </View>
      ))} */}
    </View>
  );
}
