import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Chatbot from './Chatbot';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="mt-20 px-4">
      {/* Chatbot Button */}
      <motion.button
        onClick={() => setShowChatbot(true)}
        className="fixed right-4 sm:right-8 top-20 sm:top-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] z-50 flex items-center gap-1 sm:gap-2 transform transition-all duration-300"
        whileHover={{ 
          scale: 1.05,
          rotateX: 5,
          rotateY: 5,
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
        }}
        whileTap={{ 
          scale: 0.95,
          rotateX: 0,
          rotateY: 0
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
      >
        <motion.span 
          className="text-xl sm:text-2xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🤖
        </motion.span>
        <span className="font-bold text-sm sm:text-lg hidden sm:inline">Ask Your Bot</span>
        <span className="font-bold text-sm sm:text-lg sm:hidden">Bot</span>
      </motion.button>

      {/* Chatbot Popup with Animated Background */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(59, 130, 246, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)",
                    "linear-gradient(45deg, rgba(168, 85, 247, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)",
                  ]
                }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.div
                className="absolute inset-0 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Chatbot Window */}
            <motion.div
              className="relative bg-white rounded-2xl w-full max-w-md h-[600px] shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300,
                opacity: { duration: 0.2 }
              }}
            >
              <Chatbot onClose={() => setShowChatbot(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-gray-100 w-full min-h-screen flex flex-col items-center justify-center px-2 py-6">
        {/* Header Section */}
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-center md:items-center justify-between mb-8">
          {/* Text Section */}
          <div className="w-full md:w-2/5 text-center md:text-left md:ml-12 mb-8 md:mb-0 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Your Mental Wellness Matters.
            </h1>
            <p className="text-base sm:text-lg text-gray-700 mb-6">
              Talk to our AI-powered mental health assistant 24/7 — safely, privately, and supportively.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <Link
                to="/login"
                className="bg-teal-500 text-white px-6 py-2 rounded-xl font-semibold text-base hover:bg-teal-600 flex items-center justify-center"
              >
                Start Chat
              </Link>
              <Link
                to="/about"
                className="bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold text-base hover:bg-blue-800 flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-3/5 flex justify-center md:justify-end items-center">
            <img
              src="/images/home.jpg"
              alt="Mental Health Assistant"
              className="w-[220px] h-[140px] sm:w-[320px] sm:h-[200px] lg:w-[400px] lg:h-[260px] rounded-xl shadow-2xl object-cover"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
          <div className="bg-white shadow-xl rounded-xl p-4 text-center h-[120px] flex flex-col justify-center">
            <div className="text-blue-700 text-3xl mb-2">💬</div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">24/7 Chat Support</h3>
            <p className="text-xs sm:text-sm text-gray-700">
              Talk to a caring bot any time, any mood.
            </p>
          </div>
          <div className="bg-white shadow-xl rounded-xl p-4 text-center h-[120px] flex flex-col justify-center">
            <div className="text-teal-500 text-3xl mb-2">📊</div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Mood Tracker</h3>
            <p className="text-xs sm:text-sm text-gray-700">
              Record how you feel, see your patterns.
            </p>
          </div>
          <div className="bg-white shadow-xl rounded-xl p-4 text-center h-[120px] flex flex-col justify-center">
            <div className="text-orange-500 text-3xl mb-2">🧘</div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Guided Exercises</h3>
            <p className="text-xs sm:text-sm text-gray-700">
              Try calming meditations & breathing.
            </p>
          </div>
          <div className="bg-white shadow-xl rounded-xl p-4 text-center h-[120px] flex flex-col justify-center">
            <div className="text-blue-900 text-3xl mb-2">🔒</div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">100% Private</h3>
            <p className="text-xs sm:text-sm text-gray-700">
              Your data is secure & confidential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;