const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'ludwig',
  host: 'localhost',
  port: 5432,
  database: 'foodtruckdb',
});

module.exports = pool;
