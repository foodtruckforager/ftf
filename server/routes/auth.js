const { Router } = require('express');

const authRouter = Router();

// TODO: authorization route after successful login with google
authRouter.get('/', (req, res) => {
  // const { id } = req.params;

  res.send('hello');
});

module.exports = {
  authRouter,
};
