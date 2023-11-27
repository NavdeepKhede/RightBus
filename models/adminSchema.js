// models/adminschema.js
const pool = require('../config/connection');

// Define the admin schema
const createAdminSchema = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      phone VARCHAR(15) UNIQUE NOT NULL,
      buses JSONB[]
    );
  `;
  await pool.query(query);
};

module.exports = createAdminSchema;
