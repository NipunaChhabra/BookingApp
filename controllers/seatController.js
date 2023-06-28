const seatService = require('../services/seatService');

async function getAllSeats(req, res) {
  const seats = await seatService.getAllSeats();
  res.json(seats);
}

async function getSeatPricing(req, res) {
  const seatId = req.params.id;
  const seat = await seatService.getSeatPricing(seatId);
  res.json(seat);
}

module.exports = {
  getAllSeats,
  getSeatPricing,
};