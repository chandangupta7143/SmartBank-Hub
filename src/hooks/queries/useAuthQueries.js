import { useMutation } from '@tanstack/react-query';
import { useStore } from '../../store/useStore';
import { authService } from '../../services/authService';
import { loginResponseSchema, signupResponseSchema } from '../../validations/authSchemas';

/**
 * Authentication Query Hooks
 * 
 * React Query hooks for authentication operations.
 * These consume authService and update Zustand auth state.
 */

/**
 * Login mutation hook
 * @returns {Object} React Query mutation object
 */
export const useLogin = () => {
    const { login } = useStore();

    return useMutation({
        mutationFn: async ({ email, password }) => {
            const user = await authService.login(email, password);

            // Validate response with Zod
            const validated = loginResponseSchema.parse(user);
            return validated;
        },
        onSuccess: (user) => {
            // Update Zustand auth state
            login(user);
        }
    });
};

/**
 * Signup mutation hook
 * @returns {Object} React Query mutation object
 */
export const useSignup = () => {
    const { login } = useStore();

    return useMutation({
        mutationFn: async ({ name, email, password }) => {
            const user = await authService.signup(name, email, password);

            // Validate response with Zod
            const validated = signupResponseSchema.parse(user);
            return validated;
        },
        onSuccess: (user) => {
            // Update Zustand auth state (auto-login after signup)
            login(user);
        }
    });
};

/**
 * Demo login mutation hook
 * @returns {Object} React Query mutation object
 */
export const useLoginDemo = () => {
    const { login } = useStore();

    return useMutation({
        mutationFn: async () => {
            console.log('[useLoginDemo] Mutation started');
            const user = await authService.loginDemo();
            console.log('[useLoginDemo] User received from service:', user);

            // Validate response with Zod
            const validated = loginResponseSchema.parse(user);
            console.log('[useLoginDemo] Response validated:', validated);
            return validated;
        },
        onSuccess: (user) => {
            console.log('[useLoginDemo] Login successful, updating Zustand:', user);
            // Update Zustand auth state
            login(user);
        },
        onError: (error) => {
            console.error('[useLoginDemo] Login failed:', error);
        }
    });
};

/**
 * Logout helper (not a mutation since it's local only)
 * @returns {Function} Logout function
 */
export const useLogout = () => {
    const { logout } = useStore();
    return logout;
};
