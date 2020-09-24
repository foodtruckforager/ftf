import React, { Component } from 'react';
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

export default class ImageUploadOverlay extends Component {
  constructor(props: object) {
    super(props);
    this.state = {
      isTfReady: false,
      isModelReady: false,
      predictions: null,
      image: null,
      userHasChangedPhoto: false,
      selectedImage: '',
      pickerResult: '',
    };
  }
  /////////////
  
  openImagePickerAsync = async (pickerResult) => {
    const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/upload`;
    const {
      onReviews,
      toggleImageUploadOverlay,
      imageUploadOverlayVisible,
      keywords,
      setKeywords,
      photo,
      setPhoto,
    } = this.props;

    const base64Img = `data:image/jpg;base64,${pickerResult.base64}`;
    alert(base64Img);

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
        this.setState({ userHasChangedPhoto: true });
        setPhoto(data.url);
      })
      .catch((err) => console.log(err));
  };
  //////////////////////////////////////////////

  async componentDidMount() {
    await tf.ready(); // preparing TensorFlow
    this.setState({ isTfReady: true });
    this.model = await cocossd.load(); // preparing COCO-SSD model
    this.setState({ isModelReady: true });
    this.getPermissionAsync(); // get permission for accessing camera on mobile device
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Please grant camera roll permission for this project!');
      }
    }
  };

  imageToTensor(rawImageData) {
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0;
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];
      offset += 4;
    }
    return tf.tensor3d(buffer, [height, width, 3]);
  }

  detectObjects = async () => {
    const { keywords, setKeywords } = this.props;
    try {
      const imageAssetPath = Image.resolveAssetSource(this.state.image);
      const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
      const rawImageData = await response.arrayBuffer();
      const imageTensor = this.imageToTensor(rawImageData);
      const predictions = await this.model.detect(imageTensor);
      this.setState({ predictions });
      setKeywords(predictions.filter((x: Object) => x.class || x.score));
      console.log('----------- predictions: ', predictions.filter((x: Object) => x.class || x.score));
    } catch (error) {
      console.log('Exception Error: ', error);
    }
  };

  selectImage = async () => {
    try {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
      });
      if (!response.cancelled) {
        const source = { uri: response.uri };
        this.setState({ image: source });
        this.setState({ selectedImage: { localUri: response.uri } });
        this.detectObjects();
        this.openImagePickerAsync(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  renderPrediction = (prediction, index) => {
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

  render() {
    const {
      onReviews,
      toggleImageUploadOverlay,
      imageUploadOverlayVisible,
      keywords,
      setKeywords,
      photo,
      setPhoto,
    } = this.props;
    const { isTfReady, isModelReady, predictions, image } = this.state;
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
                onPress={isModelReady ? this.selectImage : undefined}
              >
                {image && (
                  <Image source={image} style={styles.imageContainer} />
                )}
                {isModelReady && !image && (
                  <Text style={styles.transparentText}>
                    Tap to choose image
                  </Text>
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
                  predictions.map((p, index) =>
                    this.renderPrediction(p, index)
                  )}
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
  }
}

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
