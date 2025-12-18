import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { fetchExchangeRates } from '../api/exchangeClient';
import { convertAmount } from '../utils/currencyMath';
import safeStorage from '../utils/storage';

export const useCurrencyStore = create(
    persist(
        (set, get) => ({
            currentCurrency: 'INR',
            baseCurrency: 'USD',
            rates: { USD: 1 }, // Empty initially, fetch will populate
            lastUpdated: null,
            isLoading: false,
            error: null,

            setCurrency: (currency) => {
                set({ currentCurrency: currency });
            },

            fetchRates: async () => {
                set({ isLoading: true, error: null });
                try {
                    const data = await fetchExchangeRates('USD');
                    set({
                        rates: data.rates,
                        baseCurrency: data.base || 'USD',
                        lastUpdated: Date.now(),
                        isLoading: false
                    });
                } catch (err) {
                    set({ error: err.message, isLoading: false });
                }
            },

            // Helper to get formatted converted value
            convertAndFormat: (amount, fromCurrency = 'USD') => {
                const state = get();
                const toCurrency = state.currentCurrency;

                // Handle undefined/null gracefully
                if (amount === undefined || amount === null) return '';

                const rateFrom = (state.rates && state.rates[fromCurrency]) || 1;
                const rateTo = (state.rates && state.rates[toCurrency]) || 1;

                // 1. Convert to Base (USD)
                const inBase = amount / rateFrom;

                // 2. Convert to Target
                const converted = inBase * rateTo;

                return new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: toCurrency,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }).format(converted);
            },

            getRate: (currency) => {
                const state = get();
                return (state.rates && state.rates[currency]) || 1;
            }
        }),
        {
            name: 'smartbank-currency-storage',
            storage: createJSONStorage(() => safeStorage),
            version: 4, // Increment version to clear old manual rates
            partialize: (state) => ({
                currentCurrency: state.currentCurrency,
                rates: state.rates,
                lastUpdated: state.lastUpdated
            }),
            migrate: (persistedState, version) => {
                if (version < 4) {
                    // Reset to clean state for live fetch
                    return {
                        currentCurrency: 'INR',
                        baseCurrency: 'USD',
                        rates: { USD: 1 },
                        lastUpdated: null,
                        isLoading: false,
                        error: null
                    };
                }
                return persistedState;
            },
        }
    )
);
