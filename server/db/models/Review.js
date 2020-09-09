module.exports = (sequelize, DataTypes) => sequelize.define(
  'reviews',
  {
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
    review_title: {
      type: DataTypes.STRING,
    },
    review_description: {
      type: DataTypes.TEXT,
    },
    review_star: {
      type: DataTypes.INTEGER,
    },
    review_photo: {
      type: DataTypes.STRING,
    },
    upvotes: {
      type: DataTypes.INTEGER,
    },
    review_date: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);
