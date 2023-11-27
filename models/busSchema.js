// models/busschema.js
const pool = require('../config/connection');

// Define the bus schema
const createBusSchema = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS buses (
      id SERIAL PRIMARY KEY,
      bus_name VARCHAR(255) NOT NULL,
      src_to_destination VARCHAR(255) NOT NULL,
      arrival TIMESTAMPTZ NOT NULL,
      departure TIMESTAMPTZ NOT NULL,
      date_of_journey DATE NOT NULL
    );
  `;
  await pool.query(query);
};

module.exports = createBusSchema;
