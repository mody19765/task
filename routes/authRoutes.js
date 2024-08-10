const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Sign up route
router.post('/signup', authController.signUp);

// Log in route
router.post('/login', authController.login);

module.exports = router;
