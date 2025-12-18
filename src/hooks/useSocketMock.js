import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useStore } from '../store/useStore';
import { toast } from 'sonner';

/**
 * Hook to simulate WebSocket Mock Feed
 * - Pushes new transactions occasionally
 * - Updates balance
 */
export const useSocketMock = () => {
    const queryClient = useQueryClient();
    const { wallet, setBalance } = useStore();

    // Mock Feed removed per user request
};
