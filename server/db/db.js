/* eslint-disable no-console */
require('dotenv').config();
const { Sequelize } = require('sequelize');
const UserModel = require('./models/User');
const TruckModel = require('./models/Truck');
const ReviewModel = require('./models/Review');
const PostModel = require('./models/Post');
const PhotoModel = require('./models/Photo');
const UpvoteModel = require('./models/Upvote');
const FavoriteModel = require('./models/Favorite');
const VisitsModel = require('./models/Vists');

const user = process.env.DB_USERNAME;
const host = process.env.DB_HOST;
const database = process.env.DB_DBNAME;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;

const sequelize = new Sequelize(
  `postgres://${user}:${password}@${host}:${port}/${database}`, {
    logging: false,
  },
);

const User = UserModel(sequelize, Sequelize);
const Truck = TruckModel(sequelize, Sequelize);
const Review = ReviewModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);
const Photo = PhotoModel(sequelize, Sequelize);
const Upvote = UpvoteModel(sequelize, Sequelize);
const Favorite = FavoriteModel(sequelize, Sequelize);
const Visit = VisitsModel(sequelize, Sequelize);

User.hasMany(Favorite, { foreignKey: 'id_user' });
Truck.hasMany(Favorite, { foreignKey: 'id_truck' });
Favorite.belongsTo(User, { foreignKey: 'id_user' });
Favorite.belongsTo(Truck, { foreignKey: 'id_truck' });
Visit.belongsTo(User, { foreignKey: 'id_user' });
User.hasMany(Visit, { foreignKey: 'id_user' });

const connection = async() => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  }
};
const syncModels = async() => {
  try {
    await sequelize.sync();
    console.log('Models have been synced successfully.');
  } catch (error) {
    console.log('Unable to sync models:', error);
  }
};

connection();
syncModels();

module.exports = {
  User,
  Truck,
  Review,
  Post,
  Photo,
  Upvote,
  Favorite,
  Visit,
};
