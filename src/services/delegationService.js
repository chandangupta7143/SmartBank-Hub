import { mockDelegation } from '../api/mock/delegation';

/**
 * Delegation Service
 * 
 * This service handles delegation operations.
 * Currently uses MOCK implementation.
 * 
 * TODO: Replace with real Spring Boot API endpoints when backend is ready
 * 
 * Expected Spring Boot endpoints:
 * - GET /api/delegation/delegates
 * - POST /api/delegation/delegates
 * - DELETE /api/delegation/delegates/{id}
 */

const USE_MOCK = import.meta.env.VITE_USE_MOCKS === 'true';

export const delegationService = {
    /**
     * Get all delegates
     * @returns {Promise<Array>}
     */
    getDelegates: async () => {
        if (USE_MOCK) {
            return await mockDelegation.getDelegates();
        }

        // TODO: Replace with real API call when Spring Boot backend is ready
        // const response = await api.get('/api/delegation/delegates');
        // return response.data;

        throw new Error('Real API not implemented yet');
    },

    /**
     * Add a new delegate
     * @param {string} name - Delegate name
     * @param {number} limit - Daily spending limit
     * @returns {Promise<Object>}
     */
    addDelegate: async (name, limit) => {
        if (USE_MOCK) {
            return await mockDelegation.addDelegate(name, limit);
        }

        // TODO: Replace with real API call when Spring Boot backend is ready
        // const response = await api.post('/api/delegation/delegates', { name, limit });
        // return response.data;

        throw new Error('Real API not implemented yet');
    },

    /**
     * Revoke a delegate
     * @param {string} delegateId - Delegate ID
     * @returns {Promise<void>}
     */
    revokeDelegate: async (delegateId) => {
        if (USE_MOCK) {
            return await mockDelegation.revokeDelegate(delegateId);
        }

        // TODO: Replace with real API call when Spring Boot backend is ready
        // await api.delete(`/api/delegation/delegates/${delegateId}`);

        throw new Error('Real API not implemented yet');
    }
};
