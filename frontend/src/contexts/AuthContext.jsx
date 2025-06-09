const register = async (phoneNumber, name, email, password, userType, permissions) => {
  try {
    // Ensure location data is properly formatted
    if (permissions && permissions.location) {
      if (typeof permissions.location === 'boolean') {
        permissions.location = {
          name: 'Location permission granted',
          coordinates: {
            latitude: 0,
            longitude: 0
          }
        };
      } else if (typeof permissions.location === 'object') {
        // Ensure coordinates are numbers
        permissions.location.coordinates = {
          latitude: Number(permissions.location.coordinates.latitude) || 0,
          longitude: Number(permissions.location.coordinates.longitude) || 0
        };
      }
    }

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber,
        name,
        email,
        password,
        userType,
        permissions
      })
    });

    const data = await response.json();
    console.log('Registration response:', data);

    if (data.success) {
      return { success: true, userId: data.userId };
    } else {
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Registration failed' };
  }
}; 