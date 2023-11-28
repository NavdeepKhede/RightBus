const pool = require('../config/connection');

const createBusTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS buses (
        id SERIAL PRIMARY KEY,
        bus_name VARCHAR(255) NOT NULL,
        route_id INT REFERENCES routes(id),
        occupancy VARCHAR(50) NOT NULL,
        totalSeats INT NOT NULL,
        day_of_working VARCHAR[] NOT NULL
      );
    `;
    await pool.query(query);
    console.log('Bus table created successfully');
  } catch (error) {
    console.error('Error creating bus table:', error);
  }
};

const deleteBusTable = async () => {
  try {
    const query = `
    DROP TABLE IF EXISTS buses;
    `;
    await pool.query(query);
    console.log('Deleted ')
  }catch(error){
    console.error('Error deleting table ',error)
  }
};

const addBus = async (bus) => {
  try {
    const { name, bus_route_id, occupancy, total_seats, day_of_working } = bus;
    const query = `
      INSERT INTO buses (bus_name, route_id, occupancy, totalSeats, day_of_working)
      VALUES ($1, $2, $3, $4, $5)
    `;
    await pool.query(query, [name, bus_route_id, occupancy, total_seats, day_of_working]);
    console.log('Bus added successfully');
    return true;
  } catch (error) {
    console.error('Error adding bus:', error);
    return false;
  }
};

const getAllBuses = async () => {
  try {
    const query = 'SELECT * FROM buses';
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching all buses:', error);
    return [];
  }
};

const getBusById = async (id) => {
  try {
    const query = 'SELECT * FROM buses WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching bus by ID:', error);
    return null;
  }
};

const updateBus = async (bus) => {
  try {
    const { id, busName, route_id, occupancy, totalSeats, dateOfJourney } = bus;
    const query = `
      UPDATE buses
      SET bus_name = $1, route_id = $2, occupancy = $3, totalSeats = $4, date_of_journey = $5
      WHERE id = $6
    `;
    await pool.query(query, [busName, route_id, occupancy, totalSeats, dateOfJourney, id]);
    console.log('Bus updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating bus:', error);
    return false;
  }
};

const deleteBusById = async (id) => {
  try {
    const query = 'DELETE FROM buses AS b USING bus_user_relation AS bur WHERE b.id = $1 AND b.id = bur.bus_id';
    await pool.query(query, [id]);
    console.log('Bus deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting bus:', error);
    return false;
  }
};

module.exports = {
  createBusTable,
  deleteBusTable,
  addBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBusById,
};
