/**
 * Exchange Rate API Client
 * Handles fetching and caching of currency rates.
 * NOW USES LIVE OPEN API ONLY.
 */

const API_URL = import.meta.env.VITE_EXCHANGE_API_URL || 'https://open.er-api.com/v6/latest/USD';
const CACHE_KEY = 'currency_rates_v3';
const CACHE_TTL = parseInt(import.meta.env.VITE_EXCHANGE_CACHE_TTL_MS || '3600000', 10); // 1 hour

import safeStorage from '../utils/storage';

const getCachedRates = () => {
    try {
        const cached = safeStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp > CACHE_TTL) {
            safeStorage.removeItem(CACHE_KEY);
            return null;
        }
        return data;
    } catch (e) {
        return null;
    }
};

const setCachedRates = (data) => {
    safeStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data
    }));
};

export const fetchExchangeRates = async (base = 'USD') => {
    // 1. Check Cache
    const cached = getCachedRates();
    if (cached) {
        return cached;
    }

    // 2. Fetch Live
    try {
        console.log('Fetching live rates from:', API_URL);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        // Validation
        if (!data.rates || !data.rates['EUR']) throw new Error('Invalid API response');

        setCachedRates(data);
        return data;
    } catch (error) {
        console.error('Exchange API failed:', error);
        throw error; // Propagate error, do not use manual fallbacks
    }
};
