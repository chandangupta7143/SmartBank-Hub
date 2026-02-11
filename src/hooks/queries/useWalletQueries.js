import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { walletService } from '../../services/walletService';
import { walletBalanceSchema } from '../../validations/walletSchemas';

/**
 * Wallet Query Hooks
 * 
 * React Query hooks for wallet operations.
 * These consume walletService for all wallet-related data.
 */

/**
 * Wallet balance query hook
 * @returns {Object} React Query query object with wallet balance
 */
export const useWalletBalance = () => {
    return useQuery({
        queryKey: ['wallet', 'balance'],
        queryFn: async () => {
            const balance = await walletService.getBalance();

            // Validate response with Zod
            const validated = walletBalanceSchema.parse(balance);
            return validated;
        },
        staleTime: 30000, // Consider data fresh for 30 seconds
        refetchInterval: 60000 // Refetch every 60 seconds in background
    });
};

/**
 * Deposit mutation hook
 * @returns {Object} React Query mutation object
 */
export const useDeposit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (amount) => {
            return await walletService.deposit(amount);
        },
        onSuccess: (data) => {
            // Invalidate and refetch wallet balance
            queryClient.invalidateQueries({ queryKey: ['wallet', 'balance'] });

            // Invalidate transactions to show new deposit
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        }
    });
};

/**
 * Withdraw mutation hook
 * @returns {Object} React Query mutation object
 */
export const useWithdraw = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (amount) => {
            return await walletService.withdraw(amount);
        },
        onSuccess: (data) => {
            // Invalidate and refetch wallet balance
            queryClient.invalidateQueries({ queryKey: ['wallet', 'balance'] });

            // Invalidate transactions to show new withdrawal
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        }
    });
};
