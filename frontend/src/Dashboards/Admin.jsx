import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../config/api';
import axios from 'axios';

const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <motion.div
      className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-200 opacity-60 blur-2xl"
      animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
      transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
    />
    <motion.div
      className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-teal-200 opacity-50 blur-2xl"
      animate={{ x: [0, -80, 0], y: [0, -60, 0] }}
      transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
    />
    <motion.div
      className="absolute top-[30%] left-[60%] w-[250px] h-[250px] rounded-full bg-purple-200 opacity-40 blur-2xl"
      animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
      transition={{ duration: 14, repeat: Infinity, repeatType: "reverse" }}
    />
  </div>
);

const Admin = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [admin, setAdmin] = useState({ name: "AdminName" }); // Replace with real admin name
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [selection, setSelection] = useState("doctors"); // "doctors" or "users"
  const [viewDetails, setViewDetails] = useState(null); // {type, data}
  const navigate = useNavigate();

  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch admin info on mount
  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        // Fetch admin info
        const adminRes = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (adminRes.data && adminRes.data.user) {
          setAdmin({ name: adminRes.data.user.name });
        }
      } catch (error) {
        // Optionally handle error
      }
    };
    fetchAdminInfo();
    fetchDoctors(); // Fetch doctors by default on mount
  }, []);

  // Fetch doctors
  const fetchDoctors = async () => {
    const token = localStorage.getItem('token');
    const doctorsRes = await axios.get(`${API_BASE_URL}/admin/doctors`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setDoctors(doctorsRes.data);
  };

  // Fetch users
  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    const usersRes = await axios.get(`${API_BASE_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(usersRes.data);
  };

  // Fetch messages when a chat is selected
  useEffect(() => {
    if (selectedChat) {
      setMessages([
        { from: "admin", text: "Hello!", time: "10:00" },
        { from: selectedChat.type, text: "Hi Admin!", time: "10:01" },
      ]);
    }
  }, [selectedChat]);

  // Handle sending a message in a chat
  const handleSend = () => {
    if (!chatInput.trim() || !selectedChat) return;
    setMessages((prev) => [
      ...prev,
      { from: "admin", text: chatInput, time: new Date().toLocaleTimeString().slice(0, 5) },
    ]);
    setChatInput("");
    // POST to backend here
  };

  const handleDeleteUser = (userId) => {
    // Call backend API to delete user
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    setContacts((prev) => prev.filter((c) => !(c.type === "user" && c.id === userId)));
    setViewDetails(null);
  };

  const handleLogout = () => {
    // Add any logout logic if needed
    navigate("/login");
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <AnimatedBackground />

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
              <motion.img
                src="/images/admin.jpg"
                alt="Admin Splash"
                className="w-28 h-28 mb-4 rounded-xl shadow"
                initial={{ scale: 0.7 }}
                animate={{ scale: 1.1 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1.2,
                }}
              />
              <h2 className="text-2xl font-extrabold text-blue-700 mb-1 text-center drop-shadow">
                Welcome to Admin Dashboard
              </h2>
              <p className="text-base text-gray-700 text-center">
                You are logged into admin's dashboard
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome message at top left */}
      {!showSplash && (
        <div className="w-full flex justify-start pl-6 pt-4">
          <span className="text-lg font-bold text-blue-800 animate-pulse">
            Welcome Admin {admin.name}
          </span>
        </div>
      )}

      {/* Logout Button */}
      {!showSplash && (
        <div className="w-full flex justify-end mb-2 pr-4">
          <button
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-xl font-semibold shadow hover:scale-105 transition"
            onClick={handleLogout}
            title="Logout"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}

      {/* Selection Bar */}
      {!showSplash && (
        <div className="w-full max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-4 mb-2 px-2">
          <button
            className={`px-6 py-2 rounded-full font-bold shadow transition ${
              selection === "doctors"
                ? "bg-blue-600 text-white scale-105"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
            onClick={() => {
              setSelection("doctors");
              fetchDoctors();
            }}
          >
            Doctors
          </button>
          <button
            className={`px-6 py-2 rounded-full font-bold shadow transition ${
              selection === "users"
                ? "bg-green-600 text-white scale-105"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
            onClick={() => {
              setSelection("users");
              fetchUsers();
            }}
          >
            Users
          </button>
        </div>
      )}

      {/* Main Dashboard */}
      {!showSplash && (
        <div className="flex flex-1 h-[80vh] w-full max-w-6xl mx-auto rounded-2xl shadow-2xl overflow-hidden bg-white flex-col sm:flex-row">
          {/* Sidebar */}
          <motion.div
            className="w-full sm:w-72 bg-gradient-to-b from-blue-100 to-blue-50 border-b-2 sm:border-b-0 sm:border-r-2 border-blue-200 p-3 flex flex-col"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <h2 className="text-lg font-bold text-blue-700 mb-2 text-center">
              {selection === "doctors" ? "Doctors" : "Users"}
            </h2>
            <div className="flex-1 overflow-y-auto space-y-2">
              {(selection === "doctors" ? doctors : users).map((person) => (
                <motion.div
                  key={person.id || person.userId}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between rounded-lg p-2 cursor-pointer transition ${
                    selectedChat && selectedChat.id === (person.id || person.userId) && selectedChat.type === person.type
                      ? "bg-blue-200 scale-105"
                      : "hover:bg-blue-100"
                  }`}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="flex-1">
                    <div className={`font-semibold ${person.type === "doctor" ? "text-blue-900" : "text-green-900"}`}>
                      {person.name}
                    </div>
                    <div className="text-xs text-gray-500">User ID: {person.userId || person.id}</div>
                    <div className="text-xs text-gray-500">Email: {person.email}</div>
                    <div className="text-xs text-gray-500">Phone: {person.phoneNumber}</div>
                  </div>
                  <div className="flex flex-col gap-1 items-end mt-2 sm:mt-0">
                    <button
                      className="text-xs px-2 py-0.5 rounded bg-blue-500 text-white font-bold shadow hover:bg-blue-700 mb-1"
                      onClick={() => setViewDetails({ type: person.type, data: person })}
                    >
                      View Details
                    </button>
                    <button
                      className="text-xs px-2 py-0.5 rounded bg-purple-500 text-white font-bold shadow hover:bg-purple-700"
                      onClick={() => setSelectedChat(person)}
                    >
                      Chat
                    </button>
                    {selection === "users" && (
                      <button
                        className="text-xs px-2 py-0.5 rounded bg-red-500 text-white font-bold shadow hover:bg-red-700 mt-1"
                        onClick={() => handleDeleteUser(person.id || person.userId)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-shrink-0 border-b px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col sm:flex-row items-center justify-between gap-2">
              <motion.h1
                className="text-xl md:text-2xl font-extrabold text-blue-900 drop-shadow-lg m-0"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                ADMIN DASHBOARD
              </motion.h1>
              {selectedChat && (
                <div className="flex items-center gap-2">
                  <span className="font-bold">{selectedChat.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${selectedChat.type === "doctor" ? "bg-blue-300 text-blue-900" : "bg-green-300 text-green-900"}`}>
                    {selectedChat.type === "doctor" ? "Doctor" : "User"}
                  </span>
                  <button
                    className="ml-2 text-lg text-gray-400 hover:text-red-500 font-bold"
                    onClick={() => setSelectedChat(null)}
                    title="Close Chat"
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
            {/* Chat Window */}
            <div className="flex-1 flex flex-col justify-end bg-gradient-to-br from-white via-blue-50 to-teal-50 px-2 sm:px-6 py-2 sm:py-4 overflow-y-auto">
              {selectedChat ? (
                <div className="flex flex-col gap-2">
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      className={`max-w-[90%] sm:max-w-[70%] px-3 sm:px-4 py-2 rounded-2xl shadow-md ${
                        msg.from === "admin"
                          ? "bg-blue-200 self-end text-right"
                          : "bg-gray-100 self-start text-left"
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className="text-sm">{msg.text}</div>
                      <div className="text-xs text-gray-500 mt-1">{msg.time}</div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">
                  Select a contact to start chat.
                </div>
              )}
            </div>
            {/* Chat Input */}
            {selectedChat && (
              <div className="px-2 sm:px-6 py-2 sm:py-3 border-t bg-white flex items-center">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 sm:px-4 py-2 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 shadow"
                  onKeyDown={e => e.key === "Enter" && handleSend()}
                />
                <motion.button
                  className="ml-2 sm:ml-3 px-4 sm:px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition"
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSend}
                >
                  Send
                </motion.button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Details Modal */}
      <AnimatePresence>
        {viewDetails && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-[98vw] max-w-md p-4 sm:p-6 flex flex-col"
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-blue-700">
                  {viewDetails.type === "doctor" ? "Doctor Details" : "User Details"}
                </h3>
                <button
                  onClick={() => setViewDetails(null)}
                  className="text-2xl font-bold text-gray-400 hover:text-red-500"
                >
                  &times;
                </button>
              </div>
              <div className="space-y-2 text-sm sm:text-base">
                <div><span className="font-bold">Name:</span> {viewDetails.data.name}</div>
                <div><span className="font-bold">Email:</span> {viewDetails.data.email}</div>
                <div><span className="font-bold">Phone:</span> {viewDetails.data.phone}</div>
                {viewDetails.type === "doctor" && (
                  <div><span className="font-bold">Specialization:</span> {viewDetails.data.specialization}</div>
                )}
                {viewDetails.type === "user" && (
                  <div><span className="font-bold">Age:</span> {viewDetails.data.age}</div>
                )}
              </div>
              {viewDetails.type === "user" && (
                <button
                  className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg font-bold shadow hover:bg-red-700"
                  onClick={() => handleDeleteUser(viewDetails.data.id)}
                >
                  Delete User
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;

