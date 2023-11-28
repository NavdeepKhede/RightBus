const router = require('express').Router();
const { createBusTable, addBus } = require('../../../models/busSchema');
const fetchUser = require('../../../middleware/fetchUser');
const checkAdminRole = require('../../../middleware/checkAdmin');
const { addRoute } = require('../../../models/routeSchema');
const { updateUserBuses } = require('../../../models/busUserSchema');



// Endpoint for creating a new bus by an admin
router.post('/', fetchUser, checkAdminRole, async (req, res) => {
  try {
    // Validate input
    const { name, src, destination, distance, occupancy, day_of_working } = req.body;

    if (!name || !src || !destination || !distance || !occupancy || !day_of_working) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Add a new bus using the model
    total_seats = occupancy;
    
    const bus_route_id = await addRoute(src, destination, distance)
    .then(async (data)=> {
      const bus_route_id = data.id;
      const busId = await addBus(req.userId,{name, bus_route_id, occupancy, total_seats, day_of_working }).id;
    })
    // const userBusRelation = await updateUserBuses(req.userId, busId);
    res.json({ message: 'Bus created successfully' });
  } catch (error) {
    console.error('Error creating bus:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
