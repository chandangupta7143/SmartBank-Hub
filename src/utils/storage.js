/**
 * Safe Storage Utility
 * Wraps localStorage to handling quota / parsing errors gracefully.
 */

const safeStorage = {
    getItem: (key) => {
        if (typeof localStorage === 'undefined') return null;
        try {
            const item = localStorage.getItem(key);
            // Check if item exists
            if (!item) return null;

            // Try parsing if it looks like JSON/Object, otherwise return raw
            try {
                // Heuristic: If it starts with { or [, try parse. 
                // However, Zustand persists strings as strings. 
                // We'll let the consumer parse if they expect JSON, 
                // BUT for Zustand 'createJSONStorage', it expects the raw string to parse itself.
                return item;
            } catch (e) {
                return item;
            }
        } catch (error) {
            console.error(`Error reading ${key} from storage:`, error);
            return null;
        }
    },
    setItem: (key, value) => {
        if (typeof localStorage === 'undefined') return;
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.error(`Error writing ${key} to storage:`, error);
            // Handle QuotaExceededError or others
        }
    },
    removeItem: (key) => {
        if (typeof localStorage === 'undefined') return;
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing ${key} from storage:`, error);
        }
    }
};

export default safeStorage;
