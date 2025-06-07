import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { loginWithOTP, verifyOTP, error } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const requestOTP = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/auth/send-otp`, {
        phoneNumber: formData.phoneNumber
      });
      
      if (response.data.success) {
        setStep(2);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Failed to request OTP');
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
        phoneNumber: formData.phoneNumber,
        countryCode: '91',
        otp: formData.otp
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Verification error:', err);
      setError(err.response?.data?.error || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {step === 1 ? 'Login' : 'Verify OTP'}
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
                <input
                  name="phoneNumber"
                  type="tel"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Phone Number (e.g., 911234567890)"
                  onChange={handleChange}
                  value={formData.phoneNumber}
                />
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
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
      </div>
    </div>
  );
};

export default Login;
