import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaBook, FaLeaf, FaSmile, FaHandsHelping } from 'react-icons/fa';

const About = () => {
  return (
    <div className="mt-20 px-4">
      <div className="bg-white min-h-screen p-8 text-gray-900">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-extrabold mb-4">About Us</h1>
            <p className="text-xl font-light">
              Welcome to <span className="font-semibold text-indigo-500">Hope-i</span> – your compassionate companion on the journey to better mental health.
            </p>
          </motion.div>

          {/* Icon Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12"
          >
            <div className="flex flex-col items-center">
              <FaBrain className="text-indigo-500 w-12 h-12 mb-2" />
              <p className="text-lg font-medium text-center">AI-Powered Conversations</p>
            </div>
            <div className="flex flex-col items-center">
              <FaBook className="text-green-500 w-12 h-12 mb-2" />
              <p className="text-lg font-medium text-center">Mood Tracking & Journaling</p>
            </div>
            <div className="flex flex-col items-center">
              <FaLeaf className="text-blue-500 w-12 h-12 mb-2" />
              <p className="text-lg font-medium text-center">Relaxation Techniques</p>
            </div>
            <div className="flex flex-col items-center">
              <FaSmile className="text-yellow-500 w-12 h-12 mb-2" />
              <p className="text-lg font-medium text-center">Positive Affirmations</p>
            </div>
            <div className="flex flex-col items-center">
              <FaHandsHelping className="text-red-500 w-12 h-12 mb-2" />
              <p className="text-lg font-medium text-center">Crisis Guidance</p>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-100 rounded-3xl shadow-lg p-8 mb-12"
          >
            <p className="text-lg mb-6 bg-indigo-100 p-4 rounded-lg">
              Hope-i is an AI-powered mental health chatbot designed to provide support, guidance, and a safe space for anyone facing emotional challenges. Whether you're dealing with stress, anxiety, loneliness, or simply need someone to talk to, Hope-i is here 24/7 to listen, understand, and respond with empathy.
            </p>
            <p className="text-lg mb-6">
              Developed with a deep commitment to mental well-being, Hope-i offers:
            </p>
            <ul className="space-y-6 mb-6">
              <li className="flex items-center">
                <span className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">1</span>
                <span className="text-lg font-medium">Emotionally intelligent conversations</span>
              </li>
              <li className="flex items-center">
                <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">2</span>
                <span className="text-lg font-medium">Mood tracking and journaling tools</span>
              </li>
              <li className="flex items-center">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">3</span>
                <span className="text-lg font-medium">Breathing exercises and relaxation techniques</span>
              </li>
              <li className="flex items-center">
                <span className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">4</span>
                <span className="text-lg font-medium">Motivational stories and positive affirmations</span>
              </li>
              <li className="flex items-center">
                <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">5</span>
                <span className="text-lg font-medium">Crisis guidance with referral support</span>
              </li>
            </ul>
            <p className="text-lg mb-6">
              Hope-i doesn’t replace professional care, but it acts as a bridge — helping users build self-awareness and encouraging them to seek help when needed. We believe mental health care should be accessible, non-judgmental, and always available — and that's exactly what Hope-i strives to offer.
            </p>
            <p className="text-lg">
              You are not alone. With Hope-i, hope is always within reach.
            </p>
          </motion.div>

          {/* Footer Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-lg">© 2025 Hope-i. All rights reserved.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;


