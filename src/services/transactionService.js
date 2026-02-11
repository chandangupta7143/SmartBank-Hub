import { api } from '../api/client';
import { v4 as uuidv4 } from 'uuid';

/**
 * Transaction Service
 * 
 * This service handles all transaction operations.
 * Currently uses MOCK implementation with local state.
 * 
 * TODO: Replace mock calls with real Spring Boot API endpoints when backend is ready
 * 
 * Expected Spring Boot endpoints:
 * - GET /api/transactions?page={page}&size={size}
 * - POST /api/transactions/transfer
 * - GET /api/transactions/{id}
 */

const USE_MOCK = import.meta.env.VITE_USE_MOCKS === 'true';

// MOCK: In-memory transaction storage
// In real implementation, this will come from backend database
let mockTransactions = [];

export const transactionService = {
    /**
     * Get paginated list of transactions
     * @param {number} page - Page number (0-indexed)
     * @param {number} pageSize - Items per page
     * @returns {Promise<{items: Array, nextPage: number|undefined}>}
     */
    getTransactions: async ({ page = 0, pageSize = 10 }) => {
        if (USE_MOCK) {
            // MOCK: Simulate network delay
            await new Promise(r => setTimeout(r, 600));

            // Get from localStorage for persistence across sessions
            const userId = JSON.parse(localStorage.getItem('smartbank-storage') || '{}')?.state?.user?.id;
            const userKey = `smartbank_transactions_${userId}`;
            const storedTxs = JSON.parse(localStorage.getItem(userKey) || '[]');

            // Sort by date descending
            const sorted = [...storedTxs].sort((a, b) => new Date(b.date) - new Date(a.date));

            const start = page * pageSize;
            const end = start + pageSize;
            const items = sorted.slice(start, end);

            return {
                items,
                nextPage: end < sorted.length ? page + 1 : undefined
            };
        }

        // TODO: Replace with real API call when Spring Boot backend is ready
        // const response = await api.get('/api/transactions', { 
        //     params: { page, size: pageSize }
        // });
        // return {
        //     items: response.data.content,
        //     nextPage: response.data.last ? undefined : page + 1
        // };

        throw new Error('Real API not implemented yet');
    },

    /**
     * Create a transfer transaction
     * @param {number} amount - Amount to transfer
     * @param {string} recipientId - Recipient identifier
     * @param {string} idempotencyKey - Unique key to prevent duplicate transactions
     * @returns {Promise<{status: string, tx: Object}>}
     */
    createTransfer: async (amount, recipientId, idempotencyKey) => {
        if (USE_MOCK) {
            // MOCK: Get current user
            const storage = JSON.parse(localStorage.getItem('smartbank-storage') || '{}');
            const currentUser = storage?.state?.user;

            // Demo account restriction
            if (currentUser?.email === 'demo@smartbank.com') {
                throw new Error('It is just a demo account. You create a new account for transaction.');
            }

            // Get user-specific transactions
            const userKey = `smartbank_transactions_${currentUser?.id}`;
            const storedTxs = JSON.parse(localStorage.getItem(userKey) || '[]');

            // Idempotency check
            if (storedTxs.some(t => t.idempotencyKey === idempotencyKey)) {
                console.warn(`[TransactionService] Duplicate transaction ignored: ${idempotencyKey}`);
                return { status: 'DUPLICATE_IGNORED' };
            }

            // Simulate processing time
            await new Promise(r => setTimeout(r, 1000));

            // Create new transaction
            const newTx = {
                id: uuidv4(),
                type: 'transfer',
                amount: parseFloat(amount),
                currency: 'USD',
                description: `Transfer to ${recipientId}`,
                category: 'Transfer',
                date: new Date().toISOString(),
                status: 'completed',
                recipient: { name: recipientId },
                idempotencyKey
            };

            // Save to localStorage
            storedTxs.push(newTx);
            localStorage.setItem(userKey, JSON.stringify(storedTxs));

            return { status: 'COMPLETED', tx: newTx };
        }

        // TODO: Replace with real API call when Spring Boot backend is ready
        // const response = await api.post('/api/transactions/transfer', {
        //     amount,
        //     recipientId,
        //     idempotencyKey
        // });
        // return response.data;

        throw new Error('Real API not implemented yet');
    },

    /**
     * Add a transaction (for wallet operations like deposit/withdraw)
     * @param {Object} transaction - Transaction object
     * @returns {Promise<Object>}
     */
    addTransaction: async (transaction) => {
        if (USE_MOCK) {
            // MOCK: Get current user
            const storage = JSON.parse(localStorage.getItem('smartbank-storage') || '{}');
            const currentUser = storage?.state?.user;

            // Get user-specific transactions
            const userKey = `smartbank_transactions_${currentUser?.id}`;
            const storedTxs = JSON.parse(localStorage.getItem(userKey) || '[]');

            // Add transaction with ID if not present
            const txWithId = {
                id: uuidv4(),
                ...transaction,
                date: transaction.date || new Date().toISOString(),
                status: transaction.status || 'completed'
            };

            storedTxs.push(txWithId);
            localStorage.setItem(userKey, JSON.stringify(storedTxs));

            return txWithId;
        }

        // TODO: Replace with real API call when Spring Boot backend is ready
        throw new Error('Real API not implemented yet');
    }
};
