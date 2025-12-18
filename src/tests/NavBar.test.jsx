import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../components/navbar/NavBar';

// Mock hook dependencies
vi.mock('../hooks/useAuth', () => ({
    useAuth: () => ({ user: null, logout: vi.fn() })
}));

vi.mock('../hooks/useScrollDirection', () => ({
    useScrollDirection: () => 'up'
}));

// Mock Currency Selector to avoid complex dependencies
vi.mock('../components/CurrencySelector', () => ({
    default: () => <div data-testid="currency-selector">USD</div>
}));

describe('NavBar Component', () => {
    it('renders the brand logo and text', () => {
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        );
        expect(screen.getByText('Fusion Finance')).toBeDefined();
        expect(screen.getByText('Global')).toBeDefined();
    });

    it('renders navigation links on desktop', () => {
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        );
        expect(screen.getByText('Products')).toBeDefined();
        expect(screen.getByText('Pricing')).toBeDefined();
    });

    it('opens mobile menu when hamburger is clicked', () => {
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        );

        // Find hamburger (lucide-react Menu icon usually renders an svg, wrapper is the button)
        // We'll look for the button role
        const buttons = screen.getAllByRole('button');
        const hamburger = buttons.find(b => b.className.includes('lg:hidden'));

        if (hamburger) {
            fireEvent.click(hamburger);
            // Check if sheet opened (look for text inside the sheet)
            expect(screen.getByText('Quick Actions')).toBeDefined();
        }
    });
});
