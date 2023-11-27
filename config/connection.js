// config/connection.js
const { Pool } = require('pg');

// Replace with your database connection details
const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

module.exports = pool;
