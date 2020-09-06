/* eslint-disable no-console */
const { User, Truck, Review } = require('../db/db');

async function doStuffWithUserModel() {
  await User.create({
    full_name: 'John Smith',
  });
  const foundUser = await User.findOne({ where: { full_name: 'John Smith' } });
  if (foundUser === null) {
    return;
  }

  await Truck.create({
    full_name: 'Rolling Fatties',
    phone_number: '9999999',
    google_id: '1',
    qr_code: 'qrCode',
    logo: 'https://reactnative.dev/img/tiny_logo.png',
    food_genre: 'mexican',
    blurb: 'testblurb lorem ipsum',
    open_time: '9',
    close_time: '9',
    latitude: 29.9510660269581,
    longitude: -90.0715321674943,
    star_average: 5,
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  await Truck.create({
    full_name: 'foodtruck2',
    phone_number: '99949999',
    google_id: '2',
    qr_code: 'qrCode1',
    logo: 'https://reactnative.dev/img/tiny_logo.png',
    food_genre: 'thai',
    blurb: 'lorem ipsum test description',
    open_time: '10',
    close_time: '10',
    latitude: 29.9210660269581,
    longitude: -90.1715321674943,
    star_average: 4,
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  await Truck.create({
    full_name: 'foodtruck3',
    phone_number: '999449999',
    google_id: '3',
    qr_code: 'qrCode2',
    logo: 'https://reactnative.dev/img/tiny_logo.png',
    food_genre: 'italian',
    blurb: 'lorem ipsum test description',
    open_time: '11',
    close_time: '11',
    latitude: 29.9410660269581,
    longitude: -90.4715321674943,
    star_average: 3,
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  const foundTruck = await Truck.findOne({
    where: { full_name: 'Rolling Fatties' },
  })
    .then((found) => console.log(`✅ Found truck by name ${found}`))
    .catch((err) => console.error(`❌${err}`));

  if (foundTruck === null) return;

  await Review.create({
    review_title: 'I LOVE Rolling Fatties THEYRE INCREDIBLE',
    id_user: 1,
    id_truck: 1,
    upvotes: 0,
  })
    .then(() => console.log('✅ New review created'))
    .catch((err) => console.error(`❌${err}`));

  await Review.findAll({
    where: { id_user: 1 },
  })
    .then((allReviews) => console.log(`✅ ${allReviews.length} Reviews found`))
    .catch((err) => console.error(`❌${err}`));
}

doStuffWithUserModel();
