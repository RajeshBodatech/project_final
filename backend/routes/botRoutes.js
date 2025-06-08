const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const botController = require('../controllers/botController');

router.post('/chat', auth, botController.chat);
router.get('/test', auth, botController.testAPI);

module.exports = router; 