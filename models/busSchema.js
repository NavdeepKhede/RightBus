// models/busschema.js
const pool = require('../config/connection');
// Define the bus schema
const createBusSchema = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS buses (
      id SERIAL PRIMARY KEY,
      bus_name VARCHAR(255) NOT NULL,
      src VARCHAR(255) NOT NULL,
      destination VARCHAR(255) NOT NULL,
      arrival VARCHAR(22) NOT NULL,
      departure VARCHAR(22) NOT NULL,
      date_of_journey DATE NOT NULL
    );
  `;
  await pool.query(query);
};

const addBus = async (busName, src, destination, arrival, departure, dateOfJourney) => {
  const query = `
    INSERT INTO buses (bus_name, src, destination, arrival, departure, date_of_journey)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;
  await pool.query(query, [busName, src, destination, arrival, departure, dateOfJourney]);
  console.log('Bus added successfully');
  return true; // Return true to indicate successful addition of bus

};

const getAllBuses = async () => {
  const query = 'SELECT * FROM buses';
  const result = await pool.query(query);
  return result.rows;

};

const getBus = async (id) => {
  const query = 'SELECT * FROM buses WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

const updateBus = async (id, busName, src, destination, arrival, departure, dateOfJourney) => {
  const query = `
    UPDATE buses
    SET bus_name = $1, src = $2, destination = $3, arrival = $4, departure = $5, date_of_journey = $6
    WHERE id = $7
  `;
  await pool.query(query, [busName, src, destination, arrival, departure, dateOfJourney, id]);
  console.log('Bus updated successfully');
  return true; 
};

const deleteBus = async (id) => {
  const query = 'DELETE FROM buses WHERE id = $1';
  await pool.query(query, [id]);
  console.log('Bus deleted successfully');
  return true; // Return true to indicate successful deletion of bus
}

module.exports = {
  createBusSchema,
  addBus,
  getBus,
  getAllBuses,
  updateBus,
  deleteBus,
};
