import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { register, loginWithOTP, verifyOTP, error, verificationId } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    countryCode: '91',
    otp: '',
    name: '',
    password: '',
    userType: 'user'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phoneNumber') {
      // Remove all non-digit characters
      let cleanedValue = value.replace(/\D/g, '');
      
      // If user entered +91 prefix, remove it
      if (value.startsWith('+91')) {
        cleanedValue = cleanedValue.substring(2); // Remove first 2 digits (91)
      }
      
      // Limit to 10 digits for India
      if (formData.countryCode === '91') {
        cleanedValue = cleanedValue.slice(0, 10);
      }
      
      setFormData(prev => ({ ...prev, [name]: cleanedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Format phone number for display
  const formatPhoneNumber = (number) => {
    if (!number) return '';
    // Format as (xxx) xxx-xxxx for US numbers
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length >= 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return number;
  };

  const requestOTP = async () => {
    try {
      setLoading(true);
      
      // Format phone number
      const formattedNumber = `+${formData.countryCode}${formData.phoneNumber}`;
      console.log('Requesting OTP for:', formattedNumber);
      
      const response = await loginWithOTP(formData.phoneNumber, formData.countryCode);
      
      if (response.success) {
        console.log('OTP request successful:', response);
        setStep(2);
      } else {
        console.error('OTP request failed:', response);
        setError(response.error || 'Failed to request OTP');
      }
    } catch (err) {
      console.error('OTP request error:', err);
      setError(err.response?.data?.error || 'Failed to request OTP');
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    try {
      setLoading(true);
      
      // Format phone number
      const formattedNumber = `+${formData.countryCode}${formData.phoneNumber}`;
      console.log('Verifying OTP for:', formattedNumber);
      
      // Verify OTP using verificationId from AuthContext
      const verifyResponse = await verifyOTP(formData.phoneNumber, formData.otp, verificationId);
      
      if (verifyResponse.success) {
        console.log('OTP verification successful:', verifyResponse);
        // Complete registration
        const registerResponse = await register(formData.phoneNumber, formData.countryCode, formData.name, formData.password, formData.userType);
        if (registerResponse.success) {
          console.log('Registration successful:', registerResponse);
          navigate('/dashboard');
        } else {
          console.error('Registration failed:', registerResponse);
          setError(registerResponse.error || 'Failed to register');
        }
      } else {
        console.error('OTP verification failed:', verifyResponse);
        setError(verifyResponse.error || 'Invalid OTP');
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError(err.response?.data?.error || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {step === 1 ? 'Sign Up' : step === 2 ? 'Verify OTP' : 'Complete Registration'}
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {step === 1 && (
          <div className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <div className="relative">
                  <div className="relative">
                    <input
                      name="phoneNumber"
                      type="tel"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter phone number (10 digits)"
                      onChange={handleChange}
                      value={formData.phoneNumber}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {formatPhoneNumber(formData.phoneNumber)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formData.countryCode === '91' && 'India: Enter 10 digits (e.g., 9876543210) or +91XXXXXXXXXX'}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <select
                  name="countryCode"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  onChange={handleChange}
                  value={formData.countryCode}
                >
                  <option value="91">India (+91)</option>
                  <option value="1">USA (+1)</option>
                </select>
              </div>
            </div>

            <div>
              <button
                onClick={requestOTP}
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <input
                name="otp"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter OTP"
                onChange={handleChange}
                value={formData.otp}
              />
            </div>

            <div>
              <button
                onClick={verifyOTP}
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <input
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                onChange={handleChange}
                value={formData.name}
              />
              <input
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>

            <div>
              <select
                name="userType"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={handleChange}
                value={formData.userType}
              >
                <option value="user">User</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            <div>
              <button
                onClick={handleRegister}
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
