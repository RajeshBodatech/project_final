import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [verificationId, setVerificationId] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data.user);
      }
    } catch (err) {
      console.error('Auth check error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loginWithOTP = async (phoneNumber, countryCode = '91') => { // Add countryCode parameter with default value
    try {
      setError('');
      console.log('Requesting OTP for:', phoneNumber);
      
      const response = await axios.post(`${API_BASE_URL}/auth/request-otp`, {
        phoneNumber,
        countryCode
      });
      
      if (response.data.success) {
        console.log('OTP request successful:', response.data);
        setVerificationId(response.data.verificationId);
        return response.data;
      } else {
        throw new Error(response.data.error || 'Failed to request OTP');
      }
    } catch (err) {
      console.error('OTP request error:', err);
      setError(err.response?.data?.error || 'Failed to request OTP');
      throw err;
    }
  };

  const verifyOTP = async (phoneNumber, otp, verificationId) => {
    try {
      setError('');
      const formattedNumber = `+${phoneNumber}`;
      console.log('Verifying OTP for:', formattedNumber);
      
      const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
        phoneNumber: formattedNumber,
        otp,
        verificationId
      });
      
      if (response.data.success) {
        console.log('OTP verification successful:', {
          phoneNumber: formattedNumber,
          user: response.data.user
        });
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          setUser(response.data.user);
        }
        return response.data;
      } else {
        console.error('OTP verification failed:', response.data);
        throw new Error(response.data.error || 'Invalid OTP');
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      setError(err.response?.data?.error || 'Invalid OTP');
      throw err;
    }
  };

  const register = async (phoneNumber, countryCode, name, password, userType) => {
    try {
      setError('');
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        phoneNumber,
        countryCode,
        name,
        password,
        userType
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
      }
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      loginWithOTP,
      verifyOTP,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
