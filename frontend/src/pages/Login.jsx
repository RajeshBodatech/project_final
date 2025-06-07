import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

const roles = [
  {
    title: 'Admin',
    img: '/images/img2.png',
    value: 'admin',
  },
  {
    title: 'User',
    img: '/images/img.png',
    value: 'user',
  },
  {
    title: 'Doctor',
    img: '/images/doctor.jpg',
    value: 'doctor',
  },
];

const logo = '/images/logo.jpg';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
  exit: { opacity: 0, scale: 0.85, y: 40, transition: { duration: 0.2 } },
};

const Login = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const openModal = (role) => {
    setSelectedRole(role);
    setModalOpen(true);
    setFormData({ email: '', password: '' });
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRole(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          // If your backend expects phoneNumber instead of email, adjust accordingly
        }),
      });
      const data = await response.json();
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        // Redirect based on role
        if (data.role === 'user') {
          navigate('/user');
        } else if (data.role === 'admin') {
          navigate('/admin');
        } else if (data.role === 'doctor') {
          navigate('/doctor');
        } else {
          navigate('/'); // fallback
        }
        closeModal();
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="mt-20 px-2 min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center bg-gray-100">
      <motion.h2
        className="text-2xl font-bold mb-6 text-gray-800"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Login As
      </motion.h2>
      <motion.div
        className="flex flex-col sm:flex-row gap-4 mb-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
      >
        {roles.map((role) => (
          <motion.button
            key={role.value}
            onClick={() => openModal(role)}
            className="flex flex-col items-center bg-white rounded-xl shadow-md px-6 py-4 hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-blue-500 focus:outline-none hover:scale-105 duration-300"
            whileHover={{ scale: 1.08, boxShadow: '0 8px 32px 0 rgba(59,130,246,0.15)' }}
            whileTap={{ scale: 0.97 }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <motion.img
              src={role.img}
              alt={role.title}
              className="w-14 h-14 rounded-full mb-2 object-cover shadow"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
            <span className="font-semibold text-gray-700">{role.title}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 w-full max-w-xs sm:max-w-sm relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-red-500 font-bold focus:outline-none transition-colors"
                aria-label="Close"
              >
                ×
              </button>
              <div className="flex flex-col items-center mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
                  <h1 className="text-2xl font-bold text-gray-800">HOPE I</h1>
                </div>
                <p className="text-xs text-gray-500">Mental Health AI Chat Bot</p>
              </div>
              <motion.h2
                className="text-xl font-semibold text-gray-800 mb-2 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Log in
              </motion.h2>
              <motion.p
                className="text-base font-medium text-gray-700 mb-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {selectedRole.title}
              </motion.p>
              <motion.img
                src={selectedRole.img}
                alt={selectedRole.title}
                className="w-20 h-16 mb-4 rounded-lg object-cover mx-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.35 }}
              />
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="mb-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 text-sm"
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 text-sm"
                    required
                  />
                </div>
                <div className="text-right mb-3">
                   <Link to="/fpassword" className="text-blue-600 hover:underline font-medium">
                  Forgot password ?
                </Link>
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold text-base hover:bg-blue-700 transition duration-300 ease-in-out shadow-md"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Log in
                </motion.button>
              </form>
              <motion.p
                className="mt-4 text-gray-600 text-xs text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Don't have an account ?{' '}
                <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                  Sign up
                </Link>
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animations */}
      <style>
        {`
          @keyframes bounce {
            0% { transform: scale(0.9);}
            60% { transform: scale(1.05);}
            100% { transform: scale(1);}
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
};

export default Login;