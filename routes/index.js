const express = require('express');
const router = express.Router();

const seatsRouter = require('./seats');
const bookingsRouter = require('./bookings');

router.use('/seats', seatsRouter);
router.use('/bookings', bookingsRouter);

module.exports = router;