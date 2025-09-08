// Application constants

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const ROUTES = {
  AUTH: '/auth',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
};

export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful! Welcome back.',
  LOGIN_ERROR: 'Invalid credentials. Please try again.',
  SIGNUP_SUCCESS: 'Account created successfully! Please login.',
  SIGNUP_ERROR: 'Failed to create account. Please try again.',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  VALIDATION_ERROR: 'Please fix the errors below.',
};

export const FORM_FIELDS = {
  LOGIN: ['email', 'password'],
  SIGNUP: ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword'],
};
