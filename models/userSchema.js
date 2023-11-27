// models/userschema.js
const pool = require('../config/connection');

// Define the user schema
const createUserSchema = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      phone VARCHAR(15) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;
  await pool.query(query);
};

module.exports = createUserSchema;
