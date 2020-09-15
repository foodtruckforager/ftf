module.exports = (sequelize, DataTypes) => sequelize.define('trucks', {
  full_name: {
    type: DataTypes.STRING,
  },
  phone_number: {
    type: DataTypes.STRING,
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
  number_of_reviews: {
    type: DataTypes.INTEGER,
  },
  open_time: {
    type: DataTypes.STRING,
  },
  close_time: {
    type: DataTypes.STRING,
  },
  open_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
  },
}, {
  freezeTableName: true,
  timestamps: true,
});
