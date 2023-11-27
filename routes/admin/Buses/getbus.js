// routes/admin/buses/getBuses.js
const express = require('express');
const pool = require('../../../config/connection');
const fetchuser = require('../../../middleware/fetchuser');
const { getAllBuses, getBus } = require('../../../models/busSchema');

const router = express.Router();

// Endpoint for getting all buses or a specific bus by an admin
router.get('/:busId?',fetchuser, async (req, res) => {
  const busId = req.params.busId;
  // Implement logic to get all buses or a specific bus by an admin
  // Fetch from 'buses' table, etc.
  getBus(busId);
  res.json({ message: `Get buses endpoint for admin${busId ? ` with ID ${busId}` : ''}` });
});

module.exports = router;
