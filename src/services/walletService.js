import { api } from '../api/client';
import { transactionService } from './transactionService';
import { v4 as uuidv4 } from 'uuid';

/**
 * Wallet Service
 * 
 * This service handles wallet balance and operations.
 * Currently uses MOCK implementation with localStorage.
 * 
 * TODO: Replace mock calls with real Spring Boot API endpoints when backend is ready
 * 
 * Expected Spring Boot endpoints:
 * - GET /api/wallet/balance
 * - POST /api/wallet/deposit
 * - POST /api/wallet/withdraw
 */

const USE_MOCK = import.meta.env.VITE_USE_MOCKS === 'true';

export const walletService = {
    /**
     * Get wallet balance for current user
     * @returns {Promise<{balance: number, currency: string}>}
     */
    getBalance: async () => {
        if (USE_MOCK) {
            // MOCK: Simulate network delay
            await new Promise(r => setTimeout(r, 300));

            // Get from localStorage
            const storage = JSON.parse(localStorage.getItem('smartbank-storage') || '{}');
            const currentUser = storage?.state?.user;

            if (!currentUser) {
                throw new Error('User not authenticated');
            }

            const walletKey = `smartbank_wallet_${currentUser.id}`;
            const wallet = JSON.parse(localStorage.getItem(walletKey) || '{"balance": 0, "currency": "USD"}');

            return wallet;
        }

        // TODO: Replace with real API call when Spring Boot backend is ready
        // const response = await api.get('/api/wallet/balance');
        // return response.data;

        throw new Error('Real API not implemented yet');
    },

    /**
     * Update wallet balance (internal helper)
     * @param {number} newBalance - New balance amount
     * @returns {Promise<{balance: number, currency: string}>}
     */
    updateBalance: async (newBalance) => {
        if (USE_MOCK) {
            const storage = JSON.parse(localStorage.getItem('smartbank-storage') || '{}');
            const currentUser = storage?.state?.user;

            if (!currentUser) {
                throw new Error('User not authenticated');
            }

            const walletKey = `smartbank_wallet_${currentUser.id}`;
            const wallet = { balance: newBalance, currency: 'USD' };
            localStorage.setItem(walletKey, JSON.stringify(wallet));

            return wallet;
        }

        throw new Error('Real API not implemented yet');
    },

    /**
     * Deposit money into wallet
     * @param {number} amount - Amount to deposit
     * @returns {Promise<{balance: number, transaction: Object}>}
     */
    deposit: async (amount) => {
        if (USE_MOCK) {
            // MOCK: Simulate processing time
            const delay = Math.random() * 2000 + 1000; // 1-3s
            await new Promise(r => setTimeout(r, delay));

            // Get current balance
            const currentWallet = await walletService.getBalance();
            const newBalance = currentWallet.balance + parseFloat(amount);

            // Update balance
            await walletService.updateBalance(newBalance);

            // Create transaction record
            const transaction = {
                id: uuidv4(),
                type: 'deposit',
                amount: parseFloat(amount),
                currency: 'USD',
                description: 'Manual Deposit',
                category: 'Wallet',
                date: new Date().toISOString(),
                status: 'completed'
            };

            // Add transaction to history
            await transactionService.addTransaction(transaction);

            return {
                balance: newBalance,
                transaction
            };
        }

        // TODO: Replace with real API call when Spring Boot backend is ready
        // const response = await api.post('/api/wallet/deposit', { amount });
        // return response.data;

        throw new Error('Real API not implemented yet');
    },

    /**
     * Withdraw money from wallet
     * @param {number} amount - Amount to withdraw
     * @returns {Promise<{balance: number, transaction: Object}>}
     */
    withdraw: async (amount) => {
        if (USE_MOCK) {
            // MOCK: Simulate processing time
            const delay = Math.random() * 2000 + 1000; // 1-3s
            await new Promise(r => setTimeout(r, delay));

            // Get current balance
            const currentWallet = await walletService.getBalance();

            // Check sufficient funds
            if (currentWallet.balance < parseFloat(amount)) {
                throw new Error('Insufficient funds');
            }

            const newBalance = currentWallet.balance - parseFloat(amount);

            // Update balance
            await walletService.updateBalance(newBalance);

            // Create transaction record
            const transaction = {
                id: uuidv4(),
                type: 'withdraw',
                amount: parseFloat(amount),
                currency: 'USD',
                description: 'Manual Withdrawal',
                category: 'Wallet',
                date: new Date().toISOString(),
                status: 'completed'
            };

            // Add transaction to history
            await transactionService.addTransaction(transaction);

            return {
                balance: newBalance,
                transaction
            };
        }

        // TODO: Replace with real API call when Spring Boot backend is ready
        // const response = await api.post('/api/wallet/withdraw', { amount });
        // return response.data;

        throw new Error('Real API not implemented yet');
    }
};
