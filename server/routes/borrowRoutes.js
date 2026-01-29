const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
const { isUser } = require('../middleware/authMiddleware');

router.post('/', isUser, borrowController.borrowBook);

module.exports = router;
