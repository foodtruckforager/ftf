/* eslint-disable camelcase */
/* eslint-disable no-console */
const truckRouter = require('express').Router();
const { Truck, Photo } = require('../db/db');

// TODO: replace truck splash page info
truckRouter.get('/', (req, res) => {
  Truck.findAll()
    .then((trucks) => {
      console.log(trucks);
      res.send(trucks);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// get specific truck by id
truckRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  Truck.findByPk(id)
    .then((foundtruck) => {
      console.log(foundtruck);
      res.send(foundtruck);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// get all truck photos for specific truck
truckRouter.get('/photo/:truckId', (req, res) => {
  const { truckId } = req.params;
  Photo.findAll({
    where: {
      id_truck: truckId,
    },
  })
    .then((photos) => {
      console.log(photos);
      res.send(photos);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// truckRouter.get('/photo/:id', (req, res) => {

// });

// truckRouter.get('/review/:id', (req, res) => {

// });

// find all reviews by specific truck
truckRouter.get('/review/:id', (req, res) => {
  res.send('hello');
});

// TODO: Add rest of properties**

// route to create new truck
truckRouter.post('/create', (req, res) => {
  const { full_name } = req.body;
  Truck.findOrCreate({ where: { full_name } })
    .then((newTruck) => {
      res.status(201).send(newTruck);
    })
    .catch((err) => {
      console.lerror('err');
      res.status(500).send(err);
    });
});

// route for truck to make a new post
truckRouter.post('/post/:id', (req, res) => {
  const { id } = req.params;
  res.send(id);
});

// route to create new truck photo
truckRouter.post('/photo/post/:truckId', (req, res) => {
  const { truckId } = req.params;
  const { url } = req.body;
  Photo.findOrCreate({
    where: {
      id_truck: truckId,
      url,
    },
  })
    .then((newPhoto) => {
      console.log(newPhoto);
      res.status(201).send(newPhoto);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
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
