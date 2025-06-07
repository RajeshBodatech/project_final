export const API_BASE_URL = 'http://localhost:5002/api';

export const API_ENDPOINTS = {
  AUTH: {
    REQUEST_OTP: '/auth/request-otp',
    VERIFY_OTP: '/auth/verify-otp',
    LOGIN: '/auth/login'
  },
  CHATS: {
    CREATE: '/chats/create',
    HISTORY: '/chats/:roomId',
    OPENAI: '/chats/openai'
  },
  ADMIN: {
    USERS: '/admin/users',
    DOCTORS: '/admin/doctors',
    CREATE_ADMIN: '/admin/admins',
    UPDATE_PROFILE: '/admin/profile'
  }
};
