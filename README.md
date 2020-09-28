![🚚](https://64.media.tumblr.com/eba71d8284c7d22342740eaec5a310d2/tumblr_n7zzgtw8Wa1rn9vmdo1_r1_400.gif)

# Food Truck Forager

Application for live tracking food trucks

# Description

Welcome to Food Truck Forager. Food Truck Forager provides users access to food trucks in their area. Food trucks load automatically as a user traverses to new areas within Google Maps or Apple Maps. Users can save their favorite trucks, review trucks, and earn achievements based on how often they visit food trucks. Additionally, users can receive push notifications for trucks in their area! All photos uploaded are automatically tagged via machine learning AI image classification for screen reader accessibility options and photo content search.

# Dependencies

 - Babel
 - Eslint
 - Expo
 - Express
 - Fetch
 - Node
 - PostgreSQL
 - Sequelize
 - React Native
 - React Native Maps
 - React Navigation
 - TensorFlow.js

```javascript
"dependencies": {
    "@react-native-community/async-storage": "^1.12.0",
    "@react-native-community/masked-view": "0.1.10",
    "@react-navigation/native": "^5.7.3",
    "@react-navigation/stack": "^5.9.0",
    "@tensorflow-models/coco-ssd": "^2.1.0",
    "@tensorflow/tfjs": "^2.3.0",
    "@tensorflow/tfjs-backend-cpu": "^2.3.0",
    "@tensorflow/tfjs-backend-webgl": "^2.3.0",
    "@tensorflow/tfjs-core": "^2.3.0",
    "@tensorflow/tfjs-react-native": "^0.3.0",
    "axios": "^0.20.0",
    "babel-plugin-inline-dotenv": "^1.6.0",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "expo": "~38.0.8",
    "expo-barcode-scanner": "~8.2.1",
    "expo-camera": "~8.3.1",
    "expo-constants": "~9.1.1",
    "expo-gl": "^8.3.1",
    "expo-google-app-auth": "^8.1.2",
    "expo-image-picker": "~8.3.0",
    "expo-notifications": "^0.5.0",
    "expo-permissions": "^9.1.0",
    "expo-status-bar": "^1.0.2",
    "expo-web-browser": "~8.3.1",
    "express": "^4.17.1",
    "fuzzy-search": "^3.2.1",
    "jpeg-js": "^0.4.2",
    "node-fetch": "^2.6.1",
    "nodemon": "^2.0.4",
    "pg": "^8.3.3",
    "react": "~16.11.0",
    "react-dom": "~16.11.0",
    "react-native": "https://github.com/expo/react-native/archive/sdk-38.0.2.tar.gz",
    "react-native-custom-qr-codes-expo": "^2.2.0",
    "react-native-elements": "^2.3.2",
    "react-native-fs": "^2.16.6",
    "react-native-gesture-handler": "~1.6.0",
    "react-native-maps": "0.27.1",
    "react-native-masked-view": "^0.2.0",
    "react-native-material-dropdown": "^0.11.1",
    "react-native-reanimated": "~1.9.0",
    "react-native-redash": "^8.0.0",
    "react-native-safe-area-context": "~3.0.7",
    "react-native-safe-area-view": "^1.1.1",
    "react-native-screens": "~2.9.0",
    "react-native-svg": "12.1.0",
    "react-native-web": "~0.11.7",
    "react-navigation": "^4.4.0",
    "react-navigation-drawer": "^2.5.0",
    "react-navigation-stack": "^2.8.2",
    "sequelize": "^6.3.4",
    "tcomb-form-native": "^0.6.20"
  },
  "devDependencies": {
    "@babel/core": "^7.8.6",
    "@types/react": "~16.9.41",
    "@types/react-native": "~0.62.13",
    "@typescript-eslint/eslint-plugin": "^3.10.1",
    "@typescript-eslint/parser": "^3.10.1",
    "eslint": "^7.7.0",
    "eslint-config-airbnb-typescript": "^9.0.0",
    "eslint-config-universe": "^4.0.0",
    "eslint-plugin-import": "^2.22.0",
    "eslint-plugin-jsx-a11y": "^6.3.1",
    "eslint-plugin-react": "^7.20.6",
    "eslint-plugin-react-hooks": "^4.1.0",
    "typescript": "~3.9.5",
    "husky": "^4.2.5"
  },
```

# Installation

First, install PostgreSQL 12 on your machine:
https://www.postgresql.org/download/

Then, use `node -v` to check your current version of Node. Upgrade to 12, if not currently on version 12.

Development:

```
npm install                     // installs dependencies
// go to /node_modules/react-native-material-textfield/src/components
// add '//' in front of line 27 in affix/index.js: // style: Animated.Text.propTypes.style,
// add '//' in front of line 13 in helper/index.js: // style: Animated.Text.propTypes.style,
// add '//' in front of line 32 in label/index.js: // style: Animated.Text.propTypes.style,
psql -U root                    // log in to postgreSQL with your password
CREATE DATABASE foodtruckdb;    // create postgreSQL database
\c foodtruckdb;                 // connect to foodtruckdb database
npm run server                  // starts development server
npm run test-db                 // tests database commands and populates w/ sample data
expo start                      // runs compiler for Expo
```

# Environment Variables

Place in a .env file in outermost directory

```
env_variables:
  GOOGLE_PLACES_API_KEY          // Google Places API Credential
  EXPO_iosClientId               // Google Development Console iOS Client ID
  EXPO_androidClientId           // Google Development Console Android Client ID
  EXPO_LocalLan                  // localLanAddress:ServerPort (find via ipconfig or ifconfig, default port:8080)
  CLOUDINARY_KEY                 // key for Cloudinary image uploads
  CLOUDINARY_PRESET              // preset for Cloudinary image uploads
  DB_USERNAME                    // PostgreSQL login username
  DB_PASSWORD                    // PostgreSQL password
  DB_HOST                        // database host (default=localhost)
  DB_PORT                        // database port (default=5432)
  DB_DBNAME                      // database name (default=foodtruckdb)
```

# References

[Download PostgreSQL](https://www.postgresql.org/download/)

# Contact

- ioctosteigner@gmail.com
- peterklingelhofer@gmail.com
