require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5002;
const server = http.createServer(app);
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5002"], // Allow both ports
  methods: ["GET", "POST"],
  credentials: true
};

// Apply CORS configuration consistently
app.use(cors(corsOptions));

const io = new Server(server, {
  cors: corsOptions
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    details: err.message
  });
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chats', require('./routes/chats'));
app.use('/api/admin', require('./routes/admin'));

// Socket.io connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_room', (data) => {
    socket.join(data.room);
    console.log(`User joined room: ${data.room}`);
  });

  socket.on('send_message', async (data) => {
    const { room, message, senderId, senderType } = data;
    
    // Check for sensitive content
    if (await checkSensitiveContent(message)) {
      // Send notification to admin
      await notifyAdmin(message, senderId, senderType);
    }

    io.to(room).emit('receive_message', {
      message,
      senderId,
      senderType,
      timestamp: new Date().toISOString()
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// MongoDB Connection
const uri = process.env.MONGODB_URI;

// Ensure the connection string starts with the correct scheme
if (uri && !uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
  throw new Error('Invalid MongoDB connection string format');
}

const connectWithRetry = async (uri, options) => {
  let retries = 10;
  let delay = 2000; // 2 seconds
  
  console.log('Attempting to connect to MongoDB...');
  console.log('Connection string:', uri.includes('mongodb+srv://') ? 'MongoDB Atlas' : 'Local MongoDB');

  while (retries > 0) {
    try {
      await mongoose.connect(uri, options);
      console.log('Successfully connected to MongoDB');
      return;
    } catch (err) {
      console.error(`MongoDB connection attempt failed: ${err.message}`);
      console.error('Connection details:', {
        uri: uri.includes('mongodb+srv://') ? 'MongoDB Atlas' : 'Local MongoDB',
        errorType: err.name
      });
      
      // Check if this is an Atlas connection error
      if (uri.includes('mongodb+srv://') && err.name === 'MongooseServerSelectionError') {
        console.error('MongoDB Atlas connection error. Please ensure:');
        console.error('1. Your IP address is whitelisted in MongoDB Atlas');
        console.error('2. The connection string is correct');
        console.error('3. Your MongoDB Atlas cluster is running');
      }
      
      console.log(`Retrying in ${delay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      retries--;
      delay *= 2; // Exponential backoff
    }
  }
  console.error('Failed to connect to MongoDB after multiple attempts');
  process.exit(1); // Exit process if connection fails after retries
};

// MongoDB Connection
const connectionUri = uri || 'mongodb://localhost:27017/hope-ai';

connectWithRetry(connectionUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  minPoolSize: 10,
  maxPoolSize: 100,
  socketTimeoutMS: 45000,
  heartbeatFrequencyMS: 10000
});

// Helper function to check sensitive content
const checkSensitiveContent = async (message) => {
  // Implementation for sensitive content detection
  const keywords = ['suicide', 'kill', 'harm', 'death'];
  return keywords.some(keyword => message.toLowerCase().includes(keyword));
};

// Helper function to notify admin
const notifyAdmin = async (message, userId, userType) => {
  // Implementation for notifying admin via email or SMS
  // This would use nodemailer or twilio to send notifications
};

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API base URL: http://localhost:${PORT}/api`);
});

console.log('JWT_SECRET:', process.env.JWT_SECRET);
