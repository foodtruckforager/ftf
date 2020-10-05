import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import * as tf from '@tensorflow/tfjs';
import { fetch } from '@tensorflow/tfjs-react-native';
import * as cocossd from '@tensorflow-models/coco-ssd';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as jpeg from 'jpeg-js';
import * as ImagePicker from 'expo-image-picker';

const ImageUploadOverlay = ({
  onReviews,
  toggleImageUploadOverlay,
  imageUploadOverlayVisible,
  keywords,
  setKeywords,
  photo,
  setPhoto,
}) => {
  const [isTfReady, setIsTfReady] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [image, setImage] = useState(null);
  const [model, setModel] = useState(null);
  const [userHasChangedPhoto, setUserHasChangedPhoto] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [pickerResult, setPickerResult] = useState('');

  const openImagePickerAsync = async (pickerResult) => {
    const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/upload`;

    const base64Img = `data:image/jpg;base64,${pickerResult.base64}`;

    const data = {
      file: base64Img,
      upload_preset: `${process.env.CLOUDINARY_UPLOAD_PRESET}`,
    };

    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })
      .then(async (r) => {
        const data = await r.json();
        setUserHasChangedPhoto(true);
        setPhoto(data.url);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const startup = async () => {
      await tf.ready(); // preparing TensorFlow
      setIsTfReady(true);
      setModel(await cocossd.load()); // preparing COCO-SSD model
      setIsModelReady(true);
      getPermissionAsync(); // get permission for accessing camera on mobile device
    };
    startup();
  }, []);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Please grant camera roll permission for this project!');
      }
    }
  };

  const imageToTensor = (rawImageData) => {
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
    // Drop the alpha channel info for mobilenet
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0; // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];

      offset += 4;
    }

    return tf.tensor3d(buffer, [height, width, 3]);
  };

  const detectObjects = async (source) => {
    try {
      const imageAssetPath = Image.resolveAssetSource(source);

      const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
      const rawImageData = await response.arrayBuffer();
      const imageTensor = imageToTensor(rawImageData);
      const newPredictions = await model.detect(imageTensor);
      setPredictions(newPredictions);

      console.log('----------- predictions: ', newPredictions);
    } catch (error) {
      console.log('Exception Error: ', error);
    }
  };

  const selectImage = async () => {
    try {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
      });
      if (!response.cancelled) {
        const source = { uri: response.uri };
        setImage(source);
        setSelectedImage({ localUri: response.uri });
        detectObjects(source);
        openImagePickerAsync(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderPrediction = (prediction, index) => {
    const pclass = prediction.class;
    const { score } = prediction;
    const x = prediction.bbox[0];
    const y = prediction.bbox[1];
    const w = prediction.bbox[2];
    const h = prediction.bbox[3];
    return (
      <View style={styles.welcomeContainer}>
        <Text key={index} style={styles.text}>
          Prediction: {pclass} {', '} Probability: {score} {', '}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Button
          title="📎 Attach Photo"
          onPress={toggleImageUploadOverlay}
          buttonStyle={styles.button}
        />
      </View>
      <Overlay
        isVisible={imageUploadOverlayVisible}
        onBackdropPress={toggleImageUploadOverlay}
        fullScreen={false}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <StatusBar barStyle="light-content" />
            <View style={styles.loadingContainer}>
              <Text style={styles.text}>
                TensorFlow.js ready? {isTfReady ? <Text>✅</Text> : ''}
              </Text>
              <View style={styles.loadingModelContainer}>
                <Text style={styles.text}>COCO-SSD model ready? </Text>
                {isModelReady ? (
                  <Text style={styles.text}>✅</Text>
                ) : (
                  <ActivityIndicator size="small" />
                )}
              </View>
            </View>
            <TouchableOpacity
              style={styles.imageWrapper}
              onPress={isModelReady ? selectImage : undefined}
            >
              {image && <Image source={image} style={styles.imageContainer} />}
              {isModelReady && !image && (
                <Text style={styles.transparentText}>Tap to choose image</Text>
              )}
            </TouchableOpacity>
            <View style={styles.predictionWrapper}>
              {isModelReady && image && (
                <Text style={styles.text}>
                  Predictions: {predictions ? '' : 'Detecting...'}
                </Text>
              )}
              {isModelReady &&
                predictions &&
                predictions.map((p, index) => renderPrediction(p, index))}
            </View>
            <View>
              <Button
                title="📎 Attach Photo"
                onPress={toggleImageUploadOverlay}
                buttonStyle={styles.button}
              />
            </View>
          </View>
        </ScrollView>
      </Overlay>
    </View>
  );
};

ImageUploadOverlay.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  contentContainer: {
    paddingTop: 10,
  },
  loadingContainer: {
    marginTop: 20,
    justifyContent: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 16,
  },
  loadingModelContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imageWrapper: {
    width: 280,
    height: 280,
    padding: 10,
    borderColor: '#000000',
    borderWidth: 5,
    borderStyle: 'dashed',
    marginTop: 40,
    marginBottom: 10,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 250,
    height: 250,
    position: 'absolute',
    top: 10,
    left: 10,
    bottom: 10,
    right: 10,
  },
  predictionWrapper: {
    height: 100,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  transparentText: {
    color: '#000000',
    opacity: 0.7,
  },
  footer: {
    marginTop: 40,
  },
  poweredBy: {
    fontSize: 20,
    color: '#e69e34',
    marginBottom: 6,
  },
  tfLogo: {
    width: 125,
    height: 70,
  },
  button: {
    borderRadius: 15,
    padding: 10,
    width: 300,
    alignSelf: 'center',
  },
});

export default ImageUploadOverlay;
