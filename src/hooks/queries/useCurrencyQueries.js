import { useQuery } from '@tanstack/react-query';
import { useCurrencyStore } from '../../store/useCurrencyStore';
import { currencyService } from '../../services/currencyService';

/**
 * Currency Query Hooks
 * 
 * React Query hooks for currency and exchange rates.
 * These consume currencyService for exchange rate data.
 */

/**
 * Exchange rates query hook
 * Fetches live exchange rates for the base currency
 * @param {string} baseCurrency - Base currency code (default: 'USD')
 * @returns {Object} React Query query object with exchange rates
 */
export const useExchangeRates = (baseCurrency = 'USD') => {
    return useQuery({
        queryKey: ['exchangeRates', baseCurrency],
        queryFn: async () => {
            return await currencyService.getExchangeRates(baseCurrency);
        },
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
        refetchInterval: 15 * 60 * 1000, // Refetch every 15 minutes
        retry: 2
    });
};

/**
 * Currency conversion helper hook
 * Converts and formats amounts using current exchange rates
 * @returns {Object} Conversion and formatting utilities
 */
export const useCurrencyConversion = () => {
    const { currentCurrency } = useCurrencyStore();
    const { data: ratesData, isLoading, error } = useExchangeRates('USD');

    const convertAndFormat = (amount, fromCurrency = 'USD') => {
        if (!ratesData?.rates || !amount) return '';

        const converted = currencyService.convertAmount(
            amount,
            fromCurrency,
            currentCurrency,
            ratesData.rates
        );

        return currencyService.formatCurrency(converted, currentCurrency);
    };

    const convert = (amount, fromCurrency = 'USD') => {
        if (!ratesData?.rates || !amount) return 0;

        return currencyService.convertAmount(
            amount,
            fromCurrency,
            currentCurrency,
            ratesData.rates
        );
    };

    const format = (amount, currency = currentCurrency) => {
        return currencyService.formatCurrency(amount, currency);
    };

    return {
        convertAndFormat,
        convert,
        format,
        currentCurrency,
        rates: ratesData?.rates,
        isLoading,
        error
    };
};
