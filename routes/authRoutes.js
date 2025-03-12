const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Logout route
router.post('/logout', authenticateUser, logoutUser);

module.exports = router;
