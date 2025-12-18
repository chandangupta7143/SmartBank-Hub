import { describe, it, expect } from 'vitest';
import { mockAuth } from '../api/mock/auth';

describe('Auth Logic (Mock)', () => {
    it('login succeeds with admin credentials', async () => {
        const user = await mockAuth.login('admin@smartbank.com', 'admin123');
        expect(user).toBeDefined();
        expect(user.email).toBe('admin@smartbank.com');
        expect(user.role).toBe('admin');
    });

    it('login fails with wrong password', async () => {
        await expect(mockAuth.login('admin@smartbank.com', 'wrongpass')).rejects.toThrow();
    });

    it('signup creates a new user', async () => {
        const email = `test-${Date.now()}@example.com`;
        const user = await mockAuth.signup('Test User', email, 'password123');
        expect(user.id).toBeDefined();
        expect(user.email).toBe(email);
    });
});
