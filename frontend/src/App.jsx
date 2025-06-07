import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About'; 
import Navbar from './components/Navbar';
import Login from './pages/Login';
import ForgotPass from './pages/ForgotPass';
import Admin from './Dashboards/Admin';
import Doctor from './Dashboards/Doctor';
import User from './Dashboards/User';
import Exercise from './pages/Exercise';
const SplashScreen = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
    <figure className="shadow-2xl rounded-3xl overflow-hidden transform hover:scale-105 transition-transform duration-500 bg-white p-4 mb-6">
      <img
        src="/images/hopai.jpg"
        alt="HopAI Logo"
        className="w-48 h-48 object-cover rounded-2xl drop-shadow-xl"
        style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
      />
    </figure>
    <h1 className="sm:text-4xl text-2xl font-extrabold mb-6 text-center text-gray-900 drop-shadow-lg tracking-wide">
      WELCOME TO <span className="text-gray-900">HOPE-AI</span> ANTI-SUICIDE MENTAL HEALTH BOT
    </h1>
    <div className="flex space-x-3 mb-4">
      <span className="w-4 h-4 bg-blue-600 rounded-full animate-pulse shadow-lg"></span>
      <span className="w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg delay-150"></span>
      <span className="w-4 h-4 bg-blue-400 rounded-full animate-pulse shadow-lg delay-300"></span>
    </div>
  </div>
);

function AppContent() {
  const location = useLocation();
  // List dashboard routes where you want to hide the Navbar
  const hideNavbar = ['/admin', '/doctor', '/user', '/exercise'].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/fpassword" element={<ForgotPass />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/user" element={<User />} />
        <Route path="/exercise" element={<Exercise />} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;