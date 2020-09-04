const { Router } = require('express');
const sequelize = require('sequelize');
const { Review, User, Upvote } = require('../db/db');

const userRouter = Router();

// get user basic info
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

// create a new user
userRouter.post('/new', (req, res) => {
  const {
    fullName, googleId, badge, profilePhotoUrl,
  } = req.body;

  User.findOrCreate({
    where: {
      full_name: fullName,
      google_id: googleId,
      badge,
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
    favorite,
    reviewTitle,
    reviewDescription,
    reviewStar,
    reviewPhoto,
    upvotes,
    reviewDate,
  } = req.body;
  Review.findOrCreate({
    where: {
      id_user: userId,
      id_truck: truckId,
      favorite,
      review_title: reviewTitle,
      review_description: reviewDescription,
      review_star: reviewStar,
      review_photo: reviewPhoto,
      upvotes,
      review_date: reviewDate,
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

// TODO: add functionality to update User Profile
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

// TODO: add functionality to require badge // incorporate QR code
userRouter.put('/update/badge/:userId', (req, res) => {
  const { userId } = req.params;

  const { badge } = req.body;
  User.update(
    {
      badge, // TODO: refactor to JSON
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

// TODO: upvote route
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
