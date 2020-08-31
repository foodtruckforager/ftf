const { Sequelize } = require('sequelize');
const UserModel = require('./models/User');
const TruckModel = require('./models/Truck');
const ReviewModel = require('./models/Review');
const PostModel = require('./models/Post');
const PhotoModel = require('./models/Photo');

const user = 'postgres';
const host = 'localhost';
const database = 'foodtruckdb';
const password = 'ludwig';
const port = 5432;
const sequelize = new Sequelize(
  `postgres://${user}:${password}@${host}:${port}/${database}`
);

const User = UserModel(sequelize, Sequelize);
const Truck = TruckModel(sequelize, Sequelize);
const Review = ReviewModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);
const Photo = PhotoModel(sequelize, Sequelize);

const connection = async() => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
const syncModels = async() => {
  try {
    await sequelize.sync();
    console.log('Models have been synced successfully.');
  } catch (error) {
    console.error('Unable to sync models:', error);
  }
};
async function doStuffWithUserModel() {
  const newUser = await User.create({
    full_name: 'John Smith',
  });
  console.log(newUser.id, newUser.full_name);
  const foundUser = await User.findOne({ where: { full_name: 'John Smith' } });
  if (foundUser === null) return;
  console.log(foundUser.full_name);
}
connection();
syncModels();
doStuffWithUserModel();

module.exports = {
  User,
  Truck,
  Review,
  Post,
  Photo,
};
