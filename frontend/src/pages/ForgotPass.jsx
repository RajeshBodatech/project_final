import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';


const logo = '/images/logo.jpg';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
  exit: { opacity: 0, scale: 0.92, y: 40, transition: { duration: 0.2 } },
};

const ForgotPass = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP, 3: New Password
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendEnabled, setResendEnabled] = useState(false);
  const [timer, setTimer] = useState(60);
  const intervalRef = useRef(null);
  const navigate = useNavigate();
  const [otpValid, setOtpValid] = useState(false);

  // Start 1-minute timer after sending OTP
  useEffect(() => {
    if (step === 2) {
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
  }, [step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('91')) {
      return /^91[6-9]\d{9}$/.test(cleanPhone);
    }
    return /^[6-9]\d{9}$/.test(cleanPhone);
  };

  const getPhoneWithCode = () => {
    const cleanPhone = formData.phoneNumber.replace(/[^0-9]/g, '');
    return cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const cleanPhone = formData.phoneNumber.replace(/[^0-9]/g, '');
    if (!validatePhone(cleanPhone)) {
      setError('Please enter a valid 10-digit phone number');
      setLoading(false);
      return;
    }

    try {
      const phoneWithCode = getPhoneWithCode();
      const response = await fetch(`${API_BASE_URL}/auth/request-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneWithCode,
          countryCode: '91'
        })
      });

      const data = await response.json();
      if (data.success) {
        setStep(2);
        setError('');
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const phoneWithCode = getPhoneWithCode();
      console.log('Verifying OTP for phone:', phoneWithCode); // Debug log
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneWithCode,
          countryCode: '91',
          otp: formData.otp
        })
      });
      const data = await response.json();
      console.log('OTP verification response:', data); // Debug log
      
      if (data.success) {
        setOtpValid(true);
        setError('');
        setStep(3); // Move to password reset step
      } else {
        setOtpValid(false);
        setError(data.error || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('OTP verification error:', error); // Debug log
      setOtpValid(false);
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const phoneWithCode = getPhoneWithCode();
      console.log('Sending reset password request:', {
        phoneNumber: phoneWithCode,
        otp: formData.otp
      });

      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneWithCode,
          otp: formData.otp,
          newPassword: formData.newPassword
        })
      });

      const data = await response.json();
      console.log('Reset password response:', data);

      if (data.success) {
        // Show success message
        alert('Password reset successful! Please login with your new password.');
        // Clear form data
        setFormData({
          phoneNumber: '',
          otp: '',
          newPassword: '',
          confirmPassword: ''
        });
        // Redirect to login page
        navigate('/login');
      } else {
        setError(data.error || 'Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setError('Failed to reset password. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async (e) => {
    e.preventDefault();
    if (!resendEnabled) return;
    
    setLoading(true);
    setError('');
    setResendEnabled(false);
    setTimer(60);

    try {
      const phoneWithCode = getPhoneWithCode();
      const response = await fetch(`${API_BASE_URL}/auth/request-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneWithCode,
          countryCode: '91'
        })
      });

      const data = await response.json();
      if (!data.success) {
        setError(data.error || 'Failed to resend OTP');
      }
    } catch (error) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
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
          Reset Password
        </motion.h2>

        {step === 1 && (
          <motion.form
            className="w-full"
            onSubmit={handleSendOTP}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <p className="text-sm text-gray-600 mb-4 text-center">
              Enter your registered phone number to receive an OTP.
            </p>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 text-sm shadow mb-4"
              required
            />
            {error && (
              <div className="text-red-600 text-sm mb-2 text-center">{error}</div>
            )}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white py-2 rounded-xl font-bold text-base hover:from-blue-700 hover:to-teal-600 transition duration-300 ease-in-out shadow-lg"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </motion.button>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form
            className="w-full"
            onSubmit={handleVerifyOTP}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <p className="text-sm text-gray-600 mb-4 text-center">
              Enter the OTP sent to your phone number.
            </p>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
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
                {loading ? 'Verifying...' : 'Verify OTP'}
              </motion.button>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={!resendEnabled || loading}
                className={`flex-1 py-2 rounded-xl font-bold text-base transition-colors shadow-lg ${
                  !resendEnabled || loading
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-blue-600 border border-blue-400 hover:bg-blue-50'
                }`}
              >
                {resendEnabled ? 'Resend OTP' : `Resend in ${timer}s`}
              </button>
            </div>
          </motion.form>
        )}

        {step === 3 && (
          <motion.form
            className="w-full"
            onSubmit={handleResetPassword}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <p className="text-sm text-gray-600 mb-4 text-center">
              Enter your new password.
            </p>
            <input
              type="password"
              name="newPassword"
              placeholder="New password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 text-sm shadow mb-4"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 text-sm shadow mb-4"
              required
            />
            {error && (
              <div className="text-red-600 text-sm mb-2 text-center">{error}</div>
            )}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white py-2 rounded-xl font-bold text-base hover:from-blue-700 hover:to-teal-600 transition duration-300 ease-in-out shadow-lg"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </motion.button>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPass;