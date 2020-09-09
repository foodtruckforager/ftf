module.exports = (sequelize, DataTypes) => sequelize.define('favorites', {
  id_user: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  id_truck: {
    type: DataTypes.INTEGER,
    references: {
      model: 'trucks',
      key: 'id',
    },
  },
  favorite: {
    type: DataTypes.BOOLEAN,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});
