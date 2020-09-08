/* eslint-disable camelcase */
/* eslint-disable no-console */

const truckRouter = require('express').Router();
const {
  Truck, Photo, Review, Post,
} = require('../db/db');

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
      console.error(err);
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
      console.error(err);
      res.status(500).send(err);
    });
});

// route to create new truck
truckRouter.post('/create', (req, res) => {
  const {
    fullName,
    phoneNumber,
    googleId,
    qrCode,
    logo,
    foodGenre,
    blurb,
    openTime,
    closeTime,
    latitude,
    longitude,
  } = req.body;

  Truck.findOrCreate({
    where: {
      full_name: fullName,
      phone_number: phoneNumber,
      google_id: googleId,
      qr_code: qrCode,
      logo,
      food_genre: foodGenre,
      blurb,
      open_time: openTime,
      close_time: closeTime,
      latitude,
      longitude,
    },
  })
    .then((newTruck) => {
      res.status(201).send(newTruck);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// route for truck to make a new post
truckRouter.post('/truckpost/new/:truckId', (req, res) => {
  const { truckId } = req.params;
  const { title, message, photo } = req.body;
  Post.findOrCreate({
    where: {
      id_truck: truckId,
      title,
      message,
      photo,
    },
  })
    .then((newTruckPost) => {
      console.log(newTruckPost);
      res.status(201).send(newTruckPost);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// route to create new truck photo
truckRouter.post('/post/photo/:truckId', (req, res) => {
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
      console.error(err);
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
      console.error(err);
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
