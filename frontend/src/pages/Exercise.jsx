import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Exercise = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [timePeriod, setTimePeriod] = useState(2);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isInhale, setIsInhale] = useState(true);
  const [eyePosition, setEyePosition] = useState(0);

  const navigate = useNavigate();

  const exercises = [
    {
      id: 1,
      name: "Basic Breathing",
      description: "Simple inhale and exhale exercise",
      animation: "circle"
    },
    {
      id: 2,
      name: "Sleeping Position",
      description: "Breathing exercise in sleeping position",
      animation: "wave"
    },
    {
      id: 3,
      name: "Meditation Breathing",
      description: "Tension-free meditation breathing",
      animation: "pulse"
    },
    {
      id: 4,
      name: "Eye Exercise",
      description: "Eye movement and relaxation",
      animation: "eye"
    }
  ];

  const timeOptions = [2, 3, 5, 10];

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setIsInhale((prev) => !prev);
        if (selectedExercise === 4) {
          setEyePosition((prev) => (prev + 1) % 8);
        }
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false); // Timer finished, allow back button
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, selectedExercise]);

  const startExercise = (exerciseId) => {
    setSelectedExercise(exerciseId);
    setTimeLeft(timePeriod * 60);
    setIsActive(true);
    setIsInhale(true);
    setEyePosition(0);
  };

  const closeModal = () => {
    setSelectedExercise(null);
    setTimeLeft(0);
    setIsActive(false);
    setIsInhale(true);
    setEyePosition(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // SVG components (unchanged)
  const SleepingPerson = () => (
    <svg width="200" height="200" viewBox="0 0 200 200" className="absolute inset-0">
      {/* Bed */}
      <motion.rect
        x="20"
        y="120"
        width="160"
        height="40"
        rx="10"
        fill="#8B4513"
        animate={{
          y: isInhale ? 115 : 120,
          rotate: isInhale ? 2 : -2
        }}
        transition={{ duration: 4 }}
      />
      {/* Pillow */}
      <motion.rect
        x="30"
        y="100"
        width="40"
        height="20"
        rx="5"
        fill="#F5F5DC"
        animate={{
          y: isInhale ? 95 : 100,
          rotate: isInhale ? 3 : -3
        }}
        transition={{ duration: 4 }}
      />
      {/* Person */}
      <motion.g
        animate={{
          y: isInhale ? -5 : 0,
          rotate: isInhale ? 2 : -2
        }}
        transition={{ duration: 4 }}
      >
        {/* Head */}
        <circle cx="50" cy="80" r="15" fill="#FFD700" />
        {/* Body */}
        <rect x="35" y="95" width="30" height="40" fill="#4169E1" />
        {/* Arms */}
        <motion.line
          x1="35"
          y1="105"
          x2="20"
          y2="115"
          stroke="#4169E1"
          strokeWidth="8"
          animate={{
            rotate: isInhale ? 5 : -5,
            transformOrigin: "35 105"
          }}
          transition={{ duration: 4 }}
        />
        <motion.line
          x1="65"
          y1="105"
          x2="80"
          y2="115"
          stroke="#4169E1"
          strokeWidth="8"
          animate={{
            rotate: isInhale ? -5 : 5,
            transformOrigin: "65 105"
          }}
          transition={{ duration: 4 }}
        />
        {/* Legs */}
        <motion.line
          x1="45"
          y1="135"
          x2="35"
          y2="150"
          stroke="#4169E1"
          strokeWidth="8"
          animate={{
            rotate: isInhale ? -3 : 3,
            transformOrigin: "45 135"
          }}
          transition={{ duration: 4 }}
        />
        <motion.line
          x1="55"
          y1="135"
          x2="65"
          y2="150"
          stroke="#4169E1"
          strokeWidth="8"
          animate={{
            rotate: isInhale ? 3 : -3,
            transformOrigin: "55 135"
          }}
          transition={{ duration: 4 }}
        />
        {/* Z's for sleeping */}
        <motion.text
          x="70"
          y="75"
          fill="#FF4500"
          fontSize="20"
          fontWeight="bold"
          animate={{
            opacity: isInhale ? 1 : 0.5,
            y: isInhale ? 70 : 75
          }}
          transition={{ duration: 4 }}
        >
          Zzz...
        </motion.text>
      </motion.g>
    </svg>
  );

  const MeditationPerson = () => (
    <svg width="200" height="200" viewBox="0 0 200 200" className="absolute inset-0">
      {/* Meditation circle */}
      <motion.circle
        cx="100"
        cy="100"
        r="60"
        fill="none"
        stroke="#9370DB"
        strokeWidth="2"
        animate={{
          scale: isInhale ? 1.1 : 0.9,
          opacity: isInhale ? 0.8 : 0.5
        }}
        transition={{ duration: 4 }}
      />
      {/* Person sitting */}
      <motion.g
        animate={{
          y: isInhale ? -2 : 2,
          scale: isInhale ? 1.02 : 0.98
        }}
        transition={{ duration: 4 }}
      >
        {/* Head */}
        <circle cx="100" cy="70" r="15" fill="#FFD700" />
        {/* Body */}
        <rect x="85" y="85" width="30" height="40" fill="#9370DB" />
        {/* Arms */}
        <motion.line
          x1="85"
          y1="95"
          x2="70"
          y2="105"
          stroke="#9370DB"
          strokeWidth="8"
          animate={{
            rotate: isInhale ? -5 : 5,
            transformOrigin: "85 95"
          }}
          transition={{ duration: 4 }}
        />
        <motion.line
          x1="115"
          y1="95"
          x2="130"
          y2="105"
          stroke="#9370DB"
          strokeWidth="8"
          animate={{
            rotate: isInhale ? 5 : -5,
            transformOrigin: "115 95"
          }}
          transition={{ duration: 4 }}
        />
        {/* Legs crossed */}
        <motion.path
          d="M 95 125 Q 85 135 95 145"
          fill="none"
          stroke="#9370DB"
          strokeWidth="8"
          animate={{
            rotate: isInhale ? -2 : 2,
            transformOrigin: "95 125"
          }}
          transition={{ duration: 4 }}
        />
        <motion.path
          d="M 105 125 Q 115 135 105 145"
          fill="none"
          stroke="#9370DB"
          strokeWidth="8"
          animate={{
            rotate: isInhale ? 2 : -2,
            transformOrigin: "105 125"
          }}
          transition={{ duration: 4 }}
        />
        {/* Meditation aura */}
        <motion.circle
          cx="100"
          cy="60"
          r="25"
          fill="none"
          stroke="#9370DB"
          strokeWidth="2"
          strokeDasharray="5,5"
          animate={{
            scale: isInhale ? 1.2 : 0.8,
            opacity: isInhale ? 0.8 : 0.4,
            rotate: isInhale ? 360 : 0
          }}
          transition={{ duration: 4 }}
        />
      </motion.g>
    </svg>
  );

  const renderAnimation = (exerciseId) => {
    switch (exerciseId) {
      case 1:
        return (
          <div className="relative w-48 h-48 sm:w-64 sm:h-64">
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-500"
              animate={{
                scale: isInhale ? 1.5 : 1,
                opacity: isInhale ? 0.8 : 0.5
              }}
              transition={{ duration: 4 }}
            />
            <motion.div
              className="absolute inset-4 rounded-full bg-blue-400"
              animate={{
                scale: isInhale ? 1.3 : 0.9,
                opacity: isInhale ? 0.9 : 0.6
              }}
              transition={{ duration: 4 }}
            />
            <motion.div
              className="absolute inset-8 rounded-full bg-blue-300"
              animate={{
                scale: isInhale ? 1.1 : 0.8,
                opacity: isInhale ? 1 : 0.7
              }}
              transition={{ duration: 4 }}
            />
          </div>
        );
      case 2:
        return (
          <div className="relative w-48 h-48 sm:w-64 sm:h-64">
            <SleepingPerson />
          </div>
        );
      case 3:
        return (
          <div className="relative w-48 h-48 sm:w-64 sm:h-64">
            <MeditationPerson />
          </div>
        );
      case 4:
        return (
          <div className="relative w-48 h-48 sm:w-64 sm:h-64">
            <motion.div
              className="absolute inset-0 flex items-center justify-center space-x-4 sm:space-x-8"
            >
              {/* Left Eye */}
              <motion.div
                className="w-14 h-14 sm:w-20 sm:h-20 bg-white rounded-full border-4 border-blue-500 relative"
                animate={{
                  rotate: eyePosition === 0 ? 0 : 
                         eyePosition === 1 ? 45 :
                         eyePosition === 2 ? 90 :
                         eyePosition === 3 ? 135 :
                         eyePosition === 4 ? 180 :
                         eyePosition === 5 ? 225 :
                         eyePosition === 6 ? 270 :
                         315
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute w-4 h-4 sm:w-6 sm:h-6 bg-blue-500 rounded-full"
                  animate={{
                    x: eyePosition === 0 ? 20 :
                       eyePosition === 1 ? 15 :
                       eyePosition === 2 ? 0 :
                       eyePosition === 3 ? -15 :
                       eyePosition === 4 ? -20 :
                       eyePosition === 5 ? -15 :
                       eyePosition === 6 ? 0 :
                       15,
                    y: eyePosition === 0 ? 0 :
                       eyePosition === 1 ? 15 :
                       eyePosition === 2 ? 20 :
                       eyePosition === 3 ? 15 :
                       eyePosition === 4 ? 0 :
                       eyePosition === 5 ? -15 :
                       eyePosition === 6 ? -20 :
                       -15
                  }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>

              {/* Right Eye */}
              <motion.div
                className="w-14 h-14 sm:w-20 sm:h-20 bg-white rounded-full border-4 border-blue-500 relative"
                animate={{
                  rotate: eyePosition === 0 ? 0 : 
                         eyePosition === 1 ? 45 :
                         eyePosition === 2 ? 90 :
                         eyePosition === 3 ? 135 :
                         eyePosition === 4 ? 180 :
                         eyePosition === 5 ? 225 :
                         eyePosition === 6 ? 270 :
                         315
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute w-4 h-4 sm:w-6 sm:h-6 bg-blue-500 rounded-full"
                  animate={{
                    x: eyePosition === 0 ? 20 :
                       eyePosition === 1 ? 15 :
                       eyePosition === 2 ? 0 :
                       eyePosition === 3 ? -15 :
                       eyePosition === 4 ? -20 :
                       eyePosition === 5 ? -15 :
                       eyePosition === 6 ? 0 :
                       15,
                    y: eyePosition === 0 ? 0 :
                       eyePosition === 1 ? 15 :
                       eyePosition === 2 ? 20 :
                       eyePosition === 3 ? 15 :
                       eyePosition === 4 ? 0 :
                       eyePosition === 5 ? -15 :
                       eyePosition === 6 ? -20 :
                       -15
                  }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </motion.div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-2 sm:p-8">
      {/* Back Button at Top Left for navigation */}
      <motion.button
        whileHover={{
          scale: 1.1,
          backgroundColor: "#e0e7ff",
          color: "#3730a3",
          boxShadow: "0 4px 24px #6366f155",
          x: -5,
        }}
        whileTap={{
          scale: 0.95,
          backgroundColor: "#818cf8",
          color: "#fff",
          x: 2,
        }}
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="fixed top-3 left-3 sm:top-6 sm:left-8 flex items-center px-4 sm:px-5 py-2 bg-indigo-100 text-indigo-700 rounded-full shadow-lg font-semibold z-50"
        onClick={() => navigate('/user')}
      >
        <motion.span
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mr-2"
        >
          {/* Animated Back arrow icon */}
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <motion.path
              d="M15 19l-7-7 7-7"
              stroke="#3730a3"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0.5 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
          </svg>
        </motion.span>
        Back
      </motion.button>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-gray-800">Breathing Exercises</h1>
        
        {/* Time Period Selection */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Select Time Period (minutes)</h2>
          <div className="flex space-x-2 sm:space-x-4 justify-center">
            {timeOptions.map((time) => (
              <button
                key={time}
                onClick={() => setTimePeriod(time)}
                className={`px-4 sm:px-6 py-2 rounded-full ${
                  timePeriod === time
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600 hover:bg-blue-100'
                }`}
              >
                {time} min
              </button>
            ))}
          </div>
        </div>

        {/* Exercise Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{exercise.name}</h3>
              <p className="text-gray-600 mb-2 sm:mb-4">{exercise.description}</p>
              <button
                onClick={() => startExercise(exercise.id)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                disabled={isActive}
              >
                Start Exercise
              </button>
            </div>
          ))}
        </div>

        {/* Active Exercise Display */}
        {selectedExercise && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            exit={{ backgroundColor: "rgba(0,0,0,0)" }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-white rounded-xl p-4 sm:p-8 max-w-xs sm:max-w-lg w-full mx-2 sm:mx-4 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Back Button - disabled until timer is 0 */}
              <motion.button
                whileHover={timeLeft === 0 ? { scale: 1.1, backgroundColor: "#e0e7ff", color: "#3730a3" } : {}}
                whileTap={timeLeft === 0 ? { scale: 0.95 } : {}}
                disabled={timeLeft > 0}
                className={`absolute right-2 top-2 sm:right-4 sm:top-4 flex items-center px-3 sm:px-4 py-2 rounded-full shadow font-semibold transition-colors z-10
                  ${timeLeft === 0
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60'}
                `}
                onClick={closeModal}
                aria-disabled={timeLeft > 0}
              >
                <motion.span
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mr-2"
                >
                  {/* Animated Back arrow icon */}
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <motion.path
                      d="M9 5l-7 7 7 7"
                      stroke="#3730a3"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0.5 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                    />
                    <motion.line
                      x1="2"
                      y1="12"
                      x2="22"
                      y2="12"
                      stroke="#3730a3"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0.5 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.7, ease: "easeInOut", delay: 0.2 }}
                    />
                  </svg>
                </motion.span>
                Back
              </motion.button>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 mt-6 sm:mt-8 text-center">
                {exercises.find(e => e.id === selectedExercise)?.name}
              </h2>
              <div className="flex justify-center mb-4 sm:mb-6">
                {renderAnimation(selectedExercise)}
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">{formatTime(timeLeft)}</p>
                {selectedExercise !== 4 && (
                  <p className="text-lg sm:text-xl text-blue-600">
                    {isInhale ? "Inhale..." : "Exhale..."}
                  </p>
                )}
                {selectedExercise === 4 && (
                  <p className="text-lg sm:text-xl text-blue-600">
                    Follow the eye movements...
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Exercise;