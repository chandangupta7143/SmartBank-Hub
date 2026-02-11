import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import safeStorage from '../utils/storage';

/**
 * Main UI State Store
 * 
 * IMPORTANT: This store should ONLY contain UI/client-side state.
 * Server data (wallet, transactions, etc.) should be managed by React Query hooks.
 * 
 * This store manages:
 * - Theme preferences
 * - Authentication UI state (user info, auth status)
 * - UI preferences (privacy mode, etc.)
 */

export const useStore = create(
    persist(
        (set, get) => ({
            // ============================================
            // THEME STATE (UI Only)
            // ============================================
            theme: 'dark',
            toggleTheme: () => set((state) => {
                const newTheme = state.theme === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', newTheme);
                return { theme: newTheme };
            }),

            // ============================================
            // AUTHENTICATION STATE (UI Only)
            // ============================================
            user: null, // { id, name, email, token, role, avatar }
            isAuthenticated: false,

            /**
             * Login user - updates authentication state
             * NOTE: Actual API call happens in authService
             */
            login: (user) => {
                console.log(`[Store] Logging in user: ${user.email} (${user.id})`);
                set({
                    user,
                    isAuthenticated: true
                });
            },

            /**
             * Logout user - clears authentication state
             * NOTE: Does NOT save/restore wallet data anymore
             * Server data is managed by React Query
             */
            logout: () => {
                console.log(`[Store] Logging out user`);
                set({
                    user: null,
                    isAuthenticated: false,
                    showPrivacyMode: false // Reset UI preferences on logout
                });
            },

            // ============================================
            // UI PREFERENCES
            // ============================================
            showPrivacyMode: false,
            togglePrivacyMode: () => set((state) => ({
                showPrivacyMode: !state.showPrivacyMode
            }))
        }),
        {
            name: 'smartbank-storage',
            storage: createJSONStorage(() => safeStorage),
            version: 4, // Incremented version to clear old state
            partialize: (state) => ({
                // Only persist these UI-related fields
                theme: state.theme,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                showPrivacyMode: state.showPrivacyMode
            }),
            migrate: (persistedState, version) => {
                // Migration for old versions - clean slate
                if (version < 4) {
                    return {
                        theme: 'dark',
                        user: null,
                        isAuthenticated: false,
                        showPrivacyMode: false
                    };
                }
                return persistedState;
            },
            onRehydrateStorage: () => (state) => {
                if (state?.theme) {
                    document.documentElement.setAttribute('data-theme', state.theme);
                }
            }
        }
    )
);
