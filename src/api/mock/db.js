/**
 * Centralized Mock Database
 * Handles persistence to localStorage and initial seed data.
 */

const STORAGE_KEYS = {
    USERS: 'smartbank_users',
    TXS: 'smartbank_transactions',
    CONTACTS: 'smartbank_contacts',
    DELEGATES: 'smartbank_delegates',
    WALLET: 'smartbank_wallet' // Simple single wallet for demo
};

// Seed Data
const SEED_USERS = [
    { id: 'u1', email: 'admin@smartbank.com', password: 'admin123', name: 'Admin User', role: 'admin' },
    { id: 'u2', email: 'demo@smartbank.com', password: 'password', name: 'Demo User', role: 'user' }
];

const SEED_CONTACTS = [
    { id: 'c1', name: 'Alice Star', email: 'alice@star.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
    { id: 'c2', name: 'Bob Comet', email: 'bob@comet.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' },
    { id: 'c3', name: 'Charlie Moon', email: 'charlie@moon.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie' }
];

// DB Helper
export const MockDB = {
    // Generic Get
    get: (key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    // Generic Set
    set: (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    },

    // Initialize
    init: () => {
        if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
        }
        if (!localStorage.getItem(STORAGE_KEYS.CONTACTS)) {
            localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify([]));
        }
        if (!localStorage.getItem(STORAGE_KEYS.DELEGATES)) {
            localStorage.setItem(STORAGE_KEYS.DELEGATES, JSON.stringify([]));
        }
    },

    // Reset
    reset: () => {
        localStorage.clear();
        MockDB.init();
        window.location.reload();
    }
};

// Initialize on load
MockDB.init();

export { STORAGE_KEYS };
