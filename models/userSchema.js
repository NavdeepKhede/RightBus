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
      password VARCHAR(255) NOT NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'user',
    );
  `;
  await pool.query(query);
};

// Function to create a new user
const createUser = async (name, email, phone, password) => {
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Execute the database query
  const query = 'INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING *';
  const result = await pool.query(query, [name, email, phone, hashedPassword]);

  return result.rows[0];
};

module.exports = {createUserSchema, createUser};
