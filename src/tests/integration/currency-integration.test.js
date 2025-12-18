import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CurrencySelector from '../../components/CurrencySelector';
import HeroCard from '../../components/overview/HeroCard';
import { useCurrencyStore } from '../../store/useCurrencyStore';

// Mock specific store functions if needed, but integration prefers real store logic
// We might need to mock fetch
global.fetch = vi.fn();

describe('Currency Integration', () => {
    beforeEach(() => {
        useCurrencyStore.setState({
            currentCurrency: 'INR',
            rates: { USD: 1, INR: 83.50, EUR: 0.92 },
            baseCurrency: 'USD',
            isLoading: false
        });

        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({
                success: true,
                base: 'USD',
                rates: { USD: 1, INR: 84.00, EUR: 0.90 }
            })
        });
    });

    it('should display default INR balance correctly', () => {
        // Render simple HeroCard with USD input
        render(<HeroCard balance={100} currency="USD" onDeposit={() => { }} onWithdraw={() => { }} />);

        // 100 USD * 83.50 = 8350.00 INR
        // Expect INR symbol or formatting
        expect(screen.getByText(/8,350.00/)).toBeDefined();
        // expect(screen.getByText(/₹/)).toBeDefined(); // Might be part of formatted string
    });

    it('should update balance when currency changes', async () => {
        // Render both Selector and Card
        // We need a wrapper to hold them or just render them side-by-side if they share the store (they do)
        const TestWrapper = () => (
            <div>
                <CurrencySelector />
                <HeroCard balance={100} currency="USD" />
            </div>
        );

        render(<TestWrapper />);

        // Initial: INR
        expect(screen.getByText(/8,350.00/)).toBeDefined();

        // Open Selector
        const trigger = screen.getByText('INR');
        fireEvent.click(trigger);

        // Click EUR
        const eurOption = screen.getByText('EUR');
        fireEvent.click(eurOption);

        // Store update happens sync?
        // 100 USD * 0.92 = 92.00 EUR
        await waitFor(() => {
            expect(screen.getByText(/92.00/)).toBeDefined();
        });

        // Check local storage or fetch called?
        expect(useCurrencyStore.getState().currentCurrency).toBe('EUR');
    });
});
