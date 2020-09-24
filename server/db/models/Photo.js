module.exports = (sequelize, DataTypes) => sequelize.define('photos', {
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
  url: {
    type: DataTypes.STRING,
  },
  caption: {
    type: DataTypes.STRING,
  },
  keywords: {
    type: DataTypes.JSONB,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});
