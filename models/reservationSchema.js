const pool = require('../config/connection');

const createReservationSchema = async () => {
    try{
        const query = `
        CREATE TABLE IF NOT EXISTS seat_reservations (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id),
            bus_id INT REFERENCES buses(id),
            route_id INT REFERENCES routes(id),
            seat_number INT NOT NULL,
            booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            journey_date TIMESTAMP NOT NULL
          );
        `;
        await pool.query(query);
        console.log('seat_reservations table created successfully');
    }catch(error){
        console.error('Error creating seat_reservations table:', error);
    }
}

const deleteReservationSchema = async () => {
    try {
        const query = `
        DROP TABLE IF EXISTS seat_reservations;
        `;
        await pool.query(query);
    } catch(error){
        console.error('Error creating seat_reservations table:', error);
    }
}

const seatAvailability = async (id, dateOfJourney) => {
    const query = `
    SELECT seat_number
    FROM seats
    WHERE bus_id = $1
    AND seat_number NOT IN (
    SELECT seat_number
    FROM seat_reservations
    WHERE bus_id = $1
    AND journey_date = $2);
    `;
    return await pool.query(query, [id, dateOfJourney]).then(data => data.rows);
}

const bookSeat = async (bus_id, route_id, seat_number, dateOfJourney, user_id) => {
    const query = `
    INSERT INTO seat_reservations(bus_id, route_id, seat_number, journey_date, user_id) 
    VALUES VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `;
    return await pool.query(query, [bus_id, route_id, seat_number, dateOfJourney, user_id]).then(data => data.rows);
}

module.exports = {
    createReservationSchema, 
    seatAvailability,
    bookSeat,
    deleteReservationSchema
}