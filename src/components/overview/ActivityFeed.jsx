import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Globe, ArrowUpRight, ArrowDownLeft, ShoppingBag, Coffee, Zap, CreditCard } from 'lucide-react';
import { format } from 'date-fns';

const MOCK_NAMES = ['Uber Rides', 'Starbucks', 'Amazon', 'Netflix', 'Spotify', 'Apple Store', 'Target', 'Whole Foods'];
const ICONS = {
    'Shopping': ShoppingBag,
    'Food': Coffee,
    'Bills': Zap,
    'Transport': Globe,
    'Default': CreditCard
};

const ActivityFeed = () => {
    const { transactions, addTransaction } = useStore();
    const scrollRef = useRef(null);

    // Simulate Live WebSocket Feed
    // Simulate Live WebSocket Feed

    return (
        <div className="bg-app-surface/30 border border-white/5 rounded-3xl p-6 h-full flex flex-col backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold flex items-center gap-2">
                    <Globe size={18} className="text-brand-primary animate-pulse" /> Live Activity
                </h3>
                <span className="flex h-2 w-2 rounded-full bg-status-success shadow-[0_0_10px_#00ff9d]"></span>
            </div>

            <div className="flex-1 overflow-hidden relative" ref={scrollRef}>
                {/* Fade Overlay for smooth scrolling look */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0A0F1C] to-transparent z-10 pointer-events-none"></div>

                <div className="space-y-4 overflow-y-auto h-[500px] pr-2 custom-scrollbar pb-20">
                    <AnimatePresence initial={false}>
                        {transactions.slice(0, 20).map((tx) => (
                            <TransactionItem key={tx.id || Math.random()} tx={tx} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const TransactionItem = ({ tx }) => {
    const Icon = ICONS[tx.category] || ICONS['Default'];
    const isPositive = tx.type === 'deposit' || tx.type === 'income';

    return (
        <motion.div
            initial={{ opacity: 0, x: 50, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
        >
            <div className={`p-3 rounded-full ${isPositive ? 'bg-status-success/10 text-status-success' : 'bg-white/5 text-app-text-muted group-hover:bg-white/10 group-hover:text-white transition-colors'}`}>
                {isPositive ? <ArrowDownLeft size={18} /> : <Icon size={18} />}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <p className="font-medium text-sm truncate pr-2">{tx.description}</p>
                    <span className={`font-mono font-bold text-sm ${isPositive ? 'text-status-success' : 'text-white'}`}>
                        {isPositive ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                    </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] text-app-text-muted uppercase tracking-wider">{tx.category || 'General'}</span>
                    <span className="text-[10px] text-app-text-muted">{format(new Date(tx.date), 'HH:mm')}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ActivityFeed;
