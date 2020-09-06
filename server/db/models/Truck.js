module.exports = (sequelize, DataTypes) => sequelize.define('trucks', {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.INTEGER,
  },
  google_id: {
    type: DataTypes.STRING,
  },
  qr_code: {
    type: DataTypes.STRING,
  },
  logo: {
    type: DataTypes.STRING,
  },
  food_genre: {
    type: DataTypes.STRING,
  },
  blurb: {
    type: DataTypes.TEXT,
  },
  star_average: {
    type: DataTypes.DECIMAL,
  },
  open_time: {
    type: DataTypes.INTEGER,
  },
  close_time: {
    type: DataTypes.INTEGER,
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8), // {alter: true in index.js}
  },
}, {
  freezeTableName: true,
  timestamps: false,
});
