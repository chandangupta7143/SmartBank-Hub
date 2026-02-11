import { fetchExchangeRates } from '../api/exchangeClient';

/**
 * Currency Service
 * 
 * This service handles currency exchange rates.
 * Uses live exchange rate API (exchangeClient).
 * 
 * This service can remain as-is when backend is ready, or you can
 * proxy through Spring Boot if you want centralized rate caching.
 * 
 * Optional Spring Boot endpoints:
 * - GET /api/currency/rates?base={currency}
 */

export const currencyService = {
    /**
     * Get exchange rates for a base currency
     * @param {string} baseCurrency - Base currency code (e.g., 'USD')
     * @returns {Promise<{base: string, rates: Object, timestamp: number}>}
     */
    getExchangeRates: async (baseCurrency = 'USD') => {
        try {
            // Using existing exchange rate API client
            const data = await fetchExchangeRates(baseCurrency);

            return {
                base: data.base || baseCurrency,
                rates: data.rates,
                timestamp: Date.now()
            };
        } catch (error) {
            console.error('[CurrencyService] Failed to fetch exchange rates:', error);
            throw new Error('Failed to fetch exchange rates');
        }
    },

    /**
     * Convert amount from one currency to another
     * @param {number} amount - Amount to convert
     * @param {string} fromCurrency - Source currency code
     * @param {string} toCurrency - Target currency code  
     * @param {Object} rates - Exchange rates object
     * @returns {number} Converted amount
     */
    convertAmount: (amount, fromCurrency, toCurrency, rates) => {
        if (!rates || !amount) return 0;

        const rateFrom = rates[fromCurrency] || 1;
        const rateTo = rates[toCurrency] || 1;

        // Convert to base currency (USD) first, then to target
        const inBase = amount / rateFrom;
        const converted = inBase * rateTo;

        return converted;
    },

    /**
     * Format amount in specified currency
     * @param {number} amount - Amount to format
     * @param {string} currency - Currency code
     * @returns {string} Formatted currency string
     */
    formatCurrency: (amount, currency = 'USD') => {
        try {
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(amount);
        } catch (error) {
            // Fallback for unsupported currencies
            return `${currency} ${amount.toFixed(2)}`;
        }
    }
};
