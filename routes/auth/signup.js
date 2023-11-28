const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createUserTable,
  createUser,
  getUserByEmail,
} = require("../../models/userSchema");
const pool = require("../../config/connection");

const router = express.Router();


// Endpoint for user sign-up
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Validate input
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
    console.log(role)
    const checkUserResult = getUserByEmail(email);

    if (checkUserResult.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user using the model
    const newUser = await createUser({name, email, phone, hashedPassword, role});

    // Generate and send JWT
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      "your_secret_key", // Replace with a secure key in production
      { expiresIn: "1h" }
    );
    res.cookie("token", token);
    res.json({ role: "user" });
  } catch (error) {
    console.error("Error signing up user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
