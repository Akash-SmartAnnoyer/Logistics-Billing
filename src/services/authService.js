import api from './api';
import { STORAGE_KEYS } from '../helpers/constants';

// Dummy API endpoints - replace with actual backend URLs when available
const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  REFRESH: '/auth/refresh',
  LOGOUT: '/auth/logout',
  PROFILE: '/auth/profile',
};

// Dummy data for development
const DUMMY_USERS = [
  {
    id: 1,
    email: 'admin@tms.com',
    password: 'Admin123!',
    firstName: 'Admin',
    lastName: 'User',
    phone: '1234567890',
  },
  {
    id: 2,
    email: 'user@tms.com',
    password: 'User123!',
    firstName: 'John',
    lastName: 'Doe',
    phone: '0987654321',
  }
];

export const authService = {
  // Login user
  async login(credentials) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in dummy data
      const user = DUMMY_USERS.find(
        u => u.email === credentials.email && u.password === credentials.password
      );
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // Generate dummy tokens
      const tokens = {
        access_token: `dummy_access_token_${user.id}_${Date.now()}`,
        refresh_token: `dummy_refresh_token_${user.id}_${Date.now()}`,
      };
      
      // Store tokens and user data
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.access_token);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh_token);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
      
      return {
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
          },
          tokens,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Login failed',
      };
    }
  },

  // Register new user
  async signup(userData) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if user already exists
      const existingUser = DUMMY_USERS.find(u => u.email === userData.email);
      if (existingUser) {
        throw new Error('User already exists with this email');
      }
      
      // Create new user
      const newUser = {
        id: DUMMY_USERS.length + 1,
        ...userData,
      };
      
      // Add to dummy data
      DUMMY_USERS.push(newUser);
      
      return {
        success: true,
        data: {
          message: 'Account created successfully',
          user: {
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            phone: newUser.phone,
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Signup failed',
      };
    }
  },

  // Logout user
  async logout() {
    try {
      // Clear local storage
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      
      return {
        success: true,
        data: { message: 'Logged out successfully' },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Logout failed',
      };
    }
  },

  // Get current user
  getCurrentUser() {
    try {
      const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    return !!token;
  },

  // Refresh token (dummy implementation)
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newToken = `dummy_access_token_refreshed_${Date.now()}`;
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newToken);
      
      return {
        success: true,
        data: { access_token: newToken },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Token refresh failed',
      };
    }
  },
};
