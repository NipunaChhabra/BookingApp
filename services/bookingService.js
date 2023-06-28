const bookingModel = require('../models/bookingModel');

async function createBooking(seatIds, name, phoneNumber) {
  return bookingModel.createBooking(seatIds, name, phoneNumber);
}

async function retrieveBookings(userIdentifier) {
  return bookingModel.retrieveBookings(userIdentifier);
}

module.exports = {
  createBooking,
  retrieveBookings,
};