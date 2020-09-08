/* eslint-disable no-console */
const { User, Truck, Review } = require('../db/db');

function doStuffWithUserModel() {
  User.findOrCreate({
    full_name: 'John Smith',
  });
  const foundUser = User.findOne({ where: { full_name: 'John Smith' } });
  if (foundUser === null) {
    return;
  }

  Truck.findOrCreate({
    where: {
      full_name: 'Rolling Fatties',
      phone_number: '9999999',
      google_id: '1',
      qr_code: 'qrCode',
      logo:
        'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/7397/540dd4df-7ff0-46b2-b56d-214346204482.jpg',
      food_genre: 'mexican',
      blurb:
        'While Rollin Fatties has banned red meat from its menu, that doesnt mean that it has no flavor. With a core ingredient set of jerk seasoned tofu, caramelized tilapia, chipotle cream, and Monterey Jack cheese, youre sure to get a burrito, rice bowl, taco, or nacho dish that you wont forget in a hurry. Find this truck on the streets of New Orleans and get yourself a tasty and healthy meal!',
      open_time: '9',
      close_time: '9',
      latitude: 29.9729349,
      longitude: -90.06062709999999,
      star_average: 5,
    },
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  Truck.findOrCreate({
    where: {
      full_name: 'Frencheeze',
      phone_number: '99949999',
      google_id: '2',
      qr_code: 'qrCode1',
      logo:
        'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/4749/5164780a-7cec-4333-a3c6-57cc46204482.jpg',
      food_genre: 'american',
      blurb:
        'Cheese, Butter and Bread are Frencheeze’s three loves in life. Since you already share a lot in common, Frencheeze Food Truck will most likely be your fourth love in life. As far as these gourmet grilled cheese sandwiches, sliders and frites go, you’re destined to experience love at first bite. Ask anyone in New Orleans who’s had the pleasure of eating these gloriously cheesy offerings for breakfast, lunch, or dinner, and you’ll be told what a special treat you’re in forJust one glance at their menu and youre confronted with some tough choices. Do you stay true to your inner child with the classic 4th Grader- simple cheddar cheese on toast? Or since youve adulted thus far, do you honor your maturity with the Molly-fresh avocado slices, heirloom tomato, bacon, pesto, spinach, and goat cheese on a croissant? But what about the fried Mac & Cheese Balls? Those sound like a must. Well heres the good news you can always come back time and again to taste every masterpiece they offer (with gluten-free bread always available). Heres some even better news: Frencheeze will meet you anywhere to serve their highly craved selection. Just book this local favorite to cater your next event and treat your guests to grilled cheese at its beautiful best',
      open_time: '10',
      close_time: '10',
      latitude: 29.96611777989272,
      longitude: -90.08652842010727,
      star_average: 4,
    },
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  Truck.findOrCreate({
    where: {
      full_name: 'Queen on Wheels',
      phone_number: '999449999',
      google_id: '3',
      qr_code: 'qrCode2',
      logo:
        'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/18467/5a5f7bdb-e928-4fa6-b270-4f9146204482.jpg',
      food_genre: 'southern',
      blurb:
        'Queen on Wheels is a food truck that deserves your utmost adoration and respect, cruising the streets of New Orleans and offering up some seriously good grub. Because lets face it when hunger comes calling theres really only one way to answer it, with good food on the go.At Queen on Wheels, youre being treated like royalty. Theyve crafted a big menu full of bigger portions to satisfy even the biggest appetites, using only the freshest quality ingredients and making each soulful, hearty meal to order. From that all American classic burger and racks of fall off the bone BBQ ribs to smoked sausage and fried chicken, your inner carnivore will be pleased. But thats not all. Queen on Wheels is also ruling over the seas, offering platters full of fresh fish including oyster, fish, and the tenderest of shrimp morsels. So why wait? Head on out to the streets of NAwlins to get some fine NOLA food. Trust us. It really is that good.',
      open_time: '11',
      close_time: '11',
      latitude: 29.9573143,
      longitude: -90.08317289999999,
      star_average: 3,
    },
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  Truck.findOrCreate({
    where: {
      full_name: 'Lucky Dogs',
      phone_number: '999449999',
      google_id: '3',
      qr_code: 'qrCode2',
      logo:
        'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/1006/5ca28545-91ec-42d2-8054-43d746204482.jpg',
      food_genre: 'american',
      blurb:
        'Lucky Dogs hot dog cart is a unique fast food company offering an impulse item that serves as a snack, an appetizer, or a meal in itself. We are ideally suited for the modern craze called “grazing” or eating on the run…A Lucky Dog in one hand, a soft drink in the other. We have proven to be highly successful in airports, casinos, malls, sport stadiums, and numerous other heavily trafficed areas where service and speed are at a premium.Were an old company, but we have exciting new concepts. Though we do not have “golden arches” we do have a proven record-over 21 million hot dogs sold during the past fifty years. Part of our ambience is our uniquely designed kiosk and carts which capture the character and charm of our French Quarter operation. When in New Orleans visit us at any of our French Quarter locations, or on concourses A & B at the New Orleans International Airport, or on the main gaming floor of Harrahs New Orleans Casino.',
      open_time: '11',
      close_time: '11',
      latitude: 29.9510660269581,
      longitude: -90.0715321674943,
      star_average: 3,
    },
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  Truck.findOrCreate({
    where: {
      full_name: 'La Cocinita',
      phone_number: '5043095344',
      google_id: '4',
      qr_code: 'qrCode3',
      logo:
        'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/2818/4f56928c-28d0-4e5d-8376-475246204482.jpg',
      food_genre: 'mexican',
      blurb:
        'Lucky Dogs hot dog cart is a unique fast food company offering an impulse item that serves as a snack, an appetizer, or a meal in itself. We are ideally suited for the modern craze called “grazing” or eating on the run…A Lucky Dog in one hand, a soft drink in the other. We have proven to be highly successful in airports, casinos, malls, sport stadiums, and numerous other heavily trafficed areas where service and speed are at a premium.Were an old company, but we have exciting new concepts. Though we do not have “golden arches” we do have a proven record-over 21 million hot dogs sold during the past fifty years. Part of our ambience is our uniquely designed kiosk and carts which capture the character and charm of our French Quarter operation. When in New Orleans visit us at any of our French Quarter locations, or on concourses A & B at the New Orleans International Airport, or on the main gaming floor of Harrahs New Orleans Casino.',
      open_time: '10',
      close_time: '10',
      latitude: 30.020258,
      longitude: -90.122391,
      star_average: 2,
    },
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  Truck.findOrCreate({
    where: {
      full_name: 'Diva Dawg',
      phone_number: '5045334825',
      google_id: '5',
      qr_code: 'qrCode4',
      logo:
        'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/8504/55204a00-dc28-4386-9930-178146204482.jpg',
      food_genre: 'american',
      blurb:
        'Diva Dawg is a fantastic gourmet hot dog food truck featuring a locally-made creole hot dog called the "Diva Dawg," complimented by a sweet and savory brioche bun, along with creole toppings and specialty shakes. Home to the original Red Bean Chili Dawg, Etouffee Fries, and Praline Candy Shake!',
      open_time: '9',
      close_time: '10',
      latitude: 30.033898,
      longitude: -90.054515,
      star_average: 4,
    },
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  Truck.findOrCreate({
    where: {
      full_name: 'Kennys Cajun & Creole',
      phone_number: '5044397904',
      google_id: '6',
      qr_code: 'qrCode5',
      logo:
        'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/8504/55204a00-dc28-4386-9930-178146204482.jpg',
      food_genre: 'southern',
      blurb:
        'Kennys Cajun & Creole Mobile Kitchen is makin those eats from down South available on the streets. That is, if you happen to be in New Orleans, LA. If you are, lucky you, because thats where youll find this food truck, full of delectable meals to sink your teeth into.',
      open_time: '9',
      close_time: '10',
      latitude: 29.983488,
      longitude: -90.077252,
      star_average: 4,
    },
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  Truck.findOrCreate({
    where: {
      full_name: 'Oh La Vache',
      phone_number: '5044397904',
      google_id: '7',
      qr_code: 'qrCode6',
      logo:
        'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/23649/5c8be86c-5cc4-4da0-be7a-1fa346204482.jpg',
      food_genre: 'american',
      blurb:
        'Oh La Vache is taking the streets of New Orleans, LA by storm, a food truck thats already made an indelible mark on the scene. Not only do they have locally sourced gourmet ice cream, theyve also got locally sourced grass fed beef sliders to sink your teeth into. Basically, if youre looking for hearty eats and sweet treats on the streets, Oh La Vache is your best bet.',
      open_time: '9',
      close_time: '10',
      latitude: 29.924939,
      longitude: -90.128475,
      star_average: 4,
    },
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  Truck.findOrCreate({
    where: {
      full_name: 'Grilling Shilling',
      phone_number: '5044397904',
      google_id: '8',
      qr_code: 'qrCode7',
      logo:
        'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/7378/5d56e576-0d3c-4fe7-8497-20a7ac120003.jpg',
      food_genre: 'barbecue',
      blurb:
        'Grilling Shilling is grilling it up in NOLA, and shilling it out to the hungriest of eaters on the go. Its a food truck, after all, and one thats grillin up a whole lotta meats on the streets. Its where youll find the best BBQ in town.',
      open_time: '9',
      close_time: '10',
      latitude: 29.935842,
      longitude: -90.074221,
      star_average: 4,
    },
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  Truck.findOrCreate({
    where: {
      full_name: 'Creole Tomateaux',
      phone_number: '9859512650',
      google_id: '9',
      qr_code: 'qrCode8',
      logo:
        'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/26241/5d5b4325-1780-41a9-b937-0174ac120003.jpg',
      food_genre: 'southern',
      blurb:
        'For Frank, food is a means of communication. Specifically, with Creole Tomateaux, Frank’s trying to express his love for the New Orleans, LA community via homemade cajun cooking. This trailer whips up all things zesty on the daily. We could tell you food is just plain better when it’s made with passion (and we’d be right), but if that’s too corny for you know this – Frank’s got over 20 years of restaurant experience. So, that doesn’t hurt the quality of these eats either.',
      open_time: '9',
      close_time: '10',
      latitude: 29.94865,
      longitude: -90.069683,
      star_average: 4,
    },
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  Truck.findOrCreate({
    where: {
      full_name: 'Creole Tomateaux',
      phone_number: '9859512650',
      google_id: '9',
      qr_code: 'qrCode8',
      logo:
        'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/26241/5d5b4325-1780-41a9-b937-0174ac120003.jpg',
      food_genre: 'southern',
      blurb:
        'For Frank, food is a means of communication. Specifically, with Creole Tomateaux, Frank’s trying to express his love for the New Orleans, LA community via homemade cajun cooking. This trailer whips up all things zesty on the daily. We could tell you food is just plain better when it’s made with passion (and we’d be right), but if that’s too corny for you know this – Frank’s got over 20 years of restaurant experience. So, that doesn’t hurt the quality of these eats either.',
      open_time: '9',
      close_time: '10',
      latitude: 29.944537,
      longitude: -90.08517,
      star_average: 4,
    },
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  Truck.findOrCreate({
    where: {
      full_name: 'Rue Chow',
      phone_number: '9859512650',
      google_id: '10',
      qr_code: 'qrCode9',
      logo:
        'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/2812/4f552be0-91e0-4897-88bd-3f8046204482.jpg',
      food_genre: 'southern',
      blurb:
        'Jarett Eymard and Rachel Carr Eymard bought a bread truck and converted it into a food truck in their back yard just in a couple of months! Jarett came up with the clever name Rue Chow translating to street food and it just stuck! Look for us around town serving delicious food in your area.',
      open_time: '9',
      close_time: '10',
      latitude: 29.950238,
      longitude: -90.133343,
      star_average: 4,
    },
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  Truck.findOrCreate({
    where: {
      full_name: 'Food Drunk',
      phone_number: '5049512650',
      google_id: '11',
      qr_code: 'qrCode10',
      logo:
        'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/4891/517edc86-3d90-44e4-84d4-443846204482.JPG',
      food_genre: 'american',
      blurb:
        'Chef inspired alcohol influenced cuisine. From duck fat fries to apple wood smoked pig, Thai beef salad to char grilled all-American brisket burger. Better than being drunk, get food drunk!',
      open_time: '9',
      close_time: '10',
      latitude: 29.963981,
      longitude: -90.115565,
      star_average: 4,
    },
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  Truck.findOrCreate({
    where: {
      full_name: 'Chef Johnson`s Truck',
      phone_number: '5049512650',
      google_id: '12',
      qr_code: 'qrCode11',
      logo:
        'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/6576/57719077-4ca8-4463-b2a0-3f3d46204482.jpg',
      food_genre: 'southern',
      blurb:
        'Chef Johnson’s Truck is serving the streets of New Orleans his acclaimed selection of Cajun cuisine that’s cooked slow and served quick.',
      open_time: '9',
      close_time: '10',
      latitude: 29.96326,
      longitude: -90.074096,
      star_average: 4,
    },
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  Truck.findOrCreate({
    where: {
      full_name: 'Cocoa & Cream Mobile Foods & Catering Service',
      phone_number: '5043777046',
      google_id: '13',
      qr_code: 'qrCode12',
      logo:
        'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/7401/5706e81d-7650-4436-8078-14a546204482.png',
      food_genre: 'southern',
      blurb:
        'Cocoa & Cream is a food truck serving the classics of southern food in New Orleans, alongside some new delicious creations. Whether you`re in the mood for sweet chili glazed wings, an oyster poboy, or just chicken-n-waffles, this truck has you covered!',
      open_time: '9',
      close_time: '10',
      latitude: 29.961565,
      longitude: -90.057442,
      star_average: 4,
    },
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  Truck.findOrCreate({
    where: {
      full_name: 'The Crepe Cart',
      phone_number: '5043777047',
      google_id: '13',
      qr_code: 'qrCode12',
      logo:
        'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/8057/5467c173-4f50-459d-887d-548546204482.jpg',
      food_genre: 'french',
      blurb:
        'Delicious sweet and savory crepes made fresh within moments, before your very eyes! Served from a beautiful, specially designed, quintessentially French crepe cart! gluten-free optional!',
      open_time: '9',
      close_time: '10',
      latitude: 29.965496,
      longitude: -90.056776,
      star_average: 3,
    },
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  Truck.findOrCreate({
    where: {
      full_name: 'Saigon Slim`s',
      phone_number: '5043777047',
      google_id: '14',
      qr_code: 'qrCode13',
      logo:
        'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/8272/549f544e-69ec-4b7f-8e6f-205d46204482.png',
      food_genre: 'vietnamese',
      blurb:
        'If there’s one thing that the Vietnamese and New Orleanians have in common, it’s a love for French bread. Saigon Slim’s expands on this common ground, serving both traditional and signature Banh Mi (Vietnamese po-boys), as well as other local and Vietnamese staples, all with our own special take.',
      open_time: '8',
      close_time: '11',
      latitude: 29.92397,
      longitude: -90.037504,
      star_average: 5,
    },
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  Truck.findOrCreate({
    where: {
      full_name: 'Dirty Dishes',
      phone_number: '5043777047',
      google_id: '15',
      qr_code: 'qrCode14',
      logo:
        'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/9302/552d84ba-caa8-4606-bd41-0a6046204482.jpg',
      food_genre: 'southern',
      blurb:
        'Dirty Dishes is New Orleans favorite food truck by far. We know, quite the statement to make. But seeings how theyve been in business for the past 4 years giving foodies just what they want as far as street food goes, well, you better believe it. At Dirty Dishes, they`re world famous for their dirty mac: a specialty smoked gouda mad & cheese infused with crawfish and tasso. And thats just the start of a full bodied menu built to satisfy. Here, youre able to custom build your bowl of mac & cheese, along with a vegan option to make sure everyone can say "cheese". But thats not all. Dirty Dishes also has their unique take on Southern style biscuits n gravy, loading em with brisket, crawfish and andouille cream sauce with a sunny side egg on top. Not to mention their Fleur de Lis waffle, available with sweet pecan praline sauce or pulled pork for a gourmet version of the classic "pig in a blanket". If all this sounds good to you, why wait? Find Dirty Dishes in NOLA, or have em out to cater your next event. Trust us. You wont be disappointed.',
      open_time: '8',
      close_time: '11',
      latitude: 29.943239,
      longitude: -90.029754,
      star_average: 5,
    },
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  Truck.findOrCreate({
    where: {
      full_name: 'Petite Rouge',
      phone_number: '5043777047',
      google_id: '16',
      qr_code: 'qrCode15',
      logo:
        'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/11477/55a0346d-9bec-4b70-b897-5b7146204482.jpg',
      food_genre: 'french',
      blurb:
        'Petite Rouge is a mobile coffee business in a charming red vintage Citroen H-Van serving the NOLA streets. this great truck is the perfect morning stop to fuel your body for your daily routine. Treat yourself with the best coffee on wheels!',
      open_time: '8',
      close_time: '11',
      latitude: 29.988022,
      longitude: -90.242917,
      star_average: 4,
    },
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  Truck.findOrCreate({
    where: {
      full_name: 'Mr. Choo',
      phone_number: '5043777047',
      google_id: '18',
      qr_code: 'qrCode17',
      logo:
        'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/12612/57cf2cd1-4918-4805-a061-342346204482.jpg',
      food_genre: 'chinese',
      blurb:
        'Mr Choo is moving down the streets of New Orleans, ready to satisfy your hunger with the best street food in town! Delicious sushi, sashimi, dumplings, broth, shrimp fried rice, and so much more are on the menu and perfect for you. If you want something new and fantastic to feed your hunger, then Mr Choos is the food truck youve been looking for!',
      open_time: '8',
      close_time: '11',
      latitude: 29.962283,
      longitude: -90.049028,
      star_average: 4,
    },
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  Truck.findOrCreate({
    where: {
      full_name: 'The Red Stove',
      phone_number: '5044199866',
      google_id: '17',
      qr_code: 'qrCode16',
      logo:
        'https://rh-vendoradmin.s3.amazonaws.com/trucks/original/11557/55a7e374-3988-4dc0-bde1-6ae946204482.jpg',
      food_genre: 'mediterranean',
      blurb:
        'Mediterranean cuisine on the New Orleans scene, brought to you by The Red Stove! Here you can find delicious shawarma, sandwiches, seafood, and more, each dish better than the last. The flavors of the south meet the Mediterranean on The Red Stove, and youre sure to love it from the very first bite!',
      open_time: '8',
      close_time: '11',
      latitude: 29.968717,
      longitude: -90.05606,
      star_average: 4,
    },
  })
    .then((newTruck) => {
      console.log(`✅ New Truck Created: ${newTruck}`);
    })
    .catch((err) => {
      console.error(`❌${err}`);
    });

  const foundTruck = Truck.findOne({
    where: { full_name: 'Rolling Fatties' },
  })
    .then((found) => console.log(`✅ Found truck by name ${found}`))
    .catch((err) => console.error(`❌${err}`));

  if (foundTruck === null) return;

  Review.create({
    where: {
      review_title: 'I LOVE Rolling Fatties THEYRE INCREDIBLE',
      id_user: 1,
      id_truck: 1,
      upvotes: 0,
    },
  })
    .then(() => console.log('✅ New review created'))
    .catch((err) => console.error(`❌${err}`));

  Review.findAll({
    where: { id_user: 1 },
  })
    .then((allReviews) => console.log(`✅ ${allReviews.length} Reviews found`))
    .catch((err) => console.error(`❌${err}`));
}

doStuffWithUserModel();
