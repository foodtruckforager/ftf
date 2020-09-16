/* eslint-disable no-console */
const { Router } = require('express');
const sequelize = require('sequelize');
const {
  Review, User, Upvote, Favorite, Truck,
} = require('../db/db');

const userRouter = Router();

// get user basic info with googleId from async storage
userRouter.get('/googleId/:googleId', (req, res) => {
  console.log('Login Route');
  const { googleId } = req.params;
  User.findAll({
    where: {
      google_id: googleId,
    },
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// get user info by user primary key id
userRouter.get('/:userId', (req, res) => {
  const { userId } = req.params;
  User.findByPk(userId)
    .then((founduser) => {
      console.log(founduser);
      res.send(founduser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// get all of a user's reviews
userRouter.get('/review/:userId', (req, res) => {
  const { userId } = req.params;
  Review.findAll({
    where: {
      id_user: userId,
    },
  })
    .then((foundUserReviews) => {
      console.log(foundUserReviews);
      res.send(foundUserReviews);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// get all user's favorite trucks
userRouter.get('/favorites/:userId', (req, res) => {
  const { userId } = req.params;
  Favorite.findAll({
    where: {
      id_user: userId,
      favorite: true,
    },
    include: [
      {
        model: Truck,
        required: true,
      },
    ],
  })
    .then((favoriteTrucks) => {
      res.send(favoriteTrucks);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// update user's favorite trucks
// id | id_user | id_truck | favorite

// create a new user
userRouter.post('/new', (req, res) => {
  const { fullName, googleId, profilePhotoUrl } = req.body;
  // console.log(req.body);
  User.findOrCreate({
    where: {
      google_id: googleId,
    },
    defaults: {
      full_name: fullName,
      profile_photo_url: profilePhotoUrl,
    },
  })
    .then((newUser) => {
      res.status(201).send(newUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// route to add new truck review
userRouter.post('/review/new/:truckId/:userId', (req, res) => {
  const { truckId, userId } = req.params;

  const {
    reviewTitle,
    reviewDescription,
    reviewStar,
    reviewPhoto,
    upvotes,
  } = req.body;

  Review.findOrCreate({
    where: {
      id_user: userId,
      id_truck: truckId,
      review_title: reviewTitle,
      review_description: reviewDescription,
      review_star: reviewStar,
      review_photo: reviewPhoto,
      upvotes,
    },
  })
    .then((newReview) => {
      res.status(201).send(newReview);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// create user truck favorite creation on load
userRouter.post('/update/favoritetruck/add/:userId/:truckId', (req, res) => {
  const { userId, truckId } = req.params;
  Favorite.findOrCreate({
    where: {
      id_user: userId,
      id_truck: truckId,
    },
    defaults: {
      favorite: false,
    },
  })
    .then((newFavorited) => {
      console.log(newFavorited);
      res.status(201).send('favorite added');
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// update route to favorite a user's favorite truck
userRouter.put('/update/favoritetruck/favorite/:userId/:truckId', (req, res) => {
  const { userId, truckId } = req.params;
  Favorite.update(
    {
      favorite: true,
    },
    {
      where: {
        id_user: userId,
        id_truck: truckId,
      },
    },
  )
    .then(() => {
      res.status(201).send('favorite was added');
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// update route to remove/ a user's favorite truck
userRouter.put('/update/favoritetruck/remove/:userId/:truckId', (req, res) => {
  const { userId, truckId } = req.params;
  Favorite.update(
    {
      favorite: false,
    },
    {
      where: {
        id_user: userId,
        id_truck: truckId,
      },
    },
  )
    .then(() => {
      res.status(201).send('favorite was removed');
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// route to update user photo
userRouter.post('/update/photo', (req, res) => {
  const { profilePhotoUrl, userId } = req.body;
  console.log('PHOTO URL', req.body);
  User.update(
    {
      profile_photo_url: profilePhotoUrl,
    },
    {
      where: {
        id: userId,
      },
    },
  )
    .then(() => {
      res.status(201).send('successfully uploaded photo');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// route to update user
userRouter.put('/update/:userId', (req, res) => {
  const { userId } = req.params;
  const { fullName, profilePhotoUrl } = req.body;
  User.update(
    {
      id_user: userId,
      full_name: fullName,
      profile_photo_url: profilePhotoUrl,
    },
    {
      where: {
        id: userId,
      },
    },
  )
    .then(() => {
      res.status(201).send('successfully updated user');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// add truck visits for specific user
userRouter.put('/update/visits/:userId/:truckId', (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

// TODO: add functionality to require badge // incorporate QR code
userRouter.put('/update/badge/:userId', (req, res) => {
  const { userId } = req.params;
  const { body } = req;

  User.update(
    {
      badge: body,
    },
    {
      where: {
        id: userId,
      },
    },
  )
    .then(() => {
      res.status(201).send('successfully updated user badge');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

// upvote route, same user cant vote twice, user can't vote for own review
userRouter.put('/update/upvote/:userId/:reviewId', (req, res) => {
  const { userId, reviewId } = req.params;

  Upvote.findOrCreate({
    where: {
      id_user: userId,
      id_review: reviewId,
    },
  })
    .then((success) => {
      if (success[1] === false) {
        res.status(404).send('user has already voted');
      } else {
        Review.findOne({ where: { id: reviewId } })
          .then((foundReview) => {
            if (parseInt(foundReview.id_user, 10) === parseInt(userId, 10)) {
              res
                .status(404)
                .send('user attempted to vote for their own review');
            } else {
              Review.update(
                {
                  upvotes: sequelize.literal('upvotes +1'),
                },
                {
                  where: { id_user: userId },
                },
              )
                .then(() => {
                  res.status(201).send('upvote has been received');
                })
                .catch((err) => {
                  console.error(err);
                  res.status(500).send(err);
                });
            }
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

module.exports = {
  userRouter,
};
