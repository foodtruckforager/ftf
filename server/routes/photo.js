const { Router } = require('express');

const photoRouter = Router();

// TODO: Add photo render
photoRouter.get('/', (req, res) => {
  // const { id } = req.params;

  res.send('hello');
});

module.exports = {
  photoRouter,
};
