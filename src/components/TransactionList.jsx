import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTransactions } from '../hooks/useTransactions';
import TransactionItem from './TransactionItem';
import { Loader2 } from 'lucide-react';

const TransactionList = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        error
    } = useTransactions();

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

    if (status === 'pending') return (
        <div className="flex justify-center p-8">
            <Loader2 className="animate-spin text-brand-primary" />
        </div>
    );

    if (status === 'error') return (
        <div className="text-status-error p-4">Error loading transactions: {error.message}</div>
    );

    return (
        <div className="space-y-2">
            <h3 className="font-bold text-lg mb-4 px-1">Recent Activity</h3>

            <div className="space-y-1">
                {data.pages.map((page, i) => (
                    <React.Fragment key={i}>
                        {page.items.map((tx) => (
                            <TransactionItem key={tx.id} transaction={tx} />
                        ))}
                    </React.Fragment>
                ))}
            </div>

            <div ref={ref} className="flex justify-center p-4">
                {isFetchingNextPage && <Loader2 className="animate-spin text-app-text-muted" size={20} />}
                {!hasNextPage && (
                    <span className="text-sm text-app-text-muted">No more transactions</span>
                )}
            </div>
        </div>
    );
};

export default TransactionList;
