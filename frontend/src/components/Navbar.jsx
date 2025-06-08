import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHome, FaInfoCircle, FaEnvelope, FaSignInAlt, FaRobot, FaBars, FaTimes, FaCheck, FaMicrophone, FaVideo, FaMapMarkerAlt } from 'react-icons/fa'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isRequestingPermissions, setIsRequestingPermissions] = useState(false)
  const [permissionError, setPermissionError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [grantedPermissions, setGrantedPermissions] = useState({
    microphone: false,
    camera: false,
    location: false
  })
  const [userCheckedPermissions, setUserCheckedPermissions] = useState({
    microphone: false,
    camera: false,
    location: false
  })
  const navigate = useNavigate()

  const handlePermissionCheck = (permission) => {
    setUserCheckedPermissions(prev => ({
      ...prev,
      [permission]: !prev[permission]
    }))
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    
    // Check if user has ticked all permissions
    if (!userCheckedPermissions.microphone || !userCheckedPermissions.camera || !userCheckedPermissions.location) {
      setPermissionError('Please tick all permissions to continue')
      return
    }

    try {
      setIsRequestingPermissions(true)
      setPermissionError('')
      console.log('Starting permission requests...')

      // Check if we're in a secure context
      if (!window.isSecureContext) {
        throw new Error('Permissions require a secure context (HTTPS)')
      }

      // Request permissions one by one
      const permissions = {
        microphone: false,
        camera: false,
        location: false,
        audio: false
      }

      // Request microphone and audio permissions
      try {
        console.log('Requesting microphone permission...')
        const audioStream = await navigator.mediaDevices.getUserMedia({ 
          audio: true,
          video: false 
        })
        audioStream.getTracks().forEach(track => track.stop())
        permissions.microphone = true
        permissions.audio = true
        setGrantedPermissions(prev => ({ ...prev, microphone: true }))
        console.log('Microphone permission granted')
      } catch (err) {
        console.error('Microphone permission error:', err)
        setPermissionError('Please allow microphone access to continue')
        setIsRequestingPermissions(false)
        return
      }

      // Request camera permission
      try {
        console.log('Requesting camera permission...')
        const videoStream = await navigator.mediaDevices.getUserMedia({ 
          audio: false,
          video: true 
        })
        videoStream.getTracks().forEach(track => track.stop())
        permissions.camera = true
        setGrantedPermissions(prev => ({ ...prev, camera: true }))
        console.log('Camera permission granted')
      } catch (err) {
        console.error('Camera permission error:', err)
        setPermissionError('Please allow camera access to continue')
        setIsRequestingPermissions(false)
        return
      }

      // Request location permission
      try {
        console.log('Requesting location permission...')
        await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log('Location permission granted:', position)
              resolve(position)
            },
            (error) => {
              console.error('Location permission denied:', error)
              reject(error)
            },
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0
            }
          )
        })
        permissions.location = true
        setGrantedPermissions(prev => ({ ...prev, location: true }))
        console.log('Location permission granted')
      } catch (err) {
        console.error('Location permission error:', err)
        setPermissionError('Please allow location access to continue')
        setIsRequestingPermissions(false)
        return
      }

      // Store permissions in localStorage
      localStorage.setItem('userPermissions', JSON.stringify(permissions))
      console.log('All permissions granted:', permissions)

      // Show success message and redirect to signup page
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setIsRequestingPermissions(false)
        navigate('/signup')
      }, 2000)

    } catch (error) {
      console.error('Permission request error:', error)
      setPermissionError(`Failed to request permissions: ${error.message}`)
    } finally {
      setIsRequestingPermissions(false)
    }
  }

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
              <button
                onClick={() => setIsRequestingPermissions(true)}
                className="flex items-center text-base md:text-lg font-semibold text-gray-800 hover:text-blue-700 transition-colors px-3 py-2 rounded-lg shadow hover:shadow-xl bg-white hover:bg-blue-50 drop-shadow-[0_2px_2px_rgba(0,0,0,0.10)]"
              >
                <FaSignInAlt className="mr-2 text-blue-500" />
                SignUp
              </button>
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
          {isRequestingPermissions && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Required Permissions</h3>
                <p className="text-gray-600 mb-6 text-center">Please select the permissions you want to grant:</p>
                
                <div className="space-y-4">
                  <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                    <input
                      type="checkbox"
                      id="microphone"
                      checked={userCheckedPermissions.microphone}
                      onChange={() => handlePermissionCheck('microphone')}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="microphone" className="ml-3 flex items-center">
                      <FaMicrophone className="text-blue-500 mr-2" />
                      <span className="text-gray-700 font-medium">Microphone Access</span>
                    </label>
                    {grantedPermissions.microphone && (
                      <FaCheck className="ml-auto text-green-500" />
                    )}
                  </div>

                  <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                    <input
                      type="checkbox"
                      id="camera"
                      checked={userCheckedPermissions.camera}
                      onChange={() => handlePermissionCheck('camera')}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="camera" className="ml-3 flex items-center">
                      <FaVideo className="text-blue-500 mr-2" />
                      <span className="text-gray-700 font-medium">Camera Access</span>
                    </label>
                    {grantedPermissions.camera && (
                      <FaCheck className="ml-auto text-green-500" />
                    )}
                  </div>

                  <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                    <input
                      type="checkbox"
                      id="location"
                      checked={userCheckedPermissions.location}
                      onChange={() => handlePermissionCheck('location')}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="location" className="ml-3 flex items-center">
                      <FaMapMarkerAlt className="text-blue-500 mr-2" />
                      <span className="text-gray-700 font-medium">Location Access</span>
                    </label>
                    {grantedPermissions.location && (
                      <FaCheck className="ml-auto text-green-500" />
                    )}
                  </div>
                </div>

                {permissionError && (
                  <div className="mt-4 p-3 bg-red-50 text-red-500 text-sm rounded-lg text-center">
                    {permissionError}
                  </div>
                )}

                <div className="mt-6 flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      setIsRequestingPermissions(false)
                      setPermissionError('')
                      setUserCheckedPermissions({
                        microphone: false,
                        camera: false,
                        location: false
                      })
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSignUp}
                    disabled={!userCheckedPermissions.microphone || !userCheckedPermissions.camera || !userCheckedPermissions.location}
                    className={`px-6 py-2 rounded-lg text-white font-medium ${
                      userCheckedPermissions.microphone && userCheckedPermissions.camera && userCheckedPermissions.location
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Continue to SignUp
                  </button>
                </div>
              </div>
            </div>
          )}
          {showSuccess && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 text-center">
                <FaCheck className="text-green-500 text-5xl mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Permissions Granted!</h3>
                <p className="text-gray-600">Redirecting to signup page...</p>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar