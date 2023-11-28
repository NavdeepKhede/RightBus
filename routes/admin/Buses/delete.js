const express = require('express');
const { deleteBusById } = require('../../../models/busSchema');
const fetchUser = require('../../../middleware/fetchUser');
const checkAdminRole = require('../../../middleware/checkAdmin');

const router = express.Router();

// Endpoint for deleting a bus by an admin
router.delete('/:busId', fetchUser, checkAdminRole, async (req, res) => {
  try {
    const busId = req.params.busId;

    // Delete the bus using the model
    let isSucessFull = await deleteBusById(busId, req.userId);
    if (!isSucessFull) {
      return res.status(400).json({ error: 'Bus not found' });
    }
    res.json({ message: `Bus with ID ${busId} deleted successfully` });
  } catch (error) {
    console.error('Error deleting bus:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
