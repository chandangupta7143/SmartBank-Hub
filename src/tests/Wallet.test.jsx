import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import WalletCard from '../components/WalletCard';

// Tiny mock of WalletCard to test interactions
describe('WalletCard', () => {
    it('renders balance correctly', () => {
        render(<WalletCard balance={100} currency="USD" onDeposit={() => { }} onWithdraw={() => { }} />);
        expect(screen.getByText(/100/i)).toBeDefined(); // Simple check
    });

    it('toggles visibility', () => {
        render(<WalletCard balance={100} currency="USD" onDeposit={() => { }} onWithdraw={() => { }} />);
        const toggleBtn = screen.getByText('Hide');
        fireEvent.click(toggleBtn);
        expect(screen.getByText('Show')).toBeDefined();
        expect(screen.getByText('••••••')).toBeDefined();
    });

    it('triggers action on click', () => {
        const handleDeposit = vi.fn();
        render(<WalletCard balance={100} currency="USD" onDeposit={handleDeposit} onWithdraw={() => { }} />);
        const depositBtn = screen.getByText('Deposit');
        fireEvent.click(depositBtn);
        expect(handleDeposit).toHaveBeenCalled();
    });
});
