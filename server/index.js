const express = require('express');
const cors = require('cors');

const app = express();
require('./db/db');

// Middleware
app.use(cors());
app.use(express.json()); // allows us access to req.body so we can get JSON data

app.listen(5000, () => {
  console.log('🌌Server has started on port: 🚀5000');
});
