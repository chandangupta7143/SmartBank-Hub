import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

import { MockDB, STORAGE_KEYS } from '../../api/mock/db';

// Helper to sync users from main DB to Admin view
const getSyncedUsers = () => {
    try {
        const dbUsers = MockDB.get(STORAGE_KEYS.USERS) || [];
        return dbUsers.map(u => ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            // Default admin view props if not present
            kycStatus: u.kycStatus || 'pending',
            balance: u.balance || 0.00,
            status: u.status || 'active',
            joined: u.createdAt || new Date().toISOString()
        }));
    } catch (e) {
        return [];
    }
};

const generateMockKYC = () => []; // Clear mock KYC for now

const generateAuditLogs = () => [
    { id: 'log-1', admin: 'superadmin', action: 'SYSTEM_INIT', target: 'System', details: 'Admin portal initialized', timestamp: new Date().toISOString() }
];

export const useAdminStore = create(
    persist(
        (set, get) => ({
            // --- Auth State ---
            adminToken: null,
            adminUser: null, // { id, name, role: 'super-admin' | 'viewer' }
            isAdminAuthenticated: false,

            // --- Mock Database State ---
            users: getSyncedUsers(),
            kycQueue: generateMockKYC(),
            auditLogs: generateAuditLogs(),
            settings: {
                maintenanceMode: false,
                allowSignup: true,
                featureFlags: {
                    qrPayments: true,
                    crypto: false
                }
            },

            // --- Actions ---

            // Auth
            login: (email, password) => {
                // Mock Login - Hardcoded for demo
                if (email === 'chandangupta7143@gmail.com' && password === '#Chandangupta@7143') {
                    set({
                        adminToken: 'mock-admin-token-' + Date.now(),
                        adminUser: { id: 'admin-1', name: 'Super Admin', role: 'super-admin' },
                        isAdminAuthenticated: true,
                        users: getSyncedUsers() // Refresh list on login
                    });
                    get().logAction('LOGIN', 'Self', 'Admin logged in');
                    return true;
                }
                return false;
            },

            logout: () => {
                get().logAction('LOGOUT', 'Self', 'Admin logged out');
                set({ adminToken: null, adminUser: null, isAdminAuthenticated: false });
            },

            // Audit Helper
            logAction: (action, target, details) => {
                const newLog = {
                    id: uuidv4(),
                    admin: get().adminUser?.name || 'Unknown',
                    action,
                    target,
                    details,
                    timestamp: new Date().toISOString()
                };
                set(state => ({ auditLogs: [newLog, ...state.auditLogs] }));
            },

            // User Management
            updateUserStatus: (userId, status) => {
                set(state => ({
                    users: state.users.map(u => u.id === userId ? { ...u, status } : u)
                }));
                get().logAction('UPDATE_USER', userId, `Status changed to ${status}`);
            },

            updateUserBalance: (userId, amount, reason) => {
                set(state => ({
                    users: state.users.map(u => u.id === userId ? { ...u, balance: parseFloat(amount) } : u)
                }));
                get().logAction('UPDATE_BALANCE', userId, `Balance set to ${amount}. Reason: ${reason}`);
            },

            // KYC Management
            approveKYC: (kycId) => {
                const kyc = get().kycQueue.find(k => k.id === kycId);
                if (kyc) {
                    set(state => ({
                        kycQueue: state.kycQueue.filter(k => k.id !== kycId),
                        users: state.users.map(u => u.id === kyc.userId ? { ...u, kycStatus: 'verified' } : u)
                    }));
                    get().logAction('KYC_APPROVE', kyc.userId, 'KYC Approved');
                }
            },

            rejectKYC: (kycId, reason) => {
                const kyc = get().kycQueue.find(k => k.id === kycId);
                if (kyc) {
                    set(state => ({
                        kycQueue: state.kycQueue.filter(k => k.id !== kycId),
                        users: state.users.map(u => u.id === kyc.userId ? { ...u, kycStatus: 'rejected' } : u)
                    }));
                    get().logAction('KYC_REJECT', kyc.userId, `KYC Rejected: ${reason}`);
                }
            },

            // System Settings
            toggleMaintenance: () => {
                set(state => {
                    const newMode = !state.settings.maintenanceMode;
                    get().logAction('SYSTEM_SETTING', 'Maintenance', `Maintenance mode ${newMode ? 'ENABLED' : 'DISABLED'}`);
                    return { settings: { ...state.settings, maintenanceMode: newMode } };
                });
            }
        }),
        {
            name: 'fusion-admin-storage', // Separate from user storage
            storage: createJSONStorage(() => localStorage),
            version: 2, // Bump version to invalidate old cache (Alice/Bob)
            partialize: (state) => ({
                // Only persist auth state and settings, NOT the users list (it should always sync from DB)
                adminToken: state.adminToken,
                adminUser: state.adminUser,
                isAdminAuthenticated: state.isAdminAuthenticated,
                settings: state.settings,
                auditLogs: state.auditLogs
            }),
        }
    )
);
