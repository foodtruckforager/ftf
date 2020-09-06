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
    logo: 'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/7397/540dd4df-7ff0-46b2-b56d-214346204482.jpg',
    food_genre: 'mexican',
    blurb: 'While Rollin Fatties has banned red meat from its menu, that doesnt mean that it has no flavor. With a core ingredient set of jerk seasoned tofu, caramelized tilapia, chipotle cream, and Monterey Jack cheese, youre sure to get a burrito, rice bowl, taco, or nacho dish that you wont forget in a hurry. Find this truck on the streets of New Orleans and get yourself a tasty and healthy meal!',
    open_time: '9',
    close_time: '9',
    latitude: 29.9729349,
    longitude: -90.06062709999999,
    star_average: 5,
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  await Truck.create({
    full_name: 'Frencheeze',
    phone_number: '99949999',
    google_id: '2',
    qr_code: 'qrCode1',
    logo: 'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/4749/5164780a-7cec-4333-a3c6-57cc46204482.jpg',
    food_genre: 'american',
    blurb: 'Cheese, Butter and Bread are Frencheeze’s three loves in life. Since you already share a lot in common, Frencheeze Food Truck will most likely be your fourth love in life. As far as these gourmet grilled cheese sandwiches, sliders and frites go, you’re destined to experience love at first bite. Ask anyone in New Orleans who’s had the pleasure of eating these gloriously cheesy offerings for breakfast, lunch, or dinner, and you’ll be told what a special treat you’re in forJust one glance at their menu and youre confronted with some tough choices. Do you stay true to your inner child with the classic 4th Grader- simple cheddar cheese on toast? Or since youve adulted thus far, do you honor your maturity with the Molly-fresh avocado slices, heirloom tomato, bacon, pesto, spinach, and goat cheese on a croissant? But what about the fried Mac & Cheese Balls? Those sound like a must. Well heres the good news you can always come back time and again to taste every masterpiece they offer (with gluten-free bread always available). Heres some even better news: Frencheeze will meet you anywhere to serve their highly craved selection. Just book this local favorite to cater your next event and treat your guests to grilled cheese at its beautiful best',
    open_time: '10',
    close_time: '10',
    latitude: 29.96611777989272,
    longitude: -90.08652842010727,
    star_average: 4,
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  await Truck.create({
    full_name: 'Queen on Wheels',
    phone_number: '999449999',
    google_id: '3',
    qr_code: 'qrCode2',
    logo: 'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/18467/5a5f7bdb-e928-4fa6-b270-4f9146204482.jpg',
    food_genre: 'southern',
    blurb: 'Queen on Wheels is a food truck that deserves your utmost adoration and respect, cruising the streets of New Orleans and offering up some seriously good grub. Because lets face it when hunger comes calling theres really only one way to answer it, with good food on the go.At Queen on Wheels, youre being treated like royalty. Theyve crafted a big menu full of bigger portions to satisfy even the biggest appetites, using only the freshest quality ingredients and making each soulful, hearty meal to order. From that all American classic burger and racks of fall off the bone BBQ ribs to smoked sausage and fried chicken, your inner carnivore will be pleased. But thats not all. Queen on Wheels is also ruling over the seas, offering platters full of fresh fish including oyster, fish, and the tenderest of shrimp morsels. So why wait? Head on out to the streets of NAwlins to get some fine NOLA food. Trust us. It really is that good.',
    open_time: '11',
    close_time: '11',
    latitude: 29.9573143,
    longitude: -90.08317289999999,
    star_average: 3,
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  await Truck.create({
    full_name: 'Lucky Dogs',
    phone_number: '999449999',
    google_id: '3',
    qr_code: 'qrCode2',
    logo: 'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/1006/5ca28545-91ec-42d2-8054-43d746204482.jpg',
    food_genre: 'american',
    blurb: 'Lucky Dogs hot dog cart is a unique fast food company offering an impulse item that serves as a snack, an appetizer, or a meal in itself. We are ideally suited for the modern craze called “grazing” or eating on the run…A Lucky Dog in one hand, a soft drink in the other. We have proven to be highly successful in airports, casinos, malls, sport stadiums, and numerous other heavily trafficed areas where service and speed are at a premium.Were an old company, but we have exciting new concepts. Though we do not have “golden arches” we do have a proven record-over 21 million hot dogs sold during the past fifty years. Part of our ambience is our uniquely designed kiosk and carts which capture the character and charm of our French Quarter operation. When in New Orleans visit us at any of our French Quarter locations, or on concourses A & B at the New Orleans International Airport, or on the main gaming floor of Harrahs New Orleans Casino.',
    open_time: '11',
    close_time: '11',
    latitude: 29.9510660269581,
    longitude: -90.0715321674943,
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
