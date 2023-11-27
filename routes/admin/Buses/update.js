// routes/admin/buses/updateBus.js
const express = require('express');
const pool = require('../../../config/connection');
const { updateBus } = require('../../../models/busSchema');

const router = express.Router();

// Endpoint for updating an existing bus by an admin
router.put('/:busId',fetchuser, async (req, res) => {
  const busId = req.params.busId;
  // Implement logic to update an existing bus by an admin
  // Validate input, update 'buses' table, etc.
  const body = req.body;
  updateBus(busId, body.name, body.src, body.destination, body.arrival, body.departure, body.data_of_journey);
  res.json({ message: `Update bus endpoint for admin with ID ${busId}` });
});

module.exports = router;
