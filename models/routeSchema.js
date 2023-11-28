const pool = require('../config/connection');

const createRoutesTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS routes (
        id SERIAL PRIMARY KEY,
        src VARCHAR(255) NOT NULL,
        destination VARCHAR(255) NOT NULL,
        distance DECIMAL(10, 2) NOT NULL
      );
    `;
    await pool.query(query);
    console.log('routes table created successfully');
  } catch (error) {
    console.error('Error creating routes table:', error);
  }
};

const deleteRoutesTable = async () => {
  try {
    const query = `
    DROP TABLE IF EXISTS routes;
    `;
    await pool.query(query);
    console.log('Deleted ')
  }catch(error){
    console.error('Error deleting table ',error)
  }
}
const addRoute = async (src, destination, distance) => {
  try {
    const query = `
      INSERT INTO routes (src, destination, distance)
      VALUES ($1, $2, $3)
    `;
    const result = await pool.query(query, [src, destination, distance]);
    console.log("Route is successfully added");
    return result.rows[0];
  } catch (error) {
    console.error('Error inserting route:', error);
    return false;
  }
};

module.exports = { createRoutesTable, addRoute, deleteRoutesTable };
