import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaInfoCircle, FaEnvelope, FaSignInAlt, FaRobot, FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="w-full bg-white shadow-lg fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-8">
        {/* Left: Logo and Brand */}
        <Link to="/" className="flex items-center space-x-2 group" onClick={() => setMenuOpen(false)}>
          <img
            src="/images/hopai.jpg"
            alt="HopAI Logo"
            className="w-10 h-10 rounded-full shadow-md"
          />
          <span className="text-xl md:text-2xl font-extrabold text-gray-800 group-hover:text-blue-700 transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)] flex items-center">
            <FaRobot className="mr-1 text-blue-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)]" />
            HOPE-I BOT
          </span>
        </Link>
        {/* Hamburger Icon */}
        <button
          className="md:hidden text-2xl text-blue-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        {/* Right: Navigation */}
        <nav
          className={`
            absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300
            ${menuOpen ? 'block' : 'hidden'} md:block
          `}
        >
          <ul className="flex flex-col md:flex-row items-center md:space-x-8 space-y-2 md:space-y-0 px-4 md:px-0 py-4 md:py-0">
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center text-base md:text-lg font-semibold text-gray-800 hover:text-blue-700 transition-colors px-3 py-2 rounded-lg shadow hover:shadow-xl bg-white hover:bg-blue-50 drop-shadow-[0_2px_2px_rgba(0,0,0,0.10)]"
              >
                <FaHome className="mr-2 text-blue-500" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="flex items-center text-base md:text-lg font-semibold text-gray-800 hover:text-blue-700 transition-colors px-3 py-2 rounded-lg shadow hover:shadow-xl bg-white hover:bg-blue-50 drop-shadow-[0_2px_2px_rgba(0,0,0,0.10)]"
              >
                <FaInfoCircle className="mr-2 text-blue-500" />
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="flex items-center text-base md:text-lg font-semibold text-gray-800 hover:text-blue-700 transition-colors px-3 py-2 rounded-lg shadow hover:shadow-xl bg-white hover:bg-blue-50 drop-shadow-[0_2px_2px_rgba(0,0,0,0.10)]"
              >
                <FaSignInAlt className="mr-2 text-blue-500" />
                SignUp
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center text-base md:text-lg font-semibold text-gray-800 hover:text-blue-700 transition-colors px-3 py-2 rounded-lg shadow hover:shadow-xl bg-white hover:bg-blue-50 drop-shadow-[0_2px_2px_rgba(0,0,0,0.10)]"
              >
                <FaSignInAlt className="mr-2 text-blue-500" />
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar