// src/controllers/authController.js
const authService = require('../services/authService');

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      
      const { user, token } = await authService.register({ name, email, password });

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: { user, token }
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      const { user, token } = await authService.login(email, password);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: { user, token }
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  }

  async getProfile(req, res) {
    try {
      res.status(200).json({
        success: true,
        data: { user: req.user }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async logout(req, res) {
    // With JWT, logout is typically handled on the client side
    // by removing the token from storage
    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  }
}

module.exports = new AuthController();
