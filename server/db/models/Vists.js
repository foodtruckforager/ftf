module.exports = (sequelize, DataTypes) => sequelize.define('visits', {
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
}, {
  freezeTableName: true,
  timestamps: true,
});
