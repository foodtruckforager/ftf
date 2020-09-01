const express = require('express');
const cors = require('cors');

const app = express();
const { userRouter } = require('./routes/user');
const { truckRouter } = require('./routes/truck');
const { photoRouter } = require('./routes/photo');
const { authRouter } = require('./routes/auth');
require('./db/db');

// Middleware
app.use(cors());
app.use(express.json()); // allows us access to req.body so we can get JSON data

// Routes //
app.use('/user', userRouter);
app.use('/truck', truckRouter);
app.use('/photo', photoRouter);
app.use('/auth', authRouter);

app.listen(5000, () => {
  console.log('🌌Server has started on port: 🚀5000');
});
