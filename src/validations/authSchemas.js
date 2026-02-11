import { z } from 'zod';

/**
 * Authentication Validation Schemas
 * 
 * Centralized Zod schemas for authentication forms and API responses.
 * These schemas are used for both client-side validation and API response validation.
 */

// Login form validation
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    password: z
        .string()
        .min(1, 'Password is required')
});

// Signup form validation
export const signupSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password must be less than 100 characters'),
    confirmPassword: z
        .string()
        .min(1, 'Please confirm your password')
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
});

// API response validation for user object
export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    token: z.string(),
    role: z.string().optional(),
    avatar: z.string().nullable().optional(),
    createdAt: z.string().optional()
});

// Login response validation
export const loginResponseSchema = userSchema;

// Signup response validation
export const signupResponseSchema = userSchema;
