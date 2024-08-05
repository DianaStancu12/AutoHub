require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const adRoutes = require('./routes/adsRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointmentRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const ratingRoutes = require('./routes/ratingRoutes');

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

app.use('/api/ads', adRoutes);
app.use('/auth', authRoutes);
app.use('/api/ratings', ratingRoutes);

app.use('/api/appointments', authMiddleware,appointmentRoutes);


sequelize.sync()
  .then(result => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });


async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${server.address().port}`);
    });

    server.on('error', (err) => {
      console.error('Server error:', err);
      process.exit(1); 
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); 
  }
}

startServer();

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});
