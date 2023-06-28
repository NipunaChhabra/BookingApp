const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'flurnbookingapp',
  password: 'password',
  port: 5432, // Change to your PostgreSQL port if necessary
});

module.exports = pool;