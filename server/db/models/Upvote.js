module.exports = (sequelize, DataTypes) => sequelize.define('upvotes', {
  id_user: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  id_review: {
    type: DataTypes.INTEGER,
    references: {
      model: 'reviews',
      key: 'id',
    },
  },
}, {
  freezeTableName: true,
  timestamps: false,
});
