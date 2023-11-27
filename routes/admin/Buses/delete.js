// routes/admin/buses/deleteBus.js
const express = require('express');
const pool = require('../../../config/connection');

const router = express.Router();

// Endpoint for deleting a bus by an admin
router.delete('/:busId', async (req, res) => {
  const busId = req.params.busId;
  // Implement logic to delete a bus by an admin
  // Validate input, delete from 'buses' table, etc.

  res.json({ message: `Delete bus endpoint for admin with ID ${busId}` });
});

module.exports = router;
