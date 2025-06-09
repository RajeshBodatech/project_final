const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  microphone: {
    type: Boolean,
    default: false
  },
  camera: {
    type: Boolean,
    default: false
  },
  location: {
    name: {
      type: String,
      required: true
    },
    coordinates: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      }
    },
    fullAddress: {
      type: String,
      required: false
    }
  },
  audio: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Permission', permissionSchema); 