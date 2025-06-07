const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Chat = require('../models/Chat');
const User = require('../models/User');
const { OpenAI } = require('openai');

// Initialize OpenAI
const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Create new chat room
router.post('/create', auth, async (req, res) => {
  try {
    const { doctorId } = req.body;
    
    // Check if doctor exists
    const doctor = await User.findOne({ userId: doctorId, type: 'doctor' });
    if (!doctor) {
      return res.status(404).send({ error: 'Doctor not found' });
    }
    
    // Create unique room ID
    const roomId = `room_${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Create chat room
    const chat = new Chat({
      roomId,
      participants: [
        { userId: req.userId, type: req.userType },
        { userId: doctorId, type: 'doctor' }
      ],
      startTime: new Date(),
      endTime: new Date(Date.now() + 300000) // 5 minutes from now
    });
    
    await chat.save();
    
    res.status(201).send({ roomId });
  } catch (error) {
    res.status(500).send({ error: 'Failed to create chat room' });
  }
});

// Get chat history
router.get('/:roomId', auth, async (req, res) => {
  try {
    const { roomId } = req.params;
    const chat = await Chat.findOne({ roomId });
    
    if (!chat) {
      return res.status(404).send({ error: 'Chat not found' });
    }
    
    // Check if user is a participant
    const isParticipant = chat.participants.some(p => 
      p.userId === req.userId && p.type === req.userType
    );
    
    if (!isParticipant) {
      return res.status(403).send({ error: 'Not authorized' });
    }
    
    res.status(200).send(chat);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch chat history' });
  }
});

// Send message to OpenAI
router.post('/openai', auth, async (req, res) => {
  try {
    const { message } = req.body;
    
    const completion = await openaiClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: message
      }],
      temperature: 0.7
    });
    
    // Check for sensitive content
    const isSensitive = await checkSensitiveContent(message);
    
    if (isSensitive) {
      // Notify admin
      await notifyAdmin(message, req.userId, req.userType);
    }
    
    res.status(200).send({
      response: completion.data.choices[0].message.content,
      isSensitive
    });
  } catch (error) {
    res.status(500).send({ error: 'Failed to process message' });
  }
});

// Helper function to check sensitive content
const checkSensitiveContent = async (message) => {
  // Implement your sensitive content detection logic here
  // This could be using OpenAI's content moderation API or custom keywords
  const keywords = ['suicide', 'kill', 'harm', 'death'];
  return keywords.some(keyword => message.toLowerCase().includes(keyword));
};

// Helper function to notify admin
const notifyAdmin = async (message, userId, userType) => {
  // Implementation for notifying admin via email or SMS
  // This would use nodemailer or twilio to send notifications
};

module.exports = router;
