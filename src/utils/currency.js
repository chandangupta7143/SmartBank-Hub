/**
 * Format a numeric value into a localized currency string.
 * @param {number} value - The numerical amount.
 * @param {string} currencyCode - The ISO currency code (e.g., 'USD', 'INR').
 * @returns {string} - Formatted currency string (e.g., "$1,234.56", "₹1,234.56").
 */
export const formatCurrency = (value, currencyCode = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
    }).format(value);
};

/**
 * Get just the symbol for a currency code.
 * @param {string} currencyCode 
 * @returns {string} - Currency symbol (e.g. "$", "₹")
 */
export const getCurrencySymbol = (currencyCode) => {
    const parts = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
    }).formatToParts(0);
    return parts.find(part => part.type === 'currency').value;
};
