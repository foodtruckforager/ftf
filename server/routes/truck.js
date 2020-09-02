const truckRouter = require('express').Router();

// TODO: replace truck splash page info
truckRouter.get('/', (req, res) => {
  // const { id } = req.params;

  res.send(JSON.stringify('hello'));
});

// get specific truck by id
truckRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  res.send(id);
});

// get all truck photos
truckRouter.get('/photo', (req, res) => {
  res.send('hello');
});

// truckRouter.get('/photo/:id', (req, res) => {

// });

// truckRouter.get('/review/:id', (req, res) => {

// });

// create new truck
truckRouter.post('/create', (req, res) => {
  res.send('truck posts go here');
});

// route for truck to make a new post
truckRouter.post('/post/:id', (req, res) => {
  const { id } = req.params;
  res.send(id);
});

// update truck profile settings by specific id
truckRouter.put('/update/:id', (req, res) => {
  const { id } = req.params;
  res.send(id);
});

module.exports = {
  truckRouter,
};

// Truck GET
// /truck/:id

// Truck.findOne // get truck info

// Truck Reviews GET
// /truck/review/:id

// User_Truck.findOne // get truck reviews

// /photo/:id
// Photo.findOne // get photo info

// Truck Profile Settings
// /truck/update

// Truck.findandupdate
// truck updating username, phone number, logo, genre, blurb, photos,
  // business hours, latitude, longitude

// Truck makes a new post
// /truck/post

// Truck.create // Title, comment, photo optional
// where id_user is
// where id_truck is
// if exists add to it
// if doesn’t, create it
