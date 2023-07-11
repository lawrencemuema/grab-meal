const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');


// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }

    const token = jwt.sign({ id: user.id }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Generate and save reset token in the user record

    // Send password reset email to the user
    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to initiate password reset' });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  const { email, token, newPassword } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Validate the reset token and update the password

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

// Sign Up
router.post('/signup', async (req, res) => {
  const { name, email, password, address, phone_number } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(409).json({ error: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      phone_number,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Phone Number OTP Verification
router.post('/verify-otp', async (req, res) => {
  const { phone_number, otp } = req.body;
  try {
    const user = await User.findOne({ where: { phone_number } });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Validate the OTP

    res.json({ message: 'Phone number verified successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify phone number' });
  }
});

// Email Verification
router.post('/verify-email', async (req, res) => {
  const { email, token } = req.body;
  try {

    // Validate the email verification token

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify email' });
  }
});






module.exports = router;
