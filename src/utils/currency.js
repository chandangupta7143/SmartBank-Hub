/**
 * Currency Utility for INR Formatting
 * 
 * Simplified utility for formatting currency in INR (₹)
 * Replaces the complex multi-currency system
 */

/**
 * Format amount in Indian Rupees (INR)
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string with ₹ symbol
 */
export const formatCurrency = (amount) => {
    if (typeof amount !== 'number' || isNaN(amount)) {
        return '₹0.00';
    }

    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
};

/**
 * Format amount as compact notation (e.g., 1.2K, 3.5M)
 * @param {number} amount - Amount to format
 * @returns {string} Compact formatted currency string
 */
export const formatCompactCurrency = (amount) => {
    if (typeof amount !== 'number' || isNaN(amount)) {
        return '₹0';
    }

    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        notation: 'compact',
        maximumFractionDigits: 1
    }).format(amount);
};

/**
 * Parse formatted currency string back to number
 * @param {string} formattedAmount - Formatted currency string
 * @returns {number} Numeric amount
 */
export const parseCurrency = (formattedAmount) => {
    if (typeof formattedAmount !== 'string') {
        return 0;
    }

    // Remove currency symbol and commas
    const cleaned = formattedAmount.replace(/[₹,\s]/g, '');
    const parsed = parseFloat(cleaned);

    return isNaN(parsed) ? 0 : parsed;
};
