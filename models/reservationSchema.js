const pool = require('../config/connection');

class Reservation {
  constructor(pool) {
    this.pool = pool;
  }

  async createReservationSchema() {
    try {
      const query = `
        CREATE TABLE IF NOT EXISTS seat_reservations (
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES users(id),
          bus_id INT REFERENCES buses(id),
          route_id INT REFERENCES routes(id),
          seat_number INT NOT NULL,
          booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          journey_date DATE NOT NULL
        );
      `;
      await this.pool.query(query);
      console.log('seat_reservations table created successfully');
    } catch (error) {
      console.error('Error creating seat_reservations table:', error);
    }
  }

  async deleteReservationSchema() {
    try {
      const query = `
      DROP TABLE IF EXISTS seat_reservations;
      `;
      await this.pool.query(query);
    } catch (error) {
      console.error('Error creating seat_reservations table:', error);
    }
  }

  async seatAvailability(id, dateOfJourney) {
    try {
      console.log(dateOfJourney)
      const query = `
        SELECT all_seats.seat_number
        FROM (
          SELECT generate_series(1, b.totalSeats) AS seat_number
          FROM buses AS b
          WHERE b.id = $1
        ) AS all_seats
        LEFT JOIN (
          SELECT seat_number
          FROM seat_reservations
          WHERE bus_id = $1
          AND journey_date = $2
        ) AS reserved_seats
        ON all_seats.seat_number = reserved_seats.seat_number
        WHERE reserved_seats.seat_number IS NULL;
      `;
      const result = await this.pool.query(query, [id, dateOfJourney]);
      console.log('Seat availability:', result.rows);
      return result.rows;
    } catch (error) {
      console.error('Error checking seat availability:', error);
      return [];
    }
  }

  async bookSeat(bus_id, route_id, seat_number, dateOfJourney, user_id) {
    const query = `
      INSERT INTO seat_reservations(bus_id, route_id, seat_number, journey_date, user_id) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    return await this.pool.query(query, [bus_id, route_id, seat_number, dateOfJourney, user_id]).then(data => data.rows);
  }
}

module.exports = Reservation;
