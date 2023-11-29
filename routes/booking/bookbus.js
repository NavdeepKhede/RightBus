const express = require('express');
const jwt = require('jsonwebtoken');
const Reservation = require('../../models/reservationSchema');
const fetchUser = require('../../middleware/fetchUser');

const router = express.Router();
const reservation = new Reservation();

// Endpoint for booking a bus by a user
router.post('/', fetchUser, async (req, res) => {
  try {

    // Validate input
    const { id, route_id, date, seat_number } = req.body;

    if (!id || !route_id || !date || !seat_number) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Book a seat using the model
    await reservation.bookSeat(id, route_id, seat_number, date, req.userId);

    res.json({ message: 'Bus booked successfully' });
  } catch (error) {
    console.error('Error booking bus:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
