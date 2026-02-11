import { z } from 'zod';

/**
 * Wallet Validation Schemas
 * 
 * Centralized Zod schemas for wallet operations.
 */

// Deposit/Withdraw form validation
export const walletOperationSchema = z.object({
    amount: z
        .string()
        .min(1, 'Amount is required')
        .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
            message: 'Amount must be a positive number'
        })
        .refine((val) => parseFloat(val) <= 1000000, {
            message: 'Amount must be less than 1,000,000'
        })
});

// Wallet balance response
export const walletBalanceSchema = z.object({
    balance: z.number(),
    currency: z.string().default('USD')
});

// Deposit/Withdraw response
export const walletOperationResponseSchema = z.object({
    balance: z.number(),
    transaction: z.object({
        id: z.string(),
        type: z.enum(['deposit', 'withdraw']),
        amount: z.number(),
        currency: z.string(),
        description: z.string(),
        category: z.string(),
        date: z.string(),
        status: z.string()
    })
});
