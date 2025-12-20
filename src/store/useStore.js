
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import safeStorage from '../utils/storage'

// Factory function to ensure fresh state references every time
const getInitialUserState = () => ({
    wallet: {
        balance: 0,
        currency: 'USD',
    },
    transactions: [],
    notifications: [],
    showPrivacyMode: false,
});

export const useStore = create(
    persist(
        (set, get) => ({
            // Theme State
            theme: 'dark',
            toggleTheme: () => set((state) => {
                const newTheme = state.theme === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', newTheme);
                return { theme: newTheme };
            }),

            // Auth State
            user: null, // { id, name, email, avatar }
            isAuthenticated: false,

            // Enhanced Login: Load user-specific data
            login: (user) => {
                console.log(`[Store] Logging in user: ${user.email} (${user.id})`);

                // 1. Try to load saved data for this user
                const storageKey = `smartbank_data_${user.id} `;
                const savedDataJson = localStorage.getItem(storageKey);

                // 2. Start with FRESH default state (Deep Copy effectively)
                let userSpecificState = getInitialUserState();

                if (savedDataJson) {
                    try {
                        console.log(`[Store] Found saved data for ${user.id}`);
                        const parsed = JSON.parse(savedDataJson);
                        // Merge saved data with defaults to ensure structure
                        userSpecificState = { ...userSpecificState, ...parsed };
                    } catch (e) {
                        console.error("Failed to load user data", e);
                    }
                } else {
                    console.log(`[Store] No saved data for ${user.id}, starting fresh.`);
                }

                // 3. Atomically set new state
                set({
                    user,
                    isAuthenticated: true,
                    ...userSpecificState
                });
            },

            // Enhanced Logout: Save user data and reset
            logout: () => {
                const state = get();
                const currentUser = state.user;

                if (currentUser && currentUser.id) {
                    console.log(`[Store] Logging out user: ${currentUser.email} `);
                    // 1. Save current user data
                    const dataToSave = {
                        wallet: state.wallet,
                        transactions: state.transactions,
                        notifications: state.notifications,
                        showPrivacyMode: state.showPrivacyMode
                    };
                    const storageKey = `smartbank_data_${currentUser.id} `;
                    localStorage.setItem(storageKey, JSON.stringify(dataToSave));
                }

                // 2. Reset state to FRESH defaults
                console.log(`[Store] Resetting state to defaults.`);
                set({
                    user: null,
                    isAuthenticated: false,
                    ...getInitialUserState()
                });
            },

            // Wallet State (Mock)
            wallet: getInitialUserState().wallet,
            setBalance: (amount) => set((state) => ({
                wallet: { ...state.wallet, balance: amount }
            })),
            setCurrency: (currency) => set((state) => ({
                wallet: { ...state.wallet, currency }
            })),

            // Transactions State
            transactions: getInitialUserState().transactions,
            addTransaction: (tx) => set((state) => ({
                transactions: [tx, ...state.transactions],
                // Update balance if compiled
                wallet: {
                    ...state.wallet,
                    balance: tx.type === 'deposit' || tx.type === 'income'
                        ? state.wallet.balance + parseFloat(tx.amount)
                        : state.wallet.balance - parseFloat(tx.amount)
                }
            })),
            setTransactions: (txs) => set({ transactions: txs }),

            // Notifications State
            notifications: getInitialUserState().notifications,
            addNotification: (note) => set((state) => ({ notifications: [note, ...state.notifications] })),
            clearNotifications: () => set({ notifications: [] }),
            markNotificationRead: (id) => set((state) => ({
                notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
            })),

            // Preferences
            showPrivacyMode: getInitialUserState().showPrivacyMode,
            togglePrivacyMode: () => set((state) => ({ showPrivacyMode: !state.showPrivacyMode })),
        }),
        {
            name: 'smartbank-storage',
            storage: createJSONStorage(() => safeStorage),
            version: 3,
            migrate: (persistedState, version) => {
                if (version < 3) {
                    return {
                        theme: 'dark',
                        user: null,
                        isAuthenticated: false,
                        ...getInitialUserState()
                    };
                }
                return persistedState;
            },
            onRehydrateStorage: () => (state) => {
                if (state?.theme) {
                    document.documentElement.setAttribute('data-theme', state.theme);
                }
            }
        }
    )
)
