
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { convertAmount, toCents, fromCents, formatCurrency } from '../utils/currencyMath';
import { useCurrencyStore } from '../store/useCurrencyStore';

describe('Currency Math Utilities', () => {
    it('convertAmount should correctly convert rates', () => {
        expect(convertAmount(100, 1.2)).toBe(120); // 100 * 1.2
        expect(convertAmount(100, 0.8)).toBe(80);  // 100 * 0.8
        expect(convertAmount(0, 1.5)).toBe(0);
    });

    it('toCents should handle floating point precision', () => {
        expect(toCents(10.50)).toBe(1050);
        expect(toCents(10.5)).toBe(1050);
        expect(toCents(0.01)).toBe(1);
    });

    it('formatCurrency should output localized strings', () => {
        // Note: Actual output depends on Node locale, but we expect $ or symbol
        const usd = formatCurrency(100, 'USD');
        expect(usd).toContain('100.00');
        expect(usd).toMatch(/\$|USD/);
    });
});

describe('useCurrencyStore', () => {
    beforeEach(() => {
        useCurrencyStore.setState({
            currentCurrency: 'USD',
            rates: { USD: 1, EUR: 0.9, INR: 80 },
            baseCurrency: 'USD'
        });
    });

    it('should set currency', () => {
        const store = useCurrencyStore.getState();
        store.setCurrency('EUR');
        expect(useCurrencyStore.getState().currentCurrency).toBe('EUR');
    });

    it('convertAndFormat should handle USD to INR', () => {
        const store = useCurrencyStore.getState();
        store.setCurrency('INR');

        // Mock get logic if needed, but we test the store function
        const formatted = store.convertAndFormat(10, 'USD'); // 10 USD -> 800 INR
        expect(formatted).toContain('800');
    });

    it('convertAndFormat should handle cross conversion (EUR -> INR)', () => {
        const store = useCurrencyStore.getState();
        store.setCurrency('INR'); // Target

        // 10 EUR -> ?
        // 10 EUR / 0.9 = 11.111 USD
        // 11.111 USD * 80 = 888.88 INR
        const formatted = store.convertAndFormat(10, 'EUR');
        expect(formatted).toContain('888'); // Approximate check
    });
});
