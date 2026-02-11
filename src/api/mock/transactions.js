import { useStore } from '../../store/useStore';
import { v4 as uuidv4 } from 'uuid';
import { subDays } from 'date-fns';

// Use store outside of React
const getStore = () => useStore.getState();

// Helper to seed if empty (for demo experience)
const seedTransactions = () => {
    // Disabled seeding per user request
    return getStore().transactions || [];
};

export const mockTransactions = {
    getList: async ({ pageParam = 0 }) => {
        await new Promise(r => setTimeout(r, 600)); // Simulate net lag

        // Ensure data exists in Store
        let allTxs = seedTransactions();

        // Use store's latest state
        allTxs = getStore().transactions;

        // Sort by date desc (store might be unordered if we pushed new ones)
        const sorted = [...allTxs].sort((a, b) => new Date(b.date) - new Date(a.date));

        const pageSize = 10;
        const start = pageParam * pageSize;
        const end = start + pageSize;
        const items = sorted.slice(start, end);

        return {
            items,
            nextPage: end < sorted.length ? pageParam + 1 : undefined
        };
    },

    addTransaction: (tx) => {
        getStore().addTransaction(tx);
    },

    transfer: async (amount, recipientId, idempotencyKey) => {
        // 0. Demo Restriction Check
        const currentUser = getStore().user;
        if (currentUser?.email === 'demo@smartbank.com') {
            // Return a specific error structure that UI can catch or just throw
            throw new Error('It is just a demo account. You create a new account for transaction.');
        }

        // 1. Idempotency Check
        const allTxs = getStore().transactions || [];
        if (allTxs.some(t => t.idempotencyKey === idempotencyKey)) {
            console.warn(`[MockDB] Duplicate transaction ignored: ${idempotencyKey}`);
            return { status: 'DUPLICATE_IGNORED' };
        }

        // 2. Lock Simulation
        if (window.__MOCK_LOCK_ACTIVE) {
            throw new Error('Concurrency Error: Wallet is locked');
        }
        window.__MOCK_LOCK_ACTIVE = true;

        try {
            await new Promise(r => setTimeout(r, 1000)); // Process time

            const newTx = {
                id: uuidv4(),
                type: 'transfer',
                amount: parseFloat(amount), // Store raw precision to avoid round-trip errors
                currency: 'USD',
                description: `Transfer to ${recipientId}`,
                category: 'Transfer',
                date: new Date().toISOString(),
                status: 'completed',
                recipient: { name: recipientId },
                idempotencyKey
            };

            getStore().addTransaction(newTx);

            return { status: 'COMPLETED', tx: newTx };
        } finally {
            window.__MOCK_LOCK_ACTIVE = false;
        }
    }
};
