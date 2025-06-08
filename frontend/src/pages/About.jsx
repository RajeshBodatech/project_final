import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBrain, FaBook, FaLeaf, FaSmile, FaHandsHelping, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4"
    >
      <motion.div
        onClick={onClick}
        className="relative bg-gradient-to-r from-white to-indigo-50 rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 border border-indigo-100"
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          borderColor: "rgb(99, 102, 241)"
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-xl opacity-0 transition-opacity duration-300 hover:opacity-100" />
        <div className="relative z-10">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{question}</h3>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
            >
              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </motion.div>
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 text-gray-600 leading-relaxed bg-white/50 p-4 rounded-lg border border-indigo-100">
                  {answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "❓ What is HOPE I?",
      answer: "HOPE I is an AI-powered chatbot focused on suicide prevention, emotional wellness, and mental health. It provides anonymous, judgment-free, 24x7 support through smart AI conversations, tools, and access to real mental health professionals."
    },
    {
      question: "❓ Who can use HOPE I?",
      answer: "Anyone in emotional distress can use HOPE I. It's specially designed for students coping with exams and anxiety, working professionals facing burnout, parents managing loneliness, frontliners dealing with trauma, and anyone feeling emotionally overwhelmed."
    },
    {
      question: "❓ Is HOPE I really anonymous?",
      answer: "Yes. HOPE I assigns a unique user ID and does not ask for your name or personal information. No data is stored, ensuring complete privacy and anonymity."
    },
    {
      question: "❓ What kind of support does HOPE I offer?",
      answer: "HOPE I offers emotion detection, smart AI chat, stress-relief games, motivational stories in multiple languages, journaling tools, anonymous doctor appointments, and emergency escalation to mental health experts."
    },
    {
      question: "❓ How does HOPE I detect distress or suicidal thoughts?",
      answer: "The bot uses emotion and sentiment detection algorithms to analyze your messages. If it detects signs of severe distress or suicidal intent, it immediately connects you to certified mental health professionals."
    },
    {
      question: "❓ What professionals are available through HOPE I?",
      answer: "HOPE I provides access to certified clinical psychologists, licensed counselors, psychiatrists, and general physicians. All operate confidentially and are booked anonymously via the bot."
    },
    {
      question: "❓ What languages does HOPE I support?",
      answer: "HOPE I currently supports English, Hindi, and Telugu, with plans to add more Indian languages in future updates."
    },
    {
      question: "❓ Can I get a summary of my chat?",
      answer: "Yes. HOPE I allows users to download a session report of their chat and activities — all while keeping identities anonymous."
    },
    {
      question: "❓ Why should I trust HOPE I?",
      answer: "HOPE I is available 24x7, keeps you completely anonymous, provides access to certified doctors, offers interactive tools to express and heal, and is designed with compassion, privacy, and care in mind."
    },
    {
      question: "❓ Is HOPE I a replacement for therapy or emergency services?",
      answer: "No. HOPE I provides immediate emotional support and connects you to professionals. But in extreme emergencies, always seek immediate help from local emergency services or suicide prevention helplines."
    }
  ];

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
              Hope-i doesn't replace professional care, but it acts as a bridge — helping users build self-awareness and encouraging them to seek help when needed. We believe mental health care should be accessible, non-judgmental, and always available — and that's exactly what Hope-i strives to offer.
            </p>
            <p className="text-lg">
              You are not alone. With Hope-i, hope is always within reach.
            </p>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-purple-50/50 rounded-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-100/30 via-transparent to-transparent" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
              <div className="max-w-4xl mx-auto p-6">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFAQ === index}
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  />
                ))}
              </div>
            </div>
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


