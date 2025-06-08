// export default Chatbot;
import React, { useState } from "react";
import { motion } from "framer-motion";

const chatbotData = {
  main: [
    { key: "welcome", label: "🌟 Welcome to HOPE I" },
    { key: "doctor", label: "👨‍⚕️ I need a doctor" },
    { key: "emergency", label: "🚨 Emergency Help" },
    { key: "express", label: "💭 Express Yourself" },
    { key: "tools", label: "🧰 Wellness Tools" },
    { key: "stories", label: "📖 Motivational Stories" },
  ],
  sub: {
    welcome: [
      {
        key: "about",
        label: "ℹ️ About HOPE I",
        reply: "HOPE I is your anonymous mental health companion, providing 24/7 support for emotional wellness, anti-depression, and suicide prevention. Your privacy and well-being are our top priorities.",
      },
      {
        key: "privacy",
        label: "🔐 Privacy & Security",
        reply: "Your conversations are completely anonymous and secure. We use end-to-end privacy protection with no data storage or personal tracking.",
      },
      {
        key: "features",
        label: "✨ Key Features",
        reply: "• Emotion Detection\n• Anonymous Chat\n• Stress Relief Tools\n• Multilingual Support\n• Doctor Appointments\n• Emergency Support\n• Journaling & Expression",
      },
    ],
    doctor: [
      {
        key: "book",
        label: "📅 Book Appointment",
        reply: "Connect with certified mental health professionals:\n• Clinical Psychologists\n• Licensed Counselors\n• Psychiatrists\n• General Health Doctors\nAll consultations are anonymous and confidential.",
      },
      {
        key: "nearby",
        label: "📍 Find Help Nearby",
        reply: "Locating mental health centers and professionals in your area...",
      },
      {
        key: "video",
        label: "🎥 Video Consultation",
        reply: "Setting up a secure, anonymous video consultation with a mental health professional...",
      },
    ],
    emergency: [
      {
        key: "helpline",
        label: "📞 Emergency Helpline",
        reply: "For immediate support, call:\n• National Crisis Hotline: 9152987821\n• Emergency Services: 112\nYou're not alone. Help is available 24/7.",
      },
      {
        key: "crisis",
        label: "🆘 Crisis Support",
        reply: "Connecting you with trained crisis counselors. Your safety is our priority. Please stay with me while we get you the help you need.",
      },
      {
        key: "volunteer",
        label: "❤️ Talk to Volunteer",
        reply: "Connecting you with a trained emotional support volunteer. They're here to listen and support you.",
      },
    ],
    express: [
      {
        key: "journal",
        label: "📝 Journal Your Thoughts",
        reply: "Express yourself freely in your private journal. Your thoughts are safe here.",
      },
      {
        key: "art",
        label: "🎨 Art Therapy",
        reply: "Try our color therapy and expression tools to help process your emotions.",
      },
      {
        key: "chat",
        label: "💬 Talk to HOPE I",
        reply: "I'm here to listen. Share what's on your mind, and I'll respond with care and understanding.",
      },
    ],
    tools: [
      {
        key: "breathe",
        label: "🫁 Breathing Exercise",
        reply: "Let's practice 4-7-8 breathing:\nInhale for 4 seconds\nHold for 7 seconds\nExhale for 8 seconds\nRepeat 4 times.",
      },
      {
        key: "meditate",
        label: "🧘 Guided Meditation",
        reply: "Find a quiet space. Close your eyes. Let's begin a calming meditation session...",
      },
      {
        key: "games",
        label: "🎮 Stress Relief Games",
        reply: "Choose from our collection of mental wellness games designed to help you relax and refocus.",
      },
    ],
    stories: [
      {
        key: "motiv",
        label: "💪 Motivational",
        reply: "Remember: Every step forward, no matter how small, is progress. Your strength is greater than you know.",
      },
      {
        key: "peace",
        label: "🕊️ Peaceful",
        reply: "In this moment, you are safe. You are valued. You are not alone in your journey.",
      },
      {
        key: "hope",
        label: "✨ Stories of Hope",
        reply: "Would you like to hear an inspiring story of resilience and recovery?",
      },
    ],
  },
};

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there 👋, how can I support you today?" },
  ]);
  const [step, setStep] = useState("main");
  const [selectedMain, setSelectedMain] = useState(null);

  const handleMainClick = (key) => {
    const label = chatbotData.main.find((m) => m.key === key)?.label;
    setMessages((prev) => [...prev, { from: "user", text: label }]);
    
    if (key === "games") {
      window.open("https://llamacoder.together.ai/share/v2/N8tyVcicmdbn1e0s", "_blank");
      return;
    }
    
    setSelectedMain(key);
    setStep("sub");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Choose an option below:" },
      ]);
    }, 600);
  };

  const handleSubClick = (item) => {
    setMessages((prev) => [
      ...prev,
      { from: "user", text: item.label },
      { from: "bot", text: item.reply },
    ]);
    setStep("main");
    setSelectedMain(null);
  };

  const optionsToShow =
    step === "main" ? chatbotData.main : chatbotData.sub[selectedMain];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl border-4 border-indigo-200/50 shadow-2xl overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b-2 border-indigo-200/50 bg-white/80 backdrop-blur-sm shadow-sm rounded-t-2xl">
        <div className="flex items-center space-x-2">
          <motion.div 
            className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg border-2 border-white/50"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-white text-xl">🤖</span>
          </motion.div>
          <h2 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">HOPE-I Chatbot</h2>
        </div>
        <motion.button
          onClick={onClose}
          className="text-xl text-gray-600 hover:text-red-500 rounded-full p-1 hover:bg-red-50 transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close chatbot"
        >
          &times;
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <motion.div
              className={`max-w-[80%] p-3 rounded-3xl shadow-lg border-2 ${
                msg.from === "user"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-tr-none border-indigo-400/30"
                  : "bg-white/90 backdrop-blur-sm rounded-tl-none border-indigo-100/50"
              }`}
              whileHover={{ scale: 1.02, rotateX: 5 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {msg.text}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 border-t-2 border-indigo-200/50 bg-white/80 backdrop-blur-sm grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-b-2xl">
        {optionsToShow.map((opt) => (
          <motion.button
            key={opt.key}
            onClick={() =>
              step === "main" ? handleMainClick(opt.key) : handleSubClick(opt)
            }
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2.5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-indigo-400/50 text-sm font-medium"
          >
            {opt.label}
          </motion.button>
        ))}
      </div>

      <style>
        {`
          .chat-container {
            perspective: 1000px;
          }
          .message-bubble {
            transform-style: preserve-3d;
            transition: transform 0.3s ease;
          }
          .message-bubble:hover {
            transform: translateZ(10px);
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0px); }
          }
          .bot-avatar {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Chatbot;
