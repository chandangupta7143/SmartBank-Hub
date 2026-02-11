import { z } from 'zod';

/**
 * User Validation Schemas
 * 
 * Centralized Zod schemas for user profile and settings.
 */

// User profile schema
export const userProfileSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    role: z.string().optional(),
    avatar: z.string().nullable().optional(),
    createdAt: z.string().optional()
});

// Update profile form
export const updateProfileSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters')
        .optional(),
    email: z
        .string()
        .email('Invalid email address')
        .optional(),
    avatar: z
        .string()
        .url('Avatar must be a valid URL')
        .nullable()
        .optional()
});

// User settings schema
export const userSettingsSchema = z.object({
    notifications: z.boolean().default(true),
    twoFactorAuth: z.boolean().default(false),
    emailAlerts: z.boolean().default(true),
    theme: z.enum(['light', 'dark']).optional(),
    language: z.string().optional()
});

// Update settings form
export const updateSettingsSchema = userSettingsSchema.partial();
