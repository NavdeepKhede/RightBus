const pool = require('../config/connection');

const createBusUserRelationTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS bus_user_relation (
        user_id INT REFERENCES users(id),
        bus_id INT REFERENCES buses(id),
        PRIMARY KEY (user_id, bus_id)
      );
    `;
    await pool.query(query);
    console.log('bus_user_relation table created successfully');
  } catch (error) {
    console.error('Error creating bus_user_relation table:', error);
  }
};

const deleteBuseUserRelationTable = async () => {
  try{
    const query = `
    DROP TABLE IF EXISTS bus_user_relation;`;
    await pool.query(query);
    console.log('Deleted')
  }catch(error){
    console.error('Error Deleting: ', error)
  }
}

const updateUserBuses = async (userId, busId) => {
  try{
    const query = `
      INSERT INTO bus_user_relation (user_id, bus_id)
      VALUES ($1, $2);
    `;
    const result = await pool.query(query, [userId, busId]);
    return result.rows[0];
  }catch(error){
    console.error('Error updating user buses:', error);
  }
};

const getUserBuses = async (userId) => {
  try {
    const query = `
      SELECT b.*
      FROM buses b
      JOIN bus_user_relation bur ON b.id = bur.bus_id
      WHERE bur.user_id = $1;    
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching user buses:', error);
    return [];
  }
};

module.exports = { createBusUserRelationTable, updateUserBuses, deleteBuseUserRelationTable , getUserBuses };
