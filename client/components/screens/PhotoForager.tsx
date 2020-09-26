import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import Cloud from 'react-native-word-cloud';

export default function PhotoForager({ navigation }) {
  const [keywords, setKeywords] = useState([]);
  const [wordCloudKeywords, setWordCloudKeywords] = useState([]);
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
        .flat(1);

      setKeywords(wordCloudKeywords);
      setWordCloudKeywords(
        wordCloudKeywords.map((word) => ({
          keyword: word,
          frequency: 1,
          color: 'white',
        }))
      );
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
  };
  return (
    <View>
      <View style={styles.container}>
        {keywords.map((keyword) => (
          <View key={keyword} style={styles.buttons}>
            <Button title={keyword} buttonStyle={styles.button}/>
          </View>
        ))}
      </View>
      <View>
        <Cloud
          keywords={wordCloudKeywords}
          scale={250}
          largestAtCenter={true}
          drawContainerCircle={true}
          containerCircleColor={'#345678'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  button: {
    borderRadius: 15,
  },
  buttons: {
    marginTop: 2,
    width: 200,
    alignSelf: 'center',
  },
  cloud: {
    alignSelf: 'center',
  },
});
