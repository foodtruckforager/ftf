# 🚚 Food-Truck-Tracker
Application for live tracking food trucks 

# Description
Welcome to Food Truck Tracker. Food Truck Tracker provides users access to food trucks in their area. Food trucks load automatically as a user traverses to new areas within Google Maps. Users can save their favorite trucks, review trucks, and earn achievements based on how often they visit food trucks. Additionally users can receive push notifications for trucks in their area!

# Dependencies
Stack:
PostgreSQL
Sequelize
Express
Expo
React Native
React Navigation
Node
Babel
Fetch
Eslint
Google Map React Native
```javascript
  "dependencies": {
    "@react-native-community/masked-view": "^0.1.10",
    "babel-plugin-inline-dotenv": "^1.6.0",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "expo": "~38.0.8",
    "expo-google-app-auth": "^8.1.2",
    "expo-status-bar": "^1.0.2",
    "express": "^4.17.1",
    "husky": "^4.2.5",
    "nodemon": "^2.0.4",
    "pg": "^8.3.3",
    "react": "~16.11.0",
    "react-dom": "~16.11.0",
    "react-native": "https://github.com/expo/react-native/archive/sdk-38.0.2.tar.gz",
    "react-native-gesture-handler": "~1.6.0",
    "react-native-masked-view": "^0.2.0",
    "react-native-reanimated": "~1.9.0",
    "react-native-redash": "^8.0.0",
    "react-native-safe-area-view": "^1.1.1",
    "react-native-screens": "^2.10.1",
    "react-native-web": "~0.11.7",
    "react-navigation": "^4.4.0",
    "react-navigation-drawer": "^2.5.0",
    "react-navigation-stack": "^2.8.2",
    "sequelize": "^6.3.4"
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
    "typescript": "~3.9.5"
  },
  ```


# Installation
First, install PostgreSQL 12 on your machine:
https://www.postgresql.org/download/

Then, use `node -v` to check your current version of Node. Upgrade to 12, if not currently on version 12.

Development:
```
npm install                     // installs dependencies
expo start                      // runs compiler for Expo
psql -U root                    // log in to postgreSQL with your password
CREATE DATABASE foodtruckdb;    // create postgreSQL database
\c foodtruckdb;                 // connect to foodtruckdb database
npm run server-start            // starts development server
```

# Environment Variables
Place in a .env file in outermost directory
```
env_variables:
  EXPO_iosClientId                // Google Development Console iOS Client ID
  EXPO_androidClientId            // Google Development Console Android Client ID
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

# License
ISC License (ISC)
Copyright 2020

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.


# Contact
* sebastianhove@gmail.com
* ioctosteigner@gmail.com
* peterklingelhofer@gmail.com
* toph.stumpe@gmail.com
