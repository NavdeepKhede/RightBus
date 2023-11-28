const express = require('express');
const fetchUser = require('../../middleware/fetchUser');
const { seatAvailability } = require('../../models/reservationSchema');

const router = express.Router();

router.get('/:id', fetchUser, async (req, res) => {
  try {
    const id = req.params.id;
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ error: 'Missing date parameter' });
    }

    const availability = await seatAvailability(id, date);
    res.json(availability);
  } catch (error) {
    console.error('Error checking seat availability:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
