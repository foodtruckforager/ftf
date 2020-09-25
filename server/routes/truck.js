/* eslint-disable camelcase */
/* eslint-disable no-console */
const axios = require('axios');
const truckRouter = require('express').Router();
const {
  Truck, Photo, Review, Post,
} = require('../db/db');

// Google Places API Route
truckRouter.get('/api/google', (req, res) => {
  const { lat, lon } = req.query;
  axios({
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&rankby=distance&type=restaurant&key=${process.env.GOOGLE_PLACES_API_KEY}&keyword=truck`,
  })
    .then((response) => {
      const { data } = response;
      const { results } = data;
      console.log(results);
      res.send(results);
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
});

// Google Geocode Lat/Lon for Addresses API Route
truckRouter.get('/api/geocode', (req, res) => {
  const { vicinity, truck } = req.query;
  const truckWithLocation = truck;
  axios({
    method: 'get',
    url: `https://maps.google.com/maps/api/geocode/json?address=${vicinity}&key=${process.env.GOOGLE_PLACES_API_KEY}`,
  })
    .then((response) => {
      const { data } = response;
      const { results } = data;
      if (results[0] !== undefined) {
        truckWithLocation.location = results[0].geometry.location;
        res.send(truckWithLocation);
      }
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
});

// route to get all trucks
truckRouter.get('/', (req, res) => {
  Truck.findAll()
    .then((trucks) => {
      res.send(trucks);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// route to get a specific truck
truckRouter.get('/:truckId', (req, res) => {
  const { truckId } = req.params;
  Truck.findOne({
    where: {
      id: truckId,
    },
  })
    .then((foundTruck) => {
      if (foundTruck) {
        console.log(foundTruck);
        res.send(foundTruck);
      } else {
        res.status(404).send('truck not found');
      }
    })
    .catch((err) => {
      console.log(err);
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
      console.log(err);
      res.status(500).send(err);
    });
});

// find all reviews by specific truck
truckRouter.get('/review/:truckId', (req, res) => {
  const { truckId } = req.params;
  Review.findAll({
    where: {
      id_truck: truckId,
    },
  })
    .then((truckReview) => {
      console.log(truckReview);
      res.send(truckReview);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// route to get all truck posts
truckRouter.get('/truckpost/:truckId', (req, res) => {
  const { truckId } = req.params;
  Post.findAll({
    where: {
      id_truck: truckId,
    },
  })
    .then((truckPosts) => {
      console.log(truckPosts);
      res.send(truckPosts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// route to get truck by google id for login
truckRouter.get('/login/:googleId', (req, res) => {
  const { googleId } = req.params;
  Truck.findOne({
    where: {
      google_id: googleId,
    },
  })
    .then((foundTruck) => {
      if (foundTruck) {
        res.send(foundTruck);
      } else {
        res.status(404).send('truck not found');
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// route to register new truck with google id
truckRouter.post('/register', (req, res) => {
  const { googleId } = req.body;
  Truck.findOrCreate({
    where: {
      google_id: googleId,
    },
  })
    .then((registeredTruck) => {
      console.log(registeredTruck);
      res.status(201).send(registeredTruck);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// route to create new truck
truckRouter.put('/create/:googleId', (req, res) => {
  const { googleId } = req.params;
  console.log('create truck', req.params);
  const {
    fullName,
    phoneNumber,
    logo,
    foodGenre,
    blurb,
    openTime,
    closeTime,
    latitude,
    longitude,
  } = req.body;

  Truck.update(
    {
      full_name: fullName,
      phone_number: phoneNumber,
      logo,
      food_genre: foodGenre,
      blurb,
      open_time: openTime,
      close_time: closeTime,
      latitude,
      longitude,
    }, {
      where: {
        google_id: googleId,
      },
    },
  )
    .then((newTruck) => {
      res.status(201).send(newTruck);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// TODO: need routes for updating stars and numberOfReviews
// star_average: starRating || 0,
// number_of_reviews: numberOfReviews || 0,

// route for truck to make a new post
truckRouter.post('/truckpost/new/:truckId', (req, res) => {
  const { truckId } = req.params;
  const { title, message, photo, keywords } = req.body;
  Post.findOrCreate({
    where: {
      id_truck: truckId,
      title,
      message,
      photo,
      keywords,
    },
  })
    .then((newTruckPost) => {
      console.log(newTruckPost);
      res.status(201).send(newTruckPost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// route to create new truck photo
truckRouter.post('/post/photo/:truckId', (req, res) => {
  const { truckId } = req.params;
  const { url, keywords } = req.body;
  Photo.findOrCreate({
    where: {
      id_truck: truckId,
      url,
      keywords,
    },
  })
    .then((newPhoto) => {
      console.log(newPhoto);
      res.status(201).send(newPhoto);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// update truck profile settings by specific id
truckRouter.put('/update/:truckId', (req, res) => {
  const { truckId } = req.params;

  const {
    fullName,
    phoneNumber,
    logo,
    foodGenre,
    blurb,
    openTime,
    closeTime,
    latitude,
    longitude,
    openStatus,
  } = req.body;

  Truck.update(
    {
      full_name: fullName,
      phone_number: phoneNumber,
      logo,
      foode_genre: foodGenre,
      blurb,
      open_time: openTime,
      close_time: closeTime,
      latitude,
      longitude,
      open_status: openStatus,
    },
    {
      where: {
        id: truckId,
      },
    },
  )
    .then((updatedTruck) => {
      if (updatedTruck) {
        console.log('truck updated successfully');
        res.status(204).send('truck updated successfully');
        return;
      }
      res.status(404).send('truck not found');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('there was an error processing request', err);
    });
});

// delete specific photo from specific truck
truckRouter.delete('/delete/photo/:truckId/:photoId', (req, res) => {
  const { photoId, truckId } = req.params;
  Photo.destroy({
    where: {
      id: photoId,
      id_truck: truckId,
    },
  })
    .then((removedTruck) => {
      if (removedTruck) {
        console.log(removedTruck);
        res.send('photo was deleted');
        return;
      }
      res.status(404).send('photo not found');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err, 'there was an error processing request');
    });
});

// delete truck account
truckRouter.delete('/delete/:truckId', (req, res) => {
  const { truckId } = req.params;
  Truck.destroy({
    where: {
      id: truckId,
    },
  })
    .then((deletedTruck) => {
      if (deletedTruck) {
        console.log(deletedTruck);
        res.send('truck was deleted');
        return;
      }
      res.status(404).send('truck not found');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('there was an error processing request', err);
    });
});

module.exports = {
  truckRouter,
};
