const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const botController = require('../controllers/botController');

router.post('/chat', authenticateToken, botController.chat);

module.exports = router; 