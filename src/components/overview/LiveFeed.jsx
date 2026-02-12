import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useTransactions } from '../../hooks/queries/useTransactionQueries';
import { formatCurrency } from '../../utils/currency';

const LiveFeed = () => {
    // Use React Query to get transactions
    const { data: transactionsData, isLoading } = useTransactions();

    // Extract transactions from the paginated data structure - with proper null checks
    const allTransactions = transactionsData?.pages
        ?.flatMap(page => page?.data || [])
        ?.filter(tx => tx != null) || [];

    // Get only the most recent 15 transactions for the feed
    const recentTransactions = allTransactions.slice(0, 15);

    if (isLoading) {
        return (
            <div className="bg-[#0A0F1C]/40 border border-white/5 rounded-3xl p-6 h-full flex items-center justify-center">
                <div className="text-app-text-muted">Loading transactions...</div>
            </div>
        );
    }

    if (!recentTransactions || recentTransactions.length === 0) {
        return (
            <div className="bg-[#0A0F1C]/40 border border-white/5 rounded-3xl p-6 h-full flex items-center justify-center">
                <div className="text-app-text-muted">No recent transactions</div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#0A0F1C]/80 border border-white/5 rounded-3xl p-6 h-full flex flex-col relative overflow-hidden backdrop-blur-xl"
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-error opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-status-error shadow-[0_0_10px_#ff4d4d]"></span>
                    </span>
                    <h3 className="font-bold text-sm tracking-wide text-white">LIVE FEED</h3>
                </div>
                <span className="text-[10px] font-mono text-app-text-muted opacity-50">WS: CONNECTED</span>
            </div>

            {/* List */}
            <div className="flex-1 overflow-hidden relative">
                <div className="space-y-3 h-[400px] overflow-y-auto custom-scrollbar pr-2 pb-10">
                    <AnimatePresence initial={false}>
                        {recentTransactions.map((tx) => (
                            <FeedItem key={tx.id || Math.random()} tx={tx} />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Fade Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0F1C] to-transparent pointer-events-none"></div>
            </div>
        </motion.div>
    );
};

const FeedItem = ({ tx }) => {

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
        >
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${tx.type === 'income' ? 'bg-status-success/20 text-status-success' : 'bg-app-text-muted/20 text-app-text'}`}>
                    {tx.type === 'income' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                </div>
                <div>
                    <p className="text-sm font-medium text-white group-hover:text-brand-primary transition-colors">{tx.description}</p>
                    <p className="text-xs text-app-text-muted">
                        {tx.date && !isNaN(new Date(tx.date))
                            ? formatDistanceToNow(new Date(tx.date), { addSuffix: true })
                            : 'Just now'}
                    </p>
                </div>
            </div>
            <div className="text-right">
                <p className={`text-sm font-bold ${tx.type === 'income' ? 'text-status-success' : 'text-white'}`}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount || tx.value || 0)}
                </p>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/50 border border-white/5">
                    {tx.category || 'General'}
                </span>
            </div>
        </motion.div>
    );
};

export default LiveFeed;
