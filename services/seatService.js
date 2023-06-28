const seatModel = require('../models/seatModel');

async function getAllSeats() {
  return seatModel.getAllSeats();
}

async function getSeatPricing(seatId) {
  return seatModel.getSeatPricing(seatId);
}

module.exports = {
  getAllSeats,
  getSeatPricing,
};