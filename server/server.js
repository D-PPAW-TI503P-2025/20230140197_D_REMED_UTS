const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// ===== Import Database =====
const { sequelize } = require('./models');

// ===== Import Routes =====
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const userRoutes = require('./routes/userRoutes');

// ===== Middleware Global =====
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Root Endpoint (cek server) =====
app.get('/', (req, res) => {
  res.json({
    message: 'Library System API is running'
  });
});

// ===== API Routes =====
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);
app.use('/api/users', userRoutes);

// ===== Error Handling Global (opsional tapi bagus) =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error'
  });
});

// ===== Jalankan Server =====
const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });
