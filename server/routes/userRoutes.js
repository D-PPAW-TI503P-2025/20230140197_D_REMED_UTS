const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create user (Public logic for now, or Admin protected if preferred)
router.post('/', userController.createUser);

// List users
router.get('/', userController.getAllUsers);

// Login (Simulation)
router.post('/login', userController.login);

module.exports = router;
