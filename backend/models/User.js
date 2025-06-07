const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  name: { // Full Name
    type: String,
    required: true
  },
  email: { // Email
    type: String,
    required: true,
    unique: true
  },
  password: { // Password
    type: String,
    required: true
  },
  phoneNumber: { // Phone Number
    type: String,
    required: true,
    unique: true
  },
  countryCode: {
    type: String,
    required: true,
    default: '91'
  },
  role: { // Always 'user'
    type: String,
    enum: ['user'],
    default: 'user',
    required: true
  },
  otp: {
    code: String,
    expiresAt: Date,
    sentAt: Date
  },
  otpAttempts: {
    type: Number,
    default: 0
  },
  isLocked: {
    type: Boolean,
    default: false
  },
  lockedUntil: {
    type: Date
  },
  lastLogin: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  notifications: [{
    type: {
      type: String,
      enum: ['sms'],
      default: 'sms'
    },
    contact: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next) {
  if (!this.userId) {
    this.userId = `user_${Math.floor(100000 + Math.random() * 900000)}`;
  }
  this.role = 'user'; // Always enforce role as 'user'
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;

