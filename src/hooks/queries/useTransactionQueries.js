import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionService } from '../../services/transactionService';
import { transactionListSchema } from '../../validations/transactionSchemas';

/**
 * Transaction Query Hooks
 * 
 * React Query hooks for transaction operations.
 * These consume transactionService for all transaction-related data.
 */

/**
 * Transactions infinite query hook
 * Fetches paginated transaction history
 * @returns {Object} React Query infinite query object
 */
export const useTransactions = () => {
    return useInfiniteQuery({
        queryKey: ['transactions'],
        queryFn: async ({ pageParam = 0 }) => {
            const data = await transactionService.getTransactions({
                page: pageParam,
                pageSize: 10
            });

            // Validate response with Zod
            const validated = transactionListSchema.parse(data);
            return validated;
        },
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 0,
        staleTime: 30000 // Consider data fresh for 30 seconds
    });
};

/**
 * Transfer mutation hook
 * Creates a new transfer transaction
 * @returns {Object} React Query mutation object
 */
export const useCreateTransfer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ amount, recipientId, idempotencyKey }) => {
            return await transactionService.createTransfer(
                amount,
                recipientId,
                idempotencyKey
            );
        },
        onSuccess: (data) => {
            // Only invalidate if transaction was actually created (not duplicate)
            if (data.status !== 'DUPLICATE_IGNORED') {
                // Invalidate wallet balance to reflect new balance
                queryClient.invalidateQueries({ queryKey: ['wallet', 'balance'] });

                // Invalidate transactions to show new transfer
                queryClient.invalidateQueries({ queryKey: ['transactions'] });
            }
        }
    });
};
