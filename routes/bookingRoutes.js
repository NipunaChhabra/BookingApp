const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.post('/', bookingController.createBooking);
router.get('/', bookingController.retrieveBookings);

module.exports = router;