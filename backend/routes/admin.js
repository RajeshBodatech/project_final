const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Chat = require('../models/Chat');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.userType !== 'admin') {
    return res.status(403).send({ error: 'Admin access required' });
  }
  next();
};

// Get all users
router.get('/users', [auth, isAdmin], async (req, res) => {
  try {
    const users = await User.find({ type: { $ne: 'admin' } });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch users' });
  }
});

// Get all doctors
router.get('/doctors', [auth, isAdmin], async (req, res) => {
  try {
    const doctors = await User.find({ type: 'doctor' });
    res.status(200).send(doctors);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch doctors' });
  }
});

// Create new doctor
router.post('/doctors', [auth, isAdmin], async (req, res) => {
  try {
    const { phoneNumber, name, password } = req.body;
    
    // Check if doctor already exists
    const existingDoctor = await User.findOne({ phoneNumber, type: 'doctor' });
    if (existingDoctor) {
      return res.status(400).send({ error: 'Doctor already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);
    
    // Create new doctor
    const doctor = new User({
      phoneNumber,
      name,
      password: hashedPassword,
      type: 'doctor'
    });
    
    await doctor.save();
    
    res.status(201).send({ message: 'Doctor created successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to create doctor' });
  }
});

// Create new admin
router.post('/admins', [auth, isAdmin], async (req, res) => {
  try {
    const { phoneNumber, name, password, email, adminPhone } = req.body;
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ 
      $or: [
        { phoneNumber },
        { email },
        { adminPhone }
      ],
      type: 'admin'
    });
    
    if (existingAdmin) {
      return res.status(400).send({ error: 'Admin already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);
    
    // Create new admin
    const admin = new User({
      phoneNumber,
      name,
      password: hashedPassword,
      type: 'admin',
      email,
      adminPhone
    });
    
    await admin.save();
    
    res.status(201).send({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to create admin' });
  }
});

// Update admin profile
router.put('/profile', [auth, isAdmin], async (req, res) => {
  try {
    const { phoneNumber, name, email, adminPhone } = req.body;
    
    const updates = {};
    if (phoneNumber) updates.phoneNumber = phoneNumber;
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (adminPhone) updates.adminPhone = adminPhone;
    
    const admin = await User.findOneAndUpdate(
      { userId: req.userId },
      updates,
      { new: true }
    );
    
    if (!admin) {
      return res.status(404).send({ error: 'Admin not found' });
    }
    
    res.status(200).send({ message: 'Admin profile updated successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to update admin profile' });
  }
});

// Update doctor status
router.put('/doctors/:doctorId', [auth, isAdmin], async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { isActive } = req.body;
    
    const doctor = await User.findOneAndUpdate(
      { userId: doctorId, type: 'doctor' },
      { isActive },
      { new: true }
    );
    
    if (!doctor) {
      return res.status(404).send({ error: 'Doctor not found' });
    }
    
    res.status(200).send({ message: 'Doctor status updated successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to update doctor status' });
  }
});

// Get all chat history
router.get('/chats', [auth, isAdmin], async (req, res) => {
  try {
    const chats = await Chat.find({}).populate('participants.userId');
    res.status(200).send(chats);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch chat history' });
  }
});

// Get sensitive chats
router.get('/chats/sensitive', [auth, isAdmin], async (req, res) => {
  try {
    const chats = await Chat.find({
      'messages.isSensitive': true
    }).populate('participants.userId');
    res.status(200).send(chats);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch sensitive chats' });
  }
});

module.exports = router;
