const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ===== Tentukan PORT lebih dulu =====
const PORT = process.env.PORT || 3000;

// ===== Import Database =====
const { sequelize } = require('./models');

// ===== Import Routes =====
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const userRoutes = require('./routes/userRoutes');

// ===== Middleware Global =====
// kalau masih development, boleh bebaskan semua origin:
app.use(cors());

// kalau mau dibatasi ke frontend tertentu, pakai ini:
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));

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

// ===== Error Handling Global =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error'
  });
});

// ===== Jalankan Server setelah DB siap =====
sequelize.sync()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });
