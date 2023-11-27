// routes/user/auth/signin.js
const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../../config/connection');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Endpoint for user sign-in
router.post('/', async (req, res) => {
  // Implement user sign-in logic here
  // Validate credentials, generate and return JWT
  try{
    const { email, password } = req.body;
    if(!email || !password){
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user.rows[0].id, email: user.rows[0].email }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });
    // return res.json({ message: 'User sign-in endpoint' });
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
