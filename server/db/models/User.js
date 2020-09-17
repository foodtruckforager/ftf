module.exports = (sequelize, DataTypes) => sequelize.define('users', {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  google_id: {
    type: DataTypes.STRING,
  },
  profile_photo_url: {
    type: DataTypes.STRING,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});
