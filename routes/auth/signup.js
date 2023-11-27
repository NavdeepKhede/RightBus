// routes/user/auth/signup.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {createUserSchema} = require('../../models/userSchema');
const pool = require('../../config/connection');
const { createUser } = require('../../models/userSchema');

const router = express.Router();


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
