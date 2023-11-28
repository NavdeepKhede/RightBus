const pool = require('../config/connection');
const { updateUserBuses } = require('./busUserSchema');

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

const addBus = async (userId,bus) => {
  try {
    const { name, bus_route_id, occupancy, total_seats, day_of_working } = bus;
    const query = `
      INSERT INTO buses (bus_name, route_id, occupancy, totalSeats, day_of_working)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const result = await pool.query(query, [name, bus_route_id, occupancy, total_seats, day_of_working]);
    console.log('Bus added successfully');
    await updateUserBuses(userId, result.rows[0].id);
    return result.rows[0];
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
    const { id, busName, route_id, occupancy, totalSeats, day_of_working } = bus;
    const query = `
      UPDATE buses
      SET bus_name = $1, route_id = $2, occupancy = $3, totalSeats = $4, day_of_working = $5
      WHERE id = $6
    `;
    await pool.query(query, [busName, route_id, occupancy, totalSeats, day_of_working, id]);
    console.log('Bus updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating bus:', error);
    return false;
  }
};

const deleteBusById = async (busId, userId) => {
  try {
    // Begin the transaction
    await pool.query('BEGIN');

    // Delete records from bus_user_relation where bus_id matches $1
    await pool.query('DELETE FROM bus_user_relation WHERE bus_id = $1 AND user_id = $2', [busId, userId]);

    // Delete the bus from the buses table where id matches $1
    await pool.query('DELETE FROM buses WHERE id = $1', [busId]);

    // Commit the transaction (if everything succeeds)
    await pool.query('COMMIT');
    console.log('Bus deleted successfully');
    return true;
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error deleting bus:');
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
