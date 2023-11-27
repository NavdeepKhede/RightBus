// routes/admin/buses/createBus.js
const express = require('express');
const { createBusSchema, addBus } = require('../../../models/busSchema');
const fetchuser = require('../../../middleware/fetchuser');

const router = express.Router();
createBusSchema();
// Endpoint for creating a new bus by an admin
router.post('/',fetchuser, async (req, res) => {
  // Implement logic to create a new bus by an admin
  // Validate input, insert into 'buses' table, etc.
  const body = req.body;
  addBus(body.name, body.src, body.destination, body.arrival, body.departure, body.data_of_journey);

  res.json({ message: 'Create bus endpoint for admin' });
});

module.exports = router;
