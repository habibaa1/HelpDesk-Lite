require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');

require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tickets', ticketRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server Running');
});