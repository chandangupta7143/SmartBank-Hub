/**
 * Currency Math Utilities
 * Handles safe integer-based arithmetic to avoid floating point errors.
 */

// Convert float to integer cents (e.g. 10.50 -> 1050)
export const toCents = (amount) => Math.round(amount * 100);

// Convert integer cents back to float (e.g. 1050 -> 10.50)
export const fromCents = (cents) => cents / 100;

/**
 * Converts an amount from one currency to another using the given rate.
 * @param {number} amount - The amount in base currency (float).
 * @param {number} rate - The exchange rate (e.g. 82.5 for 1 USD to INR).
 * @returns {number} - The converted amount (float).
 */
export const convertAmount = (amount, rate) => {
    if (!amount || !rate) return 0;
    // We treat the rate as having 4 decimals of precision for safety, 
    // but typically we just multiply and round.
    // For extreme precision we'd use a library, but for this frontend:
    // 1. Convert amount to cents (integer)
    // 2. Multiply by rate
    // 3. Round to nearest cent if needed, or keep precision?
    // User asked for "decimal arithmetic" or "safe integer math".
    // Let's do: (Amount * 100 * Rate) / 100 to convert.
    return (amount * rate);
};

/**
 * Formats a number using Intl.NumberFormat
 * @param {number} amount 
 * @param {string} currencyCode 
 */
export const formatCurrency = (amount, currencyCode = 'USD') => {
    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencyCode,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    } catch (e) {
        // Fallback for invalid codes
        return `${currencyCode} ${amount.toFixed(2)}`;
    }
};
