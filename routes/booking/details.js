const express = require('express');
const jwt = require('jsonwebtoken');
const { extractBookingDetails } = require('../../models/userSchema');
const fetchUser = require('../../middleware/fetchUser');

const router = express.Router();

router.get('/', fetchUser, async (req, res) => {
  try {

    // Extract booking details for the user using the model
    const bookingDetails = await extractBookingDetails(req.userId);
    res.json(bookingDetails);
  } catch (error) {
    console.error('Error extracting booking details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
