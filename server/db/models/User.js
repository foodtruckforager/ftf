module.exports = (sequelize, DataTypes) => sequelize.define('users', {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  google_id: {
    type: DataTypes.STRING,
  },
  berserkmode: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  theregular: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  aroundtheworld: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  feastmode: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  profile_photo_url: {
    type: DataTypes.STRING,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});
