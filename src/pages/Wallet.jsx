import { motion } from 'framer-motion';
import { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Wallet as WalletIcon, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useStore } from '../store/useStore';
import { useWalletBalance, useDeposit, useWithdraw } from '../hooks/queries/useWalletQueries';
import { useCurrencyStore } from '../store/useCurrencyStore';
import { getCurrencySymbol, formatCurrency } from '../utils/currency';
import PremiumCard from '../components/wallet/PremiumCard';
import WalletActions from '../components/wallet/WalletActions';
import BalanceLimits from '../components/wallet/BalanceLimits';
import TransactionPreview from '../components/wallet/TransactionPreview';
import { toast } from 'sonner';

const Wallet = () => {
    const { data: balance = 0, isLoading: isBalanceLoading, error: balanceError } = useWalletBalance();
    const { mutate: deposit } = useDeposit();
    const { mutate: withdraw } = useWithdraw();
    const { convertAndFormat } = useCurrencyStore();

    // Handlers (Connected to existing logic + Toasts)
    const handleDeposit = () => {
        // Trigger deposit modal (if exists) or just mock toast for now
        // In real implementations, this would toggle a modal state
        toast.info("Deposit Flow Initiated", { description: "Using default funding source" });
    };

    const handleWithdraw = () => {
        toast.info("Withdrawal Flow Initiated", { description: "Select destination bank" });
    };

    const handleSend = () => {
        toast.info("Send Money", { description: "Choose a recipient" });
    };

    const handleFreeze = () => {
        toast.warning("Card Frozen", { description: "All transactions are now blocked" });
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8 pt-24 pb-20">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
                            My Wallet
                        </h1>
                        <p className="text-gray-500 mt-2 text-lg">Premium Command Center</p>
                    </div>
                </motion.div>

                {/* Main Grid */}
                <div className="grid lg:grid-cols-12 gap-8">

                    {/* Left Column: Hero Card & Actions (5 cols) */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* 1. Hero Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <PremiumCard balance={balance} />
                        </motion.div>

                        {/* 2. Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <WalletActions
                                onDeposit={handleDeposit}
                                onWithdraw={handleWithdraw}
                                onSend={handleSend}
                                onFreeze={handleFreeze}
                            />
                        </motion.div>
                    </div>

                    {/* Right Column: Limits & Transactions (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col gap-8">
                        {/* 3. Limits */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <BalanceLimits />
                        </motion.div>

                        {/* 4. Transactions */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex-grow"
                        >
                            <TransactionPreview />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
