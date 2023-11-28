const express = require('express');
const fetchUser = require('../../middleware/fetchUser');
const { seatAvailability } = require('../../models/reservationSchema');
const { getBusById } = require('../../models/busSchema');

const router = express.Router();

const checkIfBusIsAvailableThatDay = async (busId, date) => {
  try{
    // Format the date to get the day of the week
    const bookingDayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  
    const bus = await getBusById(busId);
    if (!bus) {
      return false;
    }
    return bus.day_of_working.includes(bookingDayOfWeek.toString().toLowerCase());
  } catch(error){
    console.error('Unable to find bus availability on that day', error);
    return false;
  }
};

router.get('/:id', fetchUser, async (req, res) => {
  try {
    const id = req.params.id;
    let date = req.query.date;


    if (!date) {
      return res.status(400).json({ error: 'Missing date parameter' });
    }

    date = new Date(date);
    const available_day = await checkIfBusIsAvailableThatDay(id, date);
    // console.log(available_day)
    if(!available_day){
      return res.status(404).json({ error : 'Bus not available this day'})
    }

    const availability = await seatAvailability(id, date);
    res.json(availability);
  } catch (error) {
    console.error('Error checking seat availability:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
