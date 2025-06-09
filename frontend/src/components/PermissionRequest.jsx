import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PermissionRequest = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({
    microphone: false,
    camera: false,
    location: false,
    audio: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if user came from home page
  useEffect(() => {
    const fromHome = sessionStorage.getItem('fromHome');
    if (!fromHome) {
      navigate('/');
    }
  }, [navigate]);

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop the stream after getting permission
      return true;
    } catch (err) {
      console.error('Microphone permission error:', err);
      return false;
    }
  };

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop()); // Stop the stream after getting permission
      return true;
    } catch (err) {
      console.error('Camera permission error:', err);
      return false;
    }
  };

  const requestLocationPermission = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      // Get location name using reverse geocoding with a more specific format
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&addressdetails=1`
      );
      const data = await response.json();
      
      // Extract city and state from the address
      const address = data.address;
      let locationName = '';
      
      if (address) {
        // Try to get city and state
        const city = address.city || address.town || address.village || '';
        const state = address.state || '';
        locationName = city ? `${city}, ${state}` : state;
      }
      
      // If we couldn't get a good location name, use coordinates
      if (!locationName) {
        locationName = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
      }

      // Store both coordinates and location name
      const locationData = {
        name: locationName,
        coordinates: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        fullAddress: data.display_name
      };

      // Update permissions with actual location data
      setPermissions(prev => ({
        ...prev,
        location: locationData
      }));

      // Update localStorage with the new location data
      const updatedPermissions = {
        ...permissions,
        location: locationData
      };
      localStorage.setItem('userPermissions', JSON.stringify(updatedPermissions));

      return true;
    } catch (err) {
      console.error('Location permission error:', err);
      return false;
    }
  };

  const handlePermissionChange = async (permission) => {
    let granted = false;

    switch (permission) {
      case 'microphone':
        granted = await requestMicrophonePermission();
        break;
      case 'camera':
        granted = await requestCameraPermission();
        break;
      case 'location':
        granted = await requestLocationPermission();
        break;
      case 'audio':
        // Audio permission is usually granted with microphone
        granted = await requestMicrophonePermission();
        break;
      default:
        granted = false;
    }

    if (granted) {
      if (permission !== 'location') { // Don't set location here as it's already set in requestLocationPermission
        setPermissions(prev => ({
          ...prev,
          [permission]: true
        }));
      }
    } else {
      setError(`Failed to get ${permission} permission. Please try again.`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Check if all permissions are granted
    const allGranted = Object.values(permissions).every(perm => 
      typeof perm === 'object' ? true : Boolean(perm)
    );
    if (!allGranted) {
      setError('Please grant all permissions to continue');
      setLoading(false);
      return;
    }

    try {
      // Store permissions in localStorage
      localStorage.setItem('userPermissions', JSON.stringify(permissions));
      
      // Clear the fromHome flag
      sessionStorage.removeItem('fromHome');
      
      // Navigate to signup page
      navigate('/signup');
    } catch (error) {
      setError('Failed to save permissions. Please try again.');
      console.error('Permission save error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Required Permissions
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please grant the following permissions to continue
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="space-y-4">
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handlePermissionChange('microphone')}
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    permissions.microphone ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                >
                  {permissions.microphone ? '✓' : '🎤'}
                </button>
                <label className="ml-2 block text-sm text-gray-900">
                  Microphone Access
                </label>
              </div>

              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handlePermissionChange('camera')}
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    permissions.camera ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                >
                  {permissions.camera ? '✓' : '📹'}
                </button>
                <label className="ml-2 block text-sm text-gray-900">
                  Camera Access
                </label>
              </div>

              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handlePermissionChange('location')}
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    permissions.location ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                >
                  {permissions.location ? '✓' : '📍'}
                </button>
                <label className="ml-2 block text-sm text-gray-900">
                  Location Access
                </label>
              </div>

              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handlePermissionChange('audio')}
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    permissions.audio ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                >
                  {permissions.audio ? '✓' : '🔊'}
                </button>
                <label className="ml-2 block text-sm text-gray-900">
                  Audio Access
                </label>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || !Object.values(permissions).every(Boolean)}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                Object.values(permissions).every(Boolean)
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-400 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loading ? 'Processing...' : 'Continue to Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PermissionRequest; 