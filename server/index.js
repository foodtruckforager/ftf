/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const { userRouter } = require('./routes/user');
const { truckRouter } = require('./routes/truck');

require('./db/db');

const PORT = process.env.SERVER_PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes //
app.use('/user', userRouter);
app.use('/truck', truckRouter);

app.listen(PORT, () => {
  console.log(`🌌Server has started on port: 🚀${PORT}`);
});
