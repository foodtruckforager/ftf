# 🚚 Food Truck Forager

Application for live tracking food trucks

# Description

Welcome to Food Truck Forager. Food Truck Forager provides users access to food trucks in their area. Food trucks load automatically as a user traverses to new areas within Google Maps. Users can save their favorite trucks, review trucks, and earn achievements based on how often they visit food trucks. Additionally users can receive push notifications for trucks in their area!

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
  GOOGLE_PLACES_API_KEY           // Google Places API Credential
  EXPO_iosClientId                // Google Development Console iOS Client ID
  EXPO_androidClientId            // Google Development Console Android Client ID
  EXPO_LocalLan                   // localLanAddress:ServerPort (find via ipconfig or ifconfig, default port:8080)
  CLOUDINARY_KEY                  // key for Cloudinary image uploads
  CLOUDINARY_PRESET               // preset for Cloudinary image uploads
  DB_USERNAME                     // PostgreSQL login username
  DB_PASSWORD                     // PostgreSQL password
  DB_HOST                         // database host (default=localhost)
  DB_PORT                         // database port (default=5432)
  DB_DBNAME                       // database name (default=foodtruckdb)
```

# Contributing

Contributing to others’ projects is an avenue to learn new software development skills and experience new technologies. The pull request is how your personal contributions will be added to the project. The following is an overview of the Git project management workflow:

Search project for contribution instructions and follow them if present.
Fork project repo from your personal Github account.
Copy the fork and clone repo onto your local machine.
Add the original repository (the you forked) as a remote called upstream.
If you created your fork a while ago be sure to pull upstream changes into your local repository.
Create a new branch to work on! Branch from develop if it exists, else from master.
Implement/fix your feature, comment your code.
Follow the code style of the project, including indentation.
If the project has included tests use them.
Add additional tests or convert existing tests as necessary.
Add or convert project documentation as needed.
Push your working branch to your forked repo on Github.
Make a pull request from your forked repo to the origin master or development branch if present.
Once your pull request is merged, pull down upstream master to your local repo and delete any additional branch(es) you may have created.
Commit messages should be written in present tense describing what the committed code does and not what you changed in the code.

# References

[Download PostgreSQL](https://www.postgresql.org/download/)

# Contact

- ioctosteigner@gmail.com
- peterklingelhofer@gmail.com
