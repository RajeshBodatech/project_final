// export default Chatbot;
import React, { useState } from "react";
import { motion } from "framer-motion";

const chatbotData = {
  main: [
    { key: "doctor", label: "👩‍⚕️ I need a doctor" },
    { key: "call", label: "�� Call for help" },
    { key: "games", label: "🎮 Play Games", reply: "https://llamacoder.together.ai/share/v2/N8tyVcicmdbn1e0s" },
  ],
  sub: {
    calm: [
      {
        key: "breathe",
        label: "🫁 Breathing Exercise",
        reply: "Let's try 4-7-8 breathing: Inhale 4s, hold 7s, exhale 8s.",
      },
      {
        key: "meditate",
        label: "🧘 Guided Meditation",
        reply: "Here's a quick meditation: Close your eyes... relax your shoulders...",
      },
      {
        key: "music",
        label: "🎵 Calming Music",
        reply: "Play soft ambient sounds or peaceful music. 🎧",
      },
    ],
    talk: [
      {
        key: "anxious",
        label: "😰 I'm anxious",
        reply: "Anxiety can feel overwhelming. Want to try a grounding exercise?",
      },
      {
        key: "sad",
        label: "😢 I'm sad",
        reply: "I'm really sorry you're feeling this way. You're not alone. ❤️",
      },
      {
        key: "angry",
        label: "😡 I'm angry",
        reply: "Anger is valid. Want to try a cooling down technique?",
      },
    ],
    doctor: [
      {
        key: "book",
        label: "📅 Book Appointment",
        reply: "Booking a doctor... Please wait, redirecting to available professionals.",
      },
      {
        key: "nearby",
        label: "📍 Nearest Hospital",
        reply: "Fetching nearest mental health centers near you...",
      },
      {
        key: "video",
        label: "🎥 Video Consultation",
        reply: "Initiating secure video call setup with a doctor...",
      },
    ],
    call: [
      {
        key: "helpline",
        label: "📞 Helpline Number",
        reply: "Please call 📱 9152987821 or 112 for immediate help.",
      },
      {
        key: "family",
        label: "👪 Call Family/Friend",
        reply: "Consider talking to someone you trust. Shall I send a reminder?",
      },
      {
        key: "volunteer",
        label: "❤️ Talk to Volunteer",
        reply: "Connecting you with an emotional support volunteer...",
      },
    ],
    quote: [
      {
        key: "motiv",
        label: "💪 Motivational",
        reply: "You have survived 100% of your worst days.",
      },
      {
        key: "peace",
        label: "🕊️ Peaceful",
        reply: "Peace begins with a smile. — Mother Teresa",
      },
      {
        key: "funny",
        label: "😂 Funny",
        reply: "I'm not lazy, I'm just on energy-saving mode. 😄",
      },
    ],
    track: [
      {
        key: "checkin",
        label: "📊 Daily Mood Check-in",
        reply: "Please rate your current mood on a scale of 1-10.",
      },
      {
        key: "progress",
        label: "📈 View My Progress",
        reply: "Here's your mood tracking chart over the last week. 📊",
      },
    ],
    journal: [
      {
        key: "entry",
        label: "📝 Write Journal Entry",
        reply: "You can now write about your thoughts and feelings here.",
      },
      {
        key: "read",
        label: "📖 Read Past Entries",
        reply: "Fetching your secure journal history...",
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
