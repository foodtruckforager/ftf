const { Router } = require('express');
// const {
//   Truck, Photo, Review, Post,
// } = require('../db/db');

const userRouter = Router();

// TODO: get user basic info
userRouter.get('/:id', (req, res) => {
  // const { id } = req.params;

  res.send('hello');
});

// TODO:
// route to add new truck review
userRouter.post('/review/new/:truckId/:userId', (req, res) => {
  // const { truckId, userId } = req.params;
  res.send('hello');
  // Review.findOrCreate({

  // })
});

// TODO: add functionality to post user reviews
userRouter.post('/review', (req, res) => {
  // post review goes here
  res.send('review');
});

// TODO: add functionality to update User Profile
userRouter.post('/update', (req, res) => {
  // user profile update goes here
  res.send('review');
});

// TODO: add functionality to require badge // incorporate QR code
userRouter.post('/badge', (req, res) => {
  // Should earning a badge be a post or a get?
  // ??
  res.send('badge');
});

module.exports = {
  userRouter,
};
