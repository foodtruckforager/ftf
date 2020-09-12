module.exports = (sequelize, DataTypes) => sequelize.define('trucks', {
  business_name: {
    type: DataTypes.STRING,
  },
  phone_number: {
    type: DataTypes.STRING,
  },
  google_id: {
    type: DataTypes.STRING,
  },
  password: {
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
    type: DataTypes.INTEGER,
  },
  close_time: {
    type: DataTypes.INTEGER,
  },
  open_status: {
    type: DataTypes.BOOLEAN,
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
  },
}, {
  freezeTableName: true,
  timestamps: false,
});
