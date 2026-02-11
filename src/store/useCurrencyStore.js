import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import safeStorage from '../utils/storage';

/**
 * Currency Preference Store
 * 
 * IMPORTANT: This store should ONLY contain UI preference for currency selection.
 * Exchange rates and conversions are managed by React Query via currencyService.
 * 
 * This store manages:
 * - User's selected display currency
 */

export const useCurrencyStore = create(
    persist(
        (set, get) => ({
            // ============================================
            // CURRENCY PREFERENCE (UI Only)
            // ============================================
            currentCurrency: 'INR',

            /**
             * Set user's preferred display currency
             * @param {string} currency - Currency code (e.g., 'USD', 'INR', 'EUR')
             */
            setCurrency: (currency) => {
                set({ currentCurrency: currency });
            }
        }),
        {
            name: 'smartbank-currency-storage',
            storage: createJSONStorage(() => safeStorage),
            version: 5, // Incremented to clear old rate data
            partialize: (state) => ({
                // Only persist the UI preference
                currentCurrency: state.currentCurrency
            }),
            migrate: (persistedState, version) => {
                // Migration - clean slate, remove old rate data
                if (version < 5) {
                    return {
                        currentCurrency: 'INR'
                    };
                }
                return persistedState;
            }
        }
    )
);
