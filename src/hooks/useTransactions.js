import { useInfiniteQuery } from '@tanstack/react-query';
import { mockTransactions } from '../api/mock/transactions';

export const useTransactions = () => {
    return useInfiniteQuery({
        queryKey: ['transactions'],
        queryFn: mockTransactions.getList,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 0,
    });
};
