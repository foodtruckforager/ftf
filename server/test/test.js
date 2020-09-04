/* eslint-disable no-console */
const {
  User,
  Truck,
  Review,
} = require('../db/db');

async function doStuffWithUserModel() {
  await User.create({
    full_name: 'John Smith',
  });
  const foundUser = await User.findOne({ where: { full_name: 'John Smith' } });
  if (foundUser === null) return;

  await Truck.create({
    full_name: 'Rolling Fatties',
  })
    .then((newTruck) => console.log(newTruck))
    .catch((err) => console.error(err));

  const foundTruck = await Truck.findOne({
    where: { full_name: 'Rolling Fatties' },
  })
    .then((found) => console.log(found))
    .catch((err) => console.error(err));

  if (foundTruck === null) return;

  await Review.create({
    review_title: 'I LOVE Rolling Fatties THEYRE INCREDIBLE!!!!',
    id_user: 1,
    id_truck: 1,
    upvotes: 0,
  })
    .then((newReview) => console.log(newReview))
    .catch((err) => console.error(err));

  await Review.findAll({
    where: { id_user: 1 },
  })
    .then((allReviews) => console.log(allReviews))
    .catch((err) => console.error(err));
}

doStuffWithUserModel();
