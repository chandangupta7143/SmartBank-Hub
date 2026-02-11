import { api } from '../api/client';

/**
 * User Service
 * 
 * This service handles user profile and settings operations.
 * Currently uses MOCK implementation with localStorage.
 * 
 * TODO: Replace mock calls with real Spring Boot API endpoints when backend is ready
 * 
 * Expected Spring Boot endpoints:
 * - GET /api/users/profile
 * - PUT /api/users/profile
 * - GET /api/users/{id}
 * - PUT /api/users/{id}/settings
 */

const USE_MOCK = import.meta.env.VITE_USE_MOCKS === 'true';

export const userService = {
    /**
     * Get user profile
     * @param {string} userId - User ID
     * @returns {Promise<Object>} User profile data
     */
    getProfile: async (userId) => {
        if (USE_MOCK) {
            // MOCK: Simulate network delay
            await new Promise(r => setTimeout(r, 300));

            // Get from localStorage
            const storage = JSON.parse(localStorage.getItem('smartbank-storage') || '{}');
            const currentUser = storage?.state?.user;

            if (!currentUser) {
                throw new Error('User not authenticated');
            }

            return {
                id: currentUser.id,
                name: currentUser.name,
                email: currentUser.email,
                role: currentUser.role || 'user',
                avatar: currentUser.avatar || null,
                createdAt: currentUser.createdAt || new Date().toISOString()
            };
        }

        // TODO: Replace with real API call when Spring Boot backend is ready
        // const response = await api.get(`/api/users/${userId}/profile`);
        // return response.data;

        throw new Error('Real API not implemented yet');
    },

    /**
     * Update user profile
     * @param {string} userId - User ID
     * @param {Object} data - Updated profile data
     * @returns {Promise<Object>} Updated user profile
     */
    updateProfile: async (userId, data) => {
        if (USE_MOCK) {
            // MOCK: Simulate network delay
            await new Promise(r => setTimeout(r, 500));

            // Get from localStorage
            const storage = JSON.parse(localStorage.getItem('smartbank-storage') || '{}');

            if (!storage?.state?.user) {
                throw new Error('User not authenticated');
            }

            // Update user in storage
            const updatedUser = {
                ...storage.state.user,
                ...data
            };

            storage.state.user = updatedUser;
            localStorage.setItem('smartbank-storage', JSON.stringify(storage));

            return updatedUser;
        }

        // TODO: Replace with real API call when Spring Boot backend is ready
        // const response = await api.put(`/api/users/${userId}/profile`, data);
        // return response.data;

        throw new Error('Real API not implemented yet');
    },

    /**
     * Get user settings/preferences
     * @param {string} userId - User ID
     * @returns {Promise<Object>} User settings
     */
    getSettings: async (userId) => {
        if (USE_MOCK) {
            // MOCK: Simulate network delay
            await new Promise(r => setTimeout(r, 300));

            const settingsKey = `smartbank_settings_${userId}`;
            const settings = JSON.parse(localStorage.getItem(settingsKey) || '{}');

            return {
                notifications: settings.notifications !== false,
                twoFactorAuth: settings.twoFactorAuth || false,
                emailAlerts: settings.emailAlerts !== false,
                ...settings
            };
        }

        // TODO: Replace with real API call when Spring Boot backend is ready
        // const response = await api.get(`/api/users/${userId}/settings`);
        // return response.data;

        throw new Error('Real API not implemented yet');
    },

    /**
     * Update user settings/preferences
     * @param {string} userId - User ID
     * @param {Object} settings - Updated settings
     * @returns {Promise<Object>} Updated settings
     */
    updateSettings: async (userId, settings) => {
        if (USE_MOCK) {
            // MOCK: Simulate network delay
            await new Promise(r => setTimeout(r, 500));

            const settingsKey = `smartbank_settings_${userId}`;
            const currentSettings = JSON.parse(localStorage.getItem(settingsKey) || '{}');

            const updatedSettings = {
                ...currentSettings,
                ...settings
            };

            localStorage.setItem(settingsKey, JSON.stringify(updatedSettings));

            return updatedSettings;
        }

        // TODO: Replace with real API call when Spring Boot backend is ready
        // const response = await api.put(`/api/users/${userId}/settings`, settings);
        // return response.data;

        throw new Error('Real API not implemented yet');
    }
};
