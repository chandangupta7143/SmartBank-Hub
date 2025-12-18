import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import safeStorage from '../utils/storage'

export const useStore = create(
    persist(
        (set) => ({
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
            login: (user) => set({ user, isAuthenticated: true }),
            logout: () => set({ user: null, isAuthenticated: false }),

            // Wallet State (Mock)
            wallet: {
                balance: 0,
                currency: 'USD',
            },
            setBalance: (amount) => set((state) => ({
                wallet: { ...state.wallet, balance: amount }
            })),
            setCurrency: (currency) => set((state) => ({
                wallet: { ...state.wallet, currency }
            })),

            // Transactions State
            transactions: [],
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
            notifications: [],
            addNotification: (note) => set((state) => ({ notifications: [note, ...state.notifications] })),
            clearNotifications: () => set({ notifications: [] }),
            markNotificationRead: (id) => set((state) => ({
                notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
            })),

            // Preferences
            showPrivacyMode: false,
            togglePrivacyMode: () => set((state) => ({ showPrivacyMode: !state.showPrivacyMode })),
        }),
        {
            name: 'smartbank-storage',
            storage: createJSONStorage(() => safeStorage),
            version: 3, // Complete System Reset
            migrate: (persistedState, version) => {
                // Force COMPLETE reset for all users on version jump to 3
                if (version < 3) {
                    return {
                        theme: 'dark', // Reset theme or keep? Resetting to ensure clean slate if user messed it up.
                        user: null,
                        isAuthenticated: false,
                        wallet: {
                            balance: 0,
                            currency: 'USD'
                        },
                        transactions: [],
                        notifications: [],
                        showPrivacyMode: false
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
