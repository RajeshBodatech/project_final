import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaCheck } from 'react-icons/fa';

const Signup = () => {
  const navigate = useNavigate();
  const { register, loginWithOTP, verifyOTP, error, verificationId } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    countryCode: '91',
    otp: '',
    name: '',
    email: '',
    password: '',
    userType: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState(null);
  const [permissionError, setPermissionError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Check for permissions on component mount
  useEffect(() => {
    const storedPermissions = localStorage.getItem('userPermissions');
    if (!storedPermissions) {
      // If no permissions found, redirect to home page
      navigate('/');
      return;
    }
    const parsedPermissions = JSON.parse(storedPermissions);
    setPermissions(parsedPermissions);
  }, [navigate]);

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
        setStep(3);
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

  const requestPermissions = async () => {
    try {
      setLoading(true);
      setPermissionError('');
      console.log('Starting permission requests...');

      // Check if we're in a secure context
      if (!window.isSecureContext) {
        throw new Error('Permissions require a secure context (HTTPS)');
      }

      const newPermissions = {
        microphone: false,
        camera: false,
        location: false,
        audio: false
      };

      // Request microphone and audio permissions
      try {
        console.log('Requesting microphone permission...');
        const audioStream = await navigator.mediaDevices.getUserMedia({ 
          audio: true,
          video: false 
        });
        audioStream.getTracks().forEach(track => track.stop());
        newPermissions.microphone = true;
        newPermissions.audio = true;
        console.log('Microphone permission granted');
      } catch (err) {
        console.error('Microphone permission error:', err);
        setPermissionError('Please allow microphone access to continue');
        return false;
      }

      // Request camera permission
      try {
        console.log('Requesting camera permission...');
        const videoStream = await navigator.mediaDevices.getUserMedia({ 
          audio: false,
          video: true 
        });
        videoStream.getTracks().forEach(track => track.stop());
        newPermissions.camera = true;
        console.log('Camera permission granted');
      } catch (err) {
        console.error('Camera permission error:', err);
        setPermissionError('Please allow camera access to continue');
        return false;
      }

      // Request location permission
      try {
        console.log('Requesting location permission...');
        await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log('Location permission granted:', position);
              resolve(position);
            },
            (error) => {
              console.error('Location permission denied:', error);
              reject(error);
            },
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0
            }
          );
        });
        newPermissions.location = true;
        console.log('Location permission granted');
      } catch (err) {
        console.error('Location permission error:', err);
        setPermissionError('Please allow location access to continue');
        return false;
      }

      // Store permissions in localStorage
      localStorage.setItem('userPermissions', JSON.stringify(newPermissions));
      setPermissions(newPermissions);
      console.log('All permissions granted:', newPermissions);
      return true;
    } catch (error) {
      console.error('Permission request error:', error);
      setPermissionError(`Failed to request permissions: ${error.message}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Format phone number
      const formattedNumber = `+${formData.countryCode}${formData.phoneNumber}`;
      console.log('Registering user:', formattedNumber);
      
      // Complete registration with permissions
      const registerResponse = await register(
        formattedNumber,
        formData.name,
        formData.email,
        formData.password,
        formData.userType,
        permissions
      );

      if (registerResponse.success) {
        console.log('Registration successful:', registerResponse);
        // Clear permissions from localStorage
        localStorage.removeItem('userPermissions');
        // Show success message
        setShowSuccess(true);
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/login', { replace: true });
        }, 2000);
      } else {
        console.error('Registration failed:', registerResponse);
        setError(registerResponse.error || 'Failed to register');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.error || 'Failed to register');
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

        {permissionError && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {permissionError}
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
                onClick={verify}
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
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email Address"
                onChange={handleChange}
                value={formData.email}
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
                {loading ? 'Processing...' : 'Sign Up'}
              </button>
            </div>
          </div>
        )}

        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 text-center">
              <FaCheck className="text-green-500 text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Successfully Signed Up!</h3>
              <p className="text-gray-600">Redirecting to login page...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
