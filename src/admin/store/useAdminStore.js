import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

// Mock Data Generators
const generateMockUsers = () => [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'user', kycStatus: 'verified', balance: 1250.50, status: 'active', joined: '2023-11-15' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'user', kycStatus: 'pending', balance: 0.00, status: 'locked', joined: '2023-12-01' },
    { id: '3', name: 'User 3', email: 'user3@example.com', role: 'user', kycStatus: 'rejected', balance: 50.00, status: 'active', joined: '2023-12-10' },
];

const generateMockKYC = () => [
    { id: 'kyc-1', userId: '2', name: 'Bob Smith', docType: 'Passport', status: 'pending', submittedAt: '2023-12-02T10:00:00Z' },
];

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
            users: generateMockUsers(),
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
                if (email === 'admin@fusion.com' && password === 'admin123') {
                    set({
                        adminToken: 'mock-admin-token-' + Date.now(),
                        adminUser: { id: 'admin-1', name: 'Super Admin', role: 'super-admin' },
                        isAdminAuthenticated: true
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
        }
    )
);
