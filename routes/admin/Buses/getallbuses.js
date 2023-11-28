const router = require('express').Router();
const { getAllBuses } = require('../../../models/busSchema');


// Endpoint to retrieve all buses
router.get('/', async (req, res) => {
  try {
    const buses = await getAllBuses();
    res.json(buses);
  } catch (error) {
    console.error('Error retrieving buses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
