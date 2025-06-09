require('dotenv').config();

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Permission = require('../models/Permission');
const auth = require('../middleware/auth');
const twilio = require('twilio');

const { sendOTP, verifyOTP } = require('../utils/twilio');

// Check environment variables
if (
  !process.env.JWT_SECRET ||
  !process.env.TWILIO_ACCOUNT_SID ||
  !process.env.TWILIO_AUTH_TOKEN ||
  !process.env.TWILIO_VERIFY_SID
) {
  console.error("❌ Missing environment variables. Check .env setup.");
  process.exit(1);
}

// Store verified OTPs temporarily (in production, use Redis or similar)
const verifiedOTPs = new Map();

// 📲 Request OTP (uses utility)
router.post('/request-otp', async (req, res) => {
  try {
    const { phoneNumber, countryCode } = req.body;
    console.log('Received OTP request:', { phoneNumber, countryCode }); // Debug log

    if (!phoneNumber || !countryCode) {
      console.log('Missing required fields:', { phoneNumber, countryCode }); // Debug log
      return res.status(400).json({
        error: 'Phone number and country code are required',
        success: false
      });
    }

    // Clean phone number format
    const cleanPhoneNumber = phoneNumber.replace(/^\+/, '').replace(/[^0-9]/g, '');
    console.log('Cleaned phone number:', cleanPhoneNumber); // Debug log

    const result = await sendOTP(cleanPhoneNumber, countryCode);
    console.log('OTP send result:', result); // Debug log

    if (result.success) {
      res.status(200).json({
        success: true,
        status: result.status,
        message: 'OTP sent successfully'
      });
    } else {
      console.error('Failed to send OTP:', result.error); // Debug log
      res.status(500).json({
        success: false,
        error: result.error || 'Failed to send OTP'
      });
    }
  } catch (error) {
    console.error('OTP request error:', error); // Debug log
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to send OTP'
    });
  }
});

// ✅ Verify OTP (uses utility)
router.post('/verify-otp', async (req, res) => {
  try {
    const { phoneNumber, countryCode, otp } = req.body;
    console.log('Received OTP verification request:', { phoneNumber, countryCode, otp }); // Debug log

    if (!phoneNumber || !countryCode || !otp) {
      console.log('Missing required fields:', { phoneNumber, countryCode, otp }); // Debug log
      return res.status(400).json({
        error: 'Phone number, country code, and OTP are required',
        success: false
      });
    }

    // Clean phone number format
    const cleanPhoneNumber = phoneNumber.replace(/^\+/, '').replace(/[^0-9]/g, '');
    console.log('Cleaned phone number:', cleanPhoneNumber); // Debug log

    // Verify OTP
    const result = await verifyOTP(cleanPhoneNumber, countryCode, otp);
    console.log('OTP verification result:', result); // Debug log

    if (result.success) {
      // Store the verification status
      verifiedOTPs.set(cleanPhoneNumber, {
        otp,
        timestamp: Date.now(),
        verified: true
      });
      
      res.status(200).json({
        success: true,
        message: 'OTP verified successfully',
        status: result.status
      });
    } else {
      console.log('OTP verification failed:', result); // Debug log
      res.status(400).json({
        success: false,
        error: result.error || 'Invalid OTP',
        status: result.status
      });
    }
  } catch (error) {
    console.error('OTP verification error:', error); // Debug log
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to verify OTP'
    });
  }
});

// 🧾 Register User
router.post('/register', async (req, res) => {
  try {
    let { phoneNumber, name, email, password, otp, permissions } = req.body;
    console.log('Registration request:', { phoneNumber, name, email, otp, permissions }); // Debug log

    // Clean phone number format
    phoneNumber = phoneNumber.replace(/^\+/, '').replace(/[^0-9]/g, '');
    if (!phoneNumber.startsWith('91')) {
      phoneNumber = `91${phoneNumber}`;
    }
    console.log('Cleaned phone number for registration:', phoneNumber); // Debug log

    if (!phoneNumber || !name || !email || !password || !otp) {
      return res.status(400).json({ error: 'All fields are required', success: false });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists', success: false });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user first
    const user = new User({
      userId: `user_${Date.now()}`,
      phoneNumber,
      name,
      email,
      password: hashedPassword,
      role: 'user',
      isActive: true,
      lastLogin: new Date()
    });

    await user.save();
    console.log('User created successfully:', user.userId); // Debug log

    // Store permissions if provided
    if (permissions) {
      // Validate and format location data
      if (permissions.location) {
        if (typeof permissions.location === 'boolean') {
          permissions.location = {
            name: 'Location permission granted',
            coordinates: {
              latitude: 0,
              longitude: 0
            }
          };
        } else if (typeof permissions.location === 'object') {
          // Ensure location data has the required fields
          if (!permissions.location.name || !permissions.location.coordinates) {
            permissions.location = {
              name: 'Location permission granted',
              coordinates: {
                latitude: 0,
                longitude: 0
              }
            };
          } else {
            // Ensure coordinates are numbers and format location name
            permissions.location = {
              name: permissions.location.name.split(',')[0] + ', ' + permissions.location.name.split(',')[1],
              coordinates: {
                latitude: Number(permissions.location.coordinates.latitude) || 0,
                longitude: Number(permissions.location.coordinates.longitude) || 0
              },
              fullAddress: permissions.location.fullAddress
            };
          }
        }
      }
      
      console.log('Saving permissions with location:', permissions.location);
      
      const userPermissions = new Permission({
        userId: user.userId,
        ...permissions
      });
      await userPermissions.save();
      console.log('User permissions saved:', user.userId); // Debug log
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // Send Welcome Message (optional)
    try {
      if (process.env.TWILIO_PHONE_NUMBER) {
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        await client.messages.create({
          body: `Welcome to Hope-AI! Your account has been successfully created.`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: `+${phoneNumber}`
        });
      }
    } catch (twilioError) {
      console.error('⚠️ Failed to send welcome SMS:', twilioError.message);
    }

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber
      }
    });

  } catch (error) {
    console.error('Registration error:', error); // Debug log
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
});

// 🔐 Login Route (Manual, not OTP)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt:', email);
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ error: 'Invalid credentials', success: false });
    }

    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for user:', email);
      return res.status(400).json({ error: 'Invalid credentials', success: false });
    }

    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Update last login
    await User.findOneAndUpdate(
      { email },
      { $set: { lastLogin: new Date() } }
    );

    res.status(200).json({
      token,
      userId: user.userId,
      role: user.role,
      success: true
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed', details: error.message, success: false });
  }
});

// Get current user data
router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ userId: decoded.userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { phoneNumber, otp, newPassword } = req.body;
    console.log('Reset password request:', { phoneNumber, otp }); // Debug log

    if (!phoneNumber || !otp || !newPassword) {
      return res.status(400).json({
        error: 'Phone number, OTP, and new password are required',
        success: false
      });
    }

    // Clean phone number format
    const cleanPhoneNumber = phoneNumber.replace(/^\+/, '').replace(/[^0-9]/g, '');
    console.log('Cleaned phone number:', cleanPhoneNumber); // Debug log

    // Find user by phone number first
    const user = await User.findOne({ phoneNumber: cleanPhoneNumber });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if OTP was previously verified
    const verifiedOTP = verifiedOTPs.get(cleanPhoneNumber);
    const isOTPValid = verifiedOTP && 
                      verifiedOTP.otp === otp && 
                      verifiedOTP.verified && 
                      (Date.now() - verifiedOTP.timestamp) < 300000; // 5 minutes validity

    if (!isOTPValid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired OTP'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password
    user.password = hashedPassword;
    await user.save();
    console.log('Password updated successfully for user:', user.userId);

    // Remove the verified OTP
    verifiedOTPs.delete(cleanPhoneNumber);

    res.status(200).json({
      success: true,
      message: 'Password reset successful'
    });

  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to reset password'
    });
  }
});

module.exports = router;
