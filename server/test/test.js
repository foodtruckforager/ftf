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

  // await Truck.create({
  //   full_name: 'Rolling Fatties',
  //   phone_number: '9999999',
  //   google_id: '1',
  //   qr_code: 'qrCode',
  //   logo: 'sweet logo',
  //   food_genre: 'mexican',
  //   blurb: 'we are phat',
  //   open_time: '9',
  //   close_time: '9',
  //   latitude: 29.9510660269581,
  //   longitude: -90.0715321674943,
  //   star_average: 5,
  // }).then((newTruck) => console.log(newTruck))
  //   .catch((err) => console.error(err));

    await Truck.create({
    full_name: 'Rolling Fatts',
    phone_number: '99999995555',
    google_id: '7',
    qr_code: 'qrCode',
    logo: 'sweet logo',
    food_genre: 'mexican',
    blurb: 'we are phatssssss',
    open_time: '9',
    close_time: '9',
    latitude: 29.9511661269581,
    longitude: -90.0715321674943,
    star_average: 5,
  }).then((newTruck) => console.log(newTruck))
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

const secondInsert = async() => {
    await Truck.create({
    full_name: 'fooodd',
    phone_number: '99999995555',
    google_id: '4',
    qr_code: 'qrCode',
    logo: 'sweet logo',
    food_genre: 'mexican',
    blurb: 'we are phatssssss',
    open_time: '9',
    close_time: '9',
    latitude: 29.9511661269581,
    longitude: -90.0715321674943,
    star_average: 5,
  }).then((newTruck) => console.log(newTruck))
    .catch((err) => console.error(err));
};

secondInsert();
doStuffWithUserModel();
