const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
const { isUser, isAdmin } = require('../middleware/authMiddleware');

// user meminjam buku
router.post('/', isUser, borrowController.borrowBook);

// admin melihat laporan peminjaman
router.get('/', isAdmin, borrowController.getAllBorrowLogs);

module.exports = router;
