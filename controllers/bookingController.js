const bookingService = require('../services/bookingService');

async function createBooking(req, res) {
  const { seatIds, name, phoneNumber } = req.body;
  const result = await bookingService.createBooking(seatIds, name, phoneNumber);
  res.json(result);
}

async function retrieveBookings(req, res) {
  const userIdentifier = req.query.userIdentifier;
  const bookings = await bookingService.retrieveBookings(userIdentifier);
  res.json(bookings);
}

module.exports = {
  createBooking,
  retrieveBookings,
};