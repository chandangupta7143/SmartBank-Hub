import { api } from '../api/client';
import { mockAuth } from '../api/mock/auth';

/**
 * Authentication Service
 * 
 * This service handles all authentication operations.
 * Currently uses MOCK implementation for development.
 * 
 * TODO: Replace mock calls with real Spring Boot API endpoints when backend is ready
 * 
 * Expected Spring Boot endpoints:
 * - POST /api/auth/login
 * - POST /api/auth/signup  
 * - POST /api/auth/refresh
 * - POST /api/auth/logout
 */

const USE_MOCK = import.meta.env.VITE_USE_MOCKS === 'true';

export const authService = {
    /**
     * Login with email and password
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise<{id: string, name: string, email: string, token: string, role: string}>}
     */
    login: async (email, password) => {
        if (USE_MOCK) {
            // MOCK: Using local mock implementation
            return await mockAuth.login(email, password);
        }

        // TODO: Replace with real API call when Spring Boot backend is ready
        // const response = await api.post('/api/auth/login', { email, password });
        // return response.data;

        throw new Error('Real API not implemented yet');
    },

    /**
     * Sign up new user
     * @param {string} name - User full name
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise<{id: string, name: string, email: string, token: string, role: string}>}
     */
    signup: async (name, email, password) => {
        if (USE_MOCK) {
            // MOCK: Using local mock implementation
            return await mockAuth.signup(name, email, password);
        }

        // TODO: Replace with real API call when Spring Boot backend is ready
        // const response = await api.post('/api/auth/signup', { name, email, password });
        // return response.data;

        throw new Error('Real API not implemented yet');
    },

    /**
     * Login as demo user (mock only)
     * @returns {Promise<{id: string, name: string, email: string, token: string, role: string}>}
     */
    loginDemo: async () => {
        console.log('[authService] loginDemo called');
        console.log('[authService] VITE_USE_MOCKS:', import.meta.env.VITE_USE_MOCKS);
        console.log('[authService] USE_MOCK:', USE_MOCK);

        if (USE_MOCK) {
            // MOCK: Demo user for quick testing
            console.log('[authService] Using mock for demo login');
            return await mockAuth.loginDemo();
        }

        console.error('[authService] Mock mode not enabled, throwing error');
        throw new Error('Demo login only available in mock mode');
    },

    /**
     * Get all users (admin only)
     * @returns {Promise<Array>}
     */
    getAllUsers: async () => {
        if (USE_MOCK) {
            // MOCK: Using local mock implementation
            return await mockAuth.getAllUsers();
        }

        // TODO: Replace with real API call when Spring Boot backend is ready
        // const response = await api.get('/api/admin/users');
        // return response.data;

        throw new Error('Real API not implemented yet');
    }
};
