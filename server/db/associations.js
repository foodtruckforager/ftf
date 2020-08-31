const User = require('./models/User');
const Truck = require('./models/Truck');
const Review = require('./models/Review');
const Post = require('./models/Post');
const Photo = require('./models/Photo');

const setAssociations = () => {
  User.belongsToMany(Truck, { through: Review });
  Post.belongsTo(Truck);
  Photo.belongsTo(Truck);
};

module.exports = setAssociations;
