import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserMd, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Doctor = () => {
  const [doctor, setDoctor] = useState({ name: '', email: '' });
  const [requests, setRequests] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch doctor info and requests on mount
  useEffect(() => {
    // Example: fetch('/api/doctor/me').then(...)
    // Example: fetch('/api/doctor/requests').then(...)
    // Set doctor and requests from backend
  }, []);

  // Fetch messages when a user is selected
  useEffect(() => {
    if (selectedUser) {
      // Example: fetch(`/api/chats/${selectedUser.id}/messages`).then(...)
      // Set messages from backend
    }
  }, [selectedUser]);

  const handleSend = () => {
    if (!chatInput.trim() || !selectedUser) return;
    setMessages(prev => [
      ...prev,
      { from: 'doctor', text: chatInput, time: new Date().toLocaleTimeString().slice(0, 5) }
    ]);
    setChatInput('');
  };

  const handleLogout = () => {
    // Add any logout logic if needed
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-100 flex flex-col items-center justify-center px-0 py-0">
      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-blue-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl px-8 py-8 flex flex-col items-center"
              initial={{ scale: 0.8, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 40, opacity: 0 }}
            >
              <FaUserMd className="text-blue-600 text-6xl mb-4 animate-bounce" />
              <h2 className="text-2xl font-extrabold text-blue-700 mb-1 text-center drop-shadow">
                Welcome to Doctor Dashboard
              </h2>
              <p className="text-base text-gray-700 text-center">
                You are logged into doctor's dashboard
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Dashboard */}
      {!showSplash && (
        <React.Fragment>
          {/* Heading and Logout Button in a responsive row */}
          <div className="w-full flex flex-col sm:flex-row sm:items-center items-center justify-between mb-2 mt-0">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 drop-shadow-lg sm:text-center text-center m-0"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              DOCTOR DASHBOARD
            </motion.h1>
            <button
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-xl font-semibold shadow hover:scale-105 transition mt-2 sm:mt-0 sm:mr-4"
              onClick={handleLogout}
              title="Logout"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
          <motion.h2
            className="text-base sm:text-lg md:text-xl font-bold text-gray-700 mb-8 text-center m-0"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            WELCOME DOCTOR <span className="text-blue-700">{doctor.name || '...'}</span>
          </motion.h2>
          <motion.div
            className="w-full max-w-6xl h-[70vh] bg-white/80 rounded-3xl shadow-2xl flex flex-col sm:flex-row overflow-hidden border-4 border-blue-100"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Requests/Chat History Sidebar */}
            <motion.div
              className="w-full sm:w-72 bg-gradient-to-b from-blue-100 to-blue-50 border-b-2 sm:border-b-0 sm:border-r-2 border-blue-200 p-4 flex flex-col"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-bold text-blue-800 mb-4 text-center sm:text-left">Chat Requests</h3>
              <div className="flex-1 overflow-y-auto space-y-3">
                {requests.length === 0 && (
                  <div className="text-gray-400 text-center mt-8">No requests yet.</div>
                )}
                {requests.map((req) => (
                  <motion.div
                    key={req.id}
                    className={`rounded-xl p-3 cursor-pointer shadow-md flex items-center gap-3 transition-all duration-200 ${
                      selectedUser && selectedUser.id === req.id
                        ? 'bg-blue-200 scale-105 border-l-4 border-blue-600'
                        : 'bg-white hover:bg-blue-100'
                    }`}
                    whileHover={{ scale: 1.04 }}
                    onClick={() => setSelectedUser(req)}
                  >
                    <FaUserCircle className="text-blue-500 text-2xl" />
                    <div>
                      <div className="font-semibold text-blue-900">{req.username}</div>
                      <div className="text-xs text-gray-500">{req.date} • {req.duration}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Chat & Info Section */}
            <div className="flex-1 flex flex-col justify-between">
              {/* Chat Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 border-b border-blue-100 bg-white/70 gap-2">
                {selectedUser ? (
                  <div className="flex items-center gap-3">
                    <FaUserCircle className="text-blue-400 text-3xl" />
                    <div>
                      <div className="font-bold text-lg text-blue-900">{selectedUser.username}</div>
                      <div className="text-xs text-gray-500">{selectedUser.email}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400">Select a user to chat</div>
                )}
                {/* Placeholders for call buttons */}
                <div className="flex gap-4">
                  <motion.button
                    className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    whileTap={{ scale: 0.95 }}
                    title="Voice Call"
                    disabled={!selectedUser}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A2 2 0 0021 6.382V5a2 2 0 00-2-2H5a2 2 0 00-2 2v1.382a2 2 0 00.447 1.342L8 10m7 0v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m7 0l-7 4"></path></svg>
                  </motion.button>
                  <motion.button
                    className="bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full shadow-lg transition"
                    whileHover={{ scale: 1.15, rotate: -10 }}
                    whileTap={{ scale: 0.95 }}
                    title="Video Call"
                    disabled={!selectedUser}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A2 2 0 0021 6.382V5a2 2 0 00-2-2H5a2 2 0 00-2-2v1.382a2 2 0 00.447 1.342L8 10m7 0v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m7 0l-7 4"></path></svg>
                  </motion.button>
                </div>
              </div>
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-4 bg-gradient-to-br from-white via-blue-50 to-teal-50">
                <div className="flex flex-col gap-3">
                  {selectedUser && messages.length > 0 ? (
                    messages.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        className={`max-w-[90%] sm:max-w-[70%] px-3 sm:px-4 py-2 rounded-2xl shadow-md ${
                          msg.from === 'doctor'
                            ? 'bg-blue-200 self-end text-right'
                            : 'bg-gray-100 self-start text-left'
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <div className="text-sm">{msg.text}</div>
                        <div className="text-xs text-gray-500 mt-1">{msg.time}</div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-gray-400 text-center mt-10">
                      {selectedUser ? "No messages yet." : "Select a user to start chat."}
                    </div>
                  )}
                </div>
              </div>
              {/* Chat Input */}
              <div className="px-4 sm:px-8 py-4 bg-white/70 border-t border-blue-100 flex items-center gap-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 sm:px-4 py-2 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 shadow"
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  disabled={!selectedUser}
                />
                <motion.button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-xl font-bold shadow-lg transition"
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSend}
                  disabled={!selectedUser}
                >
                  Send
                </motion.button>
              </div>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Doctor;