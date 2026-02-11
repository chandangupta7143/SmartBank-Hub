import { z } from 'zod';

/**
 * Transaction Validation Schemas
 * 
 * Centralized Zod schemas for transaction forms and API responses.
 */

// Transfer form validation
export const transferSchema = z.object({
    amount: z
        .string()
        .min(1, 'Amount is required')
        .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
            message: 'Amount must be a positive number'
        }),
    recipient: z
        .string()
        .min(1, 'Recipient is required')
        .min(3, 'Recipient must be at least 3 characters'),
    note: z
        .string()
        .max(200, 'Note must be less than 200 characters')
        .optional()
});

// Transaction object schema (for API responses)
export const transactionSchema = z.object({
    id: z.string(),
    type: z.enum(['deposit', 'withdraw', 'transfer', 'income', 'expense']),
    amount: z.number(),
    currency: z.string().default('USD'),
    description: z.string(),
    category: z.string().optional(),
    date: z.string(),
    status: z.enum(['pending', 'completed', 'failed']),
    recipient: z.object({
        name: z.string()
    }).optional(),
    idempotencyKey: z.string().optional()
});

// Transaction list response
export const transactionListSchema = z.object({
    items: z.array(transactionSchema),
    nextPage: z.number().optional()
});

// Transfer response
export const transferResponseSchema = z.object({
    status: z.string(),
    tx: transactionSchema.optional()
});
