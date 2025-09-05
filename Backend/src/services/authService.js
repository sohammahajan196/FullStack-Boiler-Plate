// src/services/authService.js
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const { validateEmail, validatePassword, validateName } = require('../utils/validation');

class AuthService {
  async register(userData) {
    const { name, email, password } = userData;

    // Validation
    if (!validateName(name)) {
      throw new Error('Name must be at least 2 characters long');
    }

    if (!validateEmail(email)) {
      throw new Error('Please enter a valid email address');
    }

    if (!validatePassword(password)) {
      throw new Error('Password must be at least 6 characters long');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create user
    const user = new User({ name, email, password });
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    return { user, token };
  }

  async login(email, password) {
    // Validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate token
    const token = generateToken(user._id);

    // Remove password from user object
    user.password = undefined;

    return { user, token };
  }

  async getUserById(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

module.exports = new AuthService();
