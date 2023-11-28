const router = require('express').Router();
const { createBusTable, addBus } = require('../../../models/busSchema');
const fetchUser = require('../../../middleware/fetchUser');
const checkAdminRole = require('../../../middleware/checkAdmin');
const { addRoute } = require('../../../models/routeSchema');



// Endpoint for creating a new bus by an admin
router.post('/', fetchUser, checkAdminRole, async (req, res) => {
  try {
    // Validate input
    const { name, src, destination, distance, occupancy, day_of_working } = req.body;

    if (!name || !src || !destination || !distance || !occupancy || !day_of_working) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Add a new bus using the model
    let bus_route_id = await addRoute(src, destination, distance).id;
    total_seats = occupancy;
    console.log(day_of_working)
    await addBus({name, bus_route_id, occupancy, total_seats, day_of_working });

    res.json({ message: 'Bus created successfully' });
  } catch (error) {
    console.error('Error creating bus:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
