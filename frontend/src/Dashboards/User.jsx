import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser } from "react-icons/fa";
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const User = () => {
  const [user, setUser] = useState({ userId: '', name: '' });
  const [showBot, setShowBot] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [canLogout, setCanLogout] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  // 5 minute logout timer
  useEffect(() => {
    const timer = setTimeout(() => setCanLogout(true), 5 * 60 * 1000);
    return () => clearTimeout(timer);
  }, []);

  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Button handlers
  const handleNav = (path) => navigate(path);
  const handleBot = () => setShowBot(true);
  const handleChat = () => setShowChat(true);
  const handleLogout = () => {
    if (canLogout) {
      // Clear all auth-related data
      localStorage.removeItem('token');
      // Clear any other auth-related state
      setUser({ userId: '', name: '' });
      // Redirect to login page
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col pt-0">
      {/* Animated, attractive background */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full bg-gradient-to-br from-blue-100 via-white to-teal-200">
          <div className="absolute top-0 left-0 w-80 h-80 bg-blue-200 rounded-full opacity-40 blur-2xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300 rounded-full opacity-30 blur-2xl animate-pulse" />
          <div
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200 rounded-full opacity-20 blur-3xl animate-pulse"
            style={{ transform: "translate(-50%, -50%)" }}
          />
        </div>
      </div>

      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-teal-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/80 rounded-2xl shadow-xl px-10 py-10 flex flex-col items-center"
              initial={{ scale: 0.8, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 40, opacity: 0 }}
            >
              <FaUser className="text-blue-600 text-6xl mb-4 animate-bounce" />
              <h2 className="text-2xl font-extrabold text-blue-700 mb-1 text-center drop-shadow">
                Welcome to User Dashboard
              </h2>
              <p className="text-base text-gray-700 text-center">
                You are logged in as {user.userId}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Dashboard */}
      {!showSplash && (
        <div className="px-2 sm:px-4">
          <div className="min-h-screen flex flex-col">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center px-2 sm:px-8 py-4 sm:py-6 gap-4 sm:gap-0">
              {/* Welcome */}
              <motion.div
                className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 drop-shadow text-center sm:text-left"
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                WELCOME USER <span className="text-blue-600">{user.userId}</span>
              </motion.div>
              {/* Buttons */}
              <motion.div
                className="flex flex-wrap justify-center gap-2 sm:gap-4"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                <button
                  className="bg-gradient-to-r from-pink-400 to-pink-600 text-white px-3 sm:px-4 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition text-sm sm:text-base"
                  onClick={() => window.location.href = "https://llamacoder.together.ai/share/v2/N8tyVcicmdbn1e0s"}
                >
                  Games
                </button>
                <button
                  className="bg-gradient-to-r from-green-400 to-green-600 text-white px-3 sm:px-4 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition text-sm sm:text-base"
                  onClick={() => handleNav("/exercise")}
                >
                  Exercises
                </button>
                <button
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 sm:px-4 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition text-sm sm:text-base"
                  onClick={() => handleNav("/moral")}
                >
                  Moral Stories
                </button>
                <button
                  className="bg-gradient-to-r from-blue-400 to-blue-700 text-white px-3 sm:px-4 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition text-sm sm:text-base"
                  onClick={handleBot}
                >
                  Bot
                </button>
                <button
                  className="bg-gradient-to-r from-purple-400 to-purple-700 text-white px-3 sm:px-4 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition text-sm sm:text-base"
                  onClick={handleChat}
                >
                  Chat
                </button>
                <button
                  className={`bg-gradient-to-r from-gray-400 to-gray-700 text-white px-3 sm:px-4 py-2 rounded-xl font-semibold shadow-lg transition text-sm sm:text-base ${
                    canLogout
                      ? "hover:scale-105 cursor-pointer"
                      : "opacity-60 cursor-not-allowed"
                  }`}
                  onClick={handleLogout}
                  disabled={!canLogout}
                  title={
                    canLogout
                      ? "Logout"
                      : "You can logout after 5 minutes"
                  }
                >
                  Logout
                </button>
              </motion.div>
            </div>

            {/* Center Content */}
            <div className="flex flex-col items-center flex-grow justify-center">
              <motion.h1
                className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 sm:mb-8 drop-shadow-lg text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                USER DASHBOARD
              </motion.h1>
              {/* 3D Welcoming Image */}
              <motion.img
                src="images/welcome.jpg"
                alt="Welcome User"
                className="w-[220px] sm:w-[350px] md:w-[420px] rounded-3xl shadow-2xl border-8 border-white hover:scale-105 transition duration-500 bg-white"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = "https://static.vecteezy.com/system/resources/previews/009/397/348/original/3d-illustration-of-welcome-text-on-white-background-png.png";
                }}
              />
            </div>

            {/* Bot Modal */}
            <AnimatePresence>
              {showBot && (
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="bg-white rounded-2xl shadow-2xl w-[95vw] max-w-lg h-[80vh] flex flex-col"
                    initial={{ scale: 0.9, y: 40, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 40, opacity: 0 }}
                  >
                    <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-t-2xl">
                      <h3 className="text-xl font-bold">AI Bot</h3>
                      <button
                        onClick={() => setShowBot(false)}
                        className="text-2xl font-bold hover:text-gray-200"
                      >
                        &times;
                      </button>
                    </div>
                    {/* Bot content will be handled by backend team */}
                    <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
                      Bot interface coming soon...
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Modal */}
            <AnimatePresence>
              {showChat && (
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="bg-white rounded-2xl shadow-2xl w-[95vw] max-w-lg h-[80vh] flex flex-col"
                    initial={{ scale: 0.9, y: 40, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 40, opacity: 0 }}
                  >
                    <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-t-2xl">
                      <h3 className="text-xl font-bold">Chat Room</h3>
                      <button
                        onClick={() => setShowChat(false)}
                        className="text-2xl font-bold hover:text-gray-200"
                      >
                        &times;
                      </button>
                    </div>
                    {/* Chat content will be handled by backend team */}
                    <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
                      Chat room coming soon...
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;