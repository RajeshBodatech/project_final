import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const logo = '/images/logo.jpg';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
  exit: { opacity: 0, scale: 0.92, y: 40, transition: { duration: 0.2 } },
};

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendEnabled, setResendEnabled] = useState(false);
  const [timer, setTimer] = useState(60);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  // Start 1-minute timer after sending
  useEffect(() => {
    if (sent) {
      setResendEnabled(false);
      setTimer(60);
      intervalRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setResendEnabled(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(intervalRef.current);
    }
  }, [sent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Simulate API call (replace with real API)
    setTimeout(() => {
      setSent(true);
      setLoading(false);
      setError('');
    }, 800);
  };

  const handleResend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResendEnabled(false);
    setTimer(60);
    // Simulate API call (replace with real API)
    setTimeout(() => {
      setSent(true);
      setLoading(false);
      setError('');
      // Timer will restart due to useEffect on [sent]
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-blue-100 px-2 py-8">
      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 w-full max-w-xs sm:max-w-sm relative border-4 border-blue-100"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{
          boxShadow: '0 12px 36px 0 rgba(59,130,246,0.18), 0 2px 8px 0 rgba(34,197,94,0.10)',
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate('/login')}
          className="absolute left-4 top-4 text-blue-600 hover:text-blue-800 font-bold text-sm"
        >
          &larr; Back
        </button>

        <motion.div
          className="flex flex-col items-center mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain drop-shadow-lg" />
            <h1 className="text-2xl font-extrabold text-blue-700 drop-shadow">HOPE I</h1>
          </div>
          <p className="text-xs text-gray-500 font-semibold">Mental Health AI Chat Bot</p>
        </motion.div>
        <motion.h2
          className="text-xl font-bold text-gray-800 mb-2 text-center drop-shadow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          Forgot Password
        </motion.h2>
        <motion.p
          className="text-sm text-gray-600 mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Enter your registered email to receive a reset link.
        </motion.p>
        {!sent ? (
          <motion.form
            className="w-full"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 text-sm shadow mb-4"
              required
            />
            {error && (
              <div className="text-red-600 text-sm mb-2 text-center">{error}</div>
            )}
            <div className="flex gap-2">
              <motion.button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-teal-500 text-white py-2 rounded-xl font-bold text-base hover:from-blue-700 hover:to-teal-600 transition duration-300 ease-in-out shadow-lg"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </motion.button>
              <button
                type="button"
                onClick={handleResend}
                disabled={!resendEnabled || loading}
                className={`flex-1 py-2 rounded-xl font-bold text-base transition-colors shadow-lg ${
                  !resendEnabled || loading
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-blue-600 border border-blue-400 hover:bg-blue-50'
                }`}
                style={{ marginLeft: '4px' }}
                title={!resendEnabled ? `Wait ${timer}s to resend` : "Resend reset link"}
              >
                {resendEnabled ? 'Resend Reset Link' : `Resend in ${timer}s`}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            className="w-full flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-4xl mb-2 animate-bounce">📧</div>
            <p className="text-green-600 font-semibold text-center mb-2">
              Reset link sent!<br />Check your email.
            </p>
            {error && (
              <div className="text-red-600 text-sm mb-2 text-center">{error}</div>
            )}
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={handleResend}
                disabled={!resendEnabled || loading}
                className={`flex-1 py-2 rounded-xl font-bold text-base transition-colors shadow-lg ${
                  !resendEnabled || loading
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-blue-600 border border-blue-400 hover:bg-blue-50'
                }`}
                style={{ marginLeft: '4px' }}
                title={!resendEnabled ? `Wait ${timer}s to resend` : "Resend reset link"}
              >
                {resendEnabled ? 'Resend Reset Link' : `Resend in ${timer}s`}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
      <style>
        {`
          .animate-bounce {
            animation: bounce 1s infinite;
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0);}
            50% { transform: translateY(-10px);}
          }
        `}
      </style>
    </div>
  );
};

export default ForgotPass;