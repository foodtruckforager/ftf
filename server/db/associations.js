// https://stackoverflow.com/questions/44936047/define-sequelize-associations-in-separated-file

const Post = require('./models/Post');
const Truck = require('./models/Truck');

const setAssociations = () => {
  Post.belongsTo(Truck);
};

module.exports = setAssociations;
