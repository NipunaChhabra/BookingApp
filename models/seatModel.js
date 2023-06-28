const pool = require('../utils/database.js');
const csv = require('csv-parser');
const fs = require('fs');

// Create a table for seats in PostgreSQL database
async function createSeatTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS seats (
        id SERIAL PRIMARY KEY,
        seat_identifier VARCHAR(50) NOT NULL,
        seat_class VARCHAR(10) NOT NULL
      );
    `);
  } catch (error) {
    console.error('Error creating seats table:', error);
  }
}

// Insert seat data from CSV into the PostgreSQL database
async function insertSeatDataFromCSV() {
  try {
    fs.createReadStream('data/seats.csv')
      .pipe(csv())
      .on('data', async (data) => {
        const { id, seat_identifier, seat_class } = data;
        await pool.query('INSERT INTO seats (id, seat_identifier, seat_class) VALUES ($1, $2, $3)', [id, seat_identifier, seat_class]);
      })
      .on('end', () => {
        console.log('Seat data inserted successfully.');
      });
  } catch (error) {
    console.error('Error inserting seat data:', error);
  }
}

// Get all seats from the database
async function getAllSeats() {
  try {
    const result = await pool.query('SELECT * FROM seats ORDER BY seat_class');
    return result.rows;
  } catch (error) {
    console.error('Error retrieving seats:', error);
    return [];
  }
}

// Get seat pricing based on seat class
async function getSeatPricing(seatId) {
  try {
    const result = await pool.query('SELECT * FROM seats WHERE id = $1', [seatId]);
    const seat = result.rows[0];
    if (!seat) {
      return null;
    }

    // Retrieve pricing logic based on seat class
    // ... implement your pricing logic here ...

    return {
      seat,
      pricing: {
        min_price: '$397.61',
        normal_price: '$547.20',
        max_price: '$797.40',
      },
    };
  } catch (error) {
    console.error('Error retrieving seat pricing:', error);
    return null;
  }
}

module.exports = {
  createSeatTable,
  insertSeatDataFromCSV,
  getAllSeats,
  getSeatPricing,
};