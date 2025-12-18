import { create } from 'zustand';
import { useStore } from '../store/useStore';
import { v4 as uuidv4 } from 'uuid';

/**
 * Hook to manage Wallet Logic
 * - Simulates async deposits/withdrawals
 * - Manages status states (PENDING -> COMPLETED)
 */
export const useWallet = () => {
    const { wallet, addTransaction } = useStore();

    // Mock Transaction Processor
    const processTransaction = (type, amount) => {
        return new Promise((resolve, reject) => {
            const delay = Math.random() * 2000 + 1000; // 1-3s delay

            setTimeout(() => {
                if (type === 'withdraw' && wallet.balance < amount) {
                    reject(new Error('Insufficient funds'));
                    return;
                }

                // Create Transaction Record
                // addTransaction in store handles the balance update automatically!
                const tx = {
                    id: uuidv4(),
                    status: 'completed',
                    timestamp: new Date().toISOString(),
                    date: new Date().toISOString(), // Standardize key
                    amount: parseFloat(amount),
                    type: type, // 'deposit' or 'withdraw'
                    description: type === 'deposit' ? 'Manual Deposit' : 'Manual Withdrawal',
                    category: 'Wallet',
                    currency: 'USD' // Actions are in base currency
                };

                addTransaction(tx);
                resolve(tx);
            }, delay);
        });
    };

    return {
        balance: wallet.balance,
        currency: wallet.currency,
        deposit: (amount) => processTransaction('deposit', amount),
        withdraw: (amount) => processTransaction('withdraw', amount),
    };
};
