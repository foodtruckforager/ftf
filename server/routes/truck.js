const truckRouter = require('express').Router();

// TODO: replace truck splash page info
truckRouter.get('/', (req, res) => {
  // const { id } = req.params;
  console.log('goodbye');
  res.send(JSON.stringify('hello'));
});

// TODO: add functionality to post truck information to users
truckRouter.post('/', (req, res) => {
  res.send('truck posts go here');
});

module.exports = {
  truckRouter,
};
