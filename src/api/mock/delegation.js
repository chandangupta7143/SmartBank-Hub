import { MockDB, STORAGE_KEYS } from './db';
import { v4 as uuidv4 } from 'uuid';

export const mockDelegation = {
    getDelegates: async () => {
        await new Promise(r => setTimeout(r, 400));
        return MockDB.get(STORAGE_KEYS.DELEGATES) || [];
    },

    addDelegate: async (name, limit) => {
        await new Promise(r => setTimeout(r, 800));
        const delegates = MockDB.get(STORAGE_KEYS.DELEGATES) || [];
        const newDelegate = {
            id: uuidv4(),
            name,
            limit: parseFloat(limit),
            spent: 0,
            expiry: new Date(Date.now() + 86400000 * 7).toISOString(), // +7 days
            active: true
        };
        delegates.push(newDelegate);
        MockDB.set(STORAGE_KEYS.DELEGATES, delegates);
        return newDelegate;
    },

    revokeDelegate: async (id) => {
        await new Promise(r => setTimeout(r, 400));
        const delegates = MockDB.get(STORAGE_KEYS.DELEGATES) || [];
        const updated = delegates.map(d => d.id === id ? { ...d, active: false } : d);
        MockDB.set(STORAGE_KEYS.DELEGATES, updated);
    }
};
