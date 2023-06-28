const pool = require('../utils/database.js');

// Create a table for bookings in PostgreSQL database
async function createBookingTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        seat_id INTEGER NOT NULL,
        name VARCHAR(100) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
  } catch (error) {
    console.error('Error creating bookings table:', error);
  }
}

// Create a booking in the database
async function createBooking(seatIds, name, phoneNumber) {
  try {
    // Check if seats are already booked
    const result = await pool.query('SELECT id FROM bookings WHERE seat_id = ANY($1)', [seatIds]);
    if (result.rows.length > 0) {
      return { error: 'Some seats are already booked.' };
    }

    // Insert booking into the database
    const query = 'INSERT INTO bookings (seat_id, name, phone_number) VALUES ($1, $2, $3) RETURNING id';
    const bookingIds = [];
    await pool.query('BEGIN');
    for (const seatId of seatIds) {
      const insertResult = await pool.query(query, [seatId, name, phoneNumber]);
      bookingIds.push(insertResult.rows[0].id);
    }
    await pool.query('COMMIT');

    return { bookingIds, totalAmount: 0 }; // Replace 0 with the actual calculated total amount
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error creating booking:', error);
    return { error: 'Failed to create booking.' };
  }
}

// Retrieve bookings based on user identifier (email or phone number)
async function retrieveBookings(userIdentifier) {
  try {
    const result = await pool.query('SELECT * FROM bookings WHERE phone_number = $1', [userIdentifier]);
    return result.rows;
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    return [];
  }
}

module.exports = {
  createBookingTable,
  createBooking,
  retrieveBookings,
};
