// config/connection.js
const { Pool } = require('pg');

// Replace with your database connection details
const pool = new Pool({
  connectionString: 'postgres://wkpvjygg:d9uQqRYli21NSfhulapHUh9Gmv9LzIXK@rain.db.elephantsql.com/wkpvjygg',
});

module.exports = pool;
