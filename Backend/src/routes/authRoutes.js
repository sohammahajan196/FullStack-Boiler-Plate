// src/routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/Authcontroller');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/profile', authenticate, authController.getProfile);
router.post('/logout', authenticate, authController.logout);

module.exports = router;
