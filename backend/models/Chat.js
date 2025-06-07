const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true
  },
  participants: [{
    userId: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['user', 'doctor', 'admin'],
      required: true
    }
  }],
  messages: [{
    senderId: {
      type: String,
      required: true
    },
    senderType: {
      type: String,
      enum: ['user', 'doctor', 'admin'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    isSensitive: {
      type: Boolean,
      default: false
    }
  }],
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
