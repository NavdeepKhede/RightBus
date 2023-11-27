// routes/user/auth/signup.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createUserSchema = require('../../models/userSchema');
const pool = require('../../config/connection');

const router = express.Router();

// Ensure the user schema exists
createUserSchema();

// Function to create a new user
const createUser = async (name, email, phone, password) => {
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Log the hashed password (not recommended in production)
  console.log('Hashed Password:', hashedPassword);

  // Execute the database query
  const query = 'INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING *';
  const result = await pool.query(query, [name, email, phone, hashedPassword]);

  // Log the result of the database query
  console.log('Database Result:', result);

  // Return the first row from the result
  return result.rows[0];
};


// Endpoint for user sign-up
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    console.log(req.body)

    // Validate input
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Check if the user already exists
    const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
    const checkUserResult = await pool.query(checkUserQuery, [email]);

    if (checkUserResult.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }
   

    // Create a new user using the model
    const newUser = await createUser(name, email, phone, password);
    console.log("hello")
    // Generate and send JWT
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      'your_secret_key', // Replace with a secure key in production
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Error signing up user', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
