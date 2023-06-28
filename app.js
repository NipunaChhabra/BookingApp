const express = require('express');
const cors = require('cors');
const seatRoutes = require('./routes/seatRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Register API routes
app.use('/seats', seatRoutes);
app.use('/bookings', bookingRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});