import React, { useState } from 'react';
import {
  Button,
  Overlay,
  SearchBar,
  Text,
  Rating,
  AirbnbRating,
} from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

const SubmitOverlay = ({ onReviews }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(5);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const updateTitle = (title: string) => {
    setTitle(title);
  };
  const updateDescription = (description: string) => {
    setDescription(description);
  };
  const onFinishRating = (rating: number) => {
    setRating(rating);
  };

  return (
    <View>
      <Button title="Write Review" onPress={toggleOverlay} />
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        fullScreen={false}
      >
        <Text h3> 📝 Write Review: </Text>
        <AirbnbRating
          size={22}
          defaultRating={5}
          showRating
          onFinishRating={onFinishRating}
        />
        <SearchBar
          placeholder="Title"
          lightTheme={true}
          searchIcon={false}
          onChangeText={updateTitle}
          value={title}
        />
        <SearchBar
          placeholder="Description"
          lightTheme={true}
          searchIcon={false}
          onChangeText={updateDescription}
          value={description}
        />
        <View style={styles.verticalPadding}>
          <Button title="📎 Attach Photo" onPress={() => {}} />
          <Button style={styles.slightVerticalPadding} title="✏️ Submit Review" onPress={toggleOverlay} />
          <Button title="❌ Close" onPress={toggleOverlay} />
        </View>
      </Overlay>
    </View>
  );
};

export default SubmitOverlay;

const styles = StyleSheet.create({
  verticalPadding: {
    paddingVertical: 10,
  },
  slightVerticalPadding: {
    paddingVertical: 2,
  },
});
