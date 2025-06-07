import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="mt-20 px-4">
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

export default Home;