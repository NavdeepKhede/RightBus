// routes/admin/buses/deleteBus.js
const express = require('express');
const pool = require('../../../config/connection');
const fetchuser = require('../../../middleware/fetchuser');
const { deleteBus } = require('../../../models/busSchema');

const router = express.Router();

// Endpoint for deleting a bus by an admin
router.delete('/:busId',fetchuser, async (req, res) => {
  const busId = req.params.busId;
  // Implement logic to delete a bus by an admin
  // Validate input, delete from 'buses' table, etc.
  deleteBus(busId);
  res.json({ message: `Delete bus endpoint for admin with ID ${busId}` });
});

module.exports = router;
