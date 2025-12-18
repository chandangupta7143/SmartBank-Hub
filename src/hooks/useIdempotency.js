import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * Hook to manage Idempotency Keys
 * prevents double-spending in mock environment
 */
export const useIdempotency = () => {
    const keyRef = useRef(uuidv4());

    const refreshKey = () => {
        keyRef.current = uuidv4();
    };

    return {
        idempotencyKey: keyRef.current,
        refreshKey
    };
};
