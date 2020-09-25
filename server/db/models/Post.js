module.exports = (sequelize, DataTypes) => sequelize.define('posts', {
  id_truck: {
    type: DataTypes.INTEGER,
    references: {
      model: 'trucks',
      key: 'id',
    },
  },
  title: {
    type: DataTypes.STRING,
  },
  message: {
    type: DataTypes.STRING,
  },
  photo: {
    type: DataTypes.STRING,
  },
  keywords: {
    type: DataTypes.JSONB,
  },
}, {
  freezeTableName: true,
  timestamps: true,
});
