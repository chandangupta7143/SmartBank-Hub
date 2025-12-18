import { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

// Premium Components
import WalletCard from '../components/overview/WalletCard';
import AnalyticsMini from '../components/overview/AnalyticsMini';
import InsightBox from '../components/overview/InsightBox';
import ActivityFeed from '../components/overview/ActivityFeed';

// Modals
import TransferModal from '../components/TransferModal';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const Dashboard = () => {
    const { balance, currency, deposit, withdraw } = useWallet();
    const { transactions } = useStore(); // For Analytics Mini

    // Check if we need to mock "useSocketMock" here or if ActivityFeed handles it.
    // ActivityFeed handles the subscription internally now, so we can omit the global hook call if we want, 
    // or keep it for app-wide consistency. For this page rebuild, let's rely on the component.

    const [modalOpen, setModalOpen] = useState(null); // 'deposit' | 'withdraw'
    const [transferModalOpen, setTransferModalOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleTransaction = async (e) => {
        e.preventDefault();
        if (!amount || isNaN(amount)) return;

        setIsProcessing(true);
        try {
            if (modalOpen === 'deposit') {
                await deposit(amount);
            } else {
                await withdraw(amount);
            }
            setModalOpen(null);
            setAmount('');
        } catch (error) {
            alert(error.message);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen pb-20">
            {/* Header Area (Optional specific welcome could go here) */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
                <p className="text-app-text-muted">Welcome back, here's what's happening with your finance.</p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column (2 cols wide) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Hero Wallet */}
                    <section>
                        <WalletCard
                            balance={balance}
                            currency={currency}
                            onDeposit={() => setModalOpen('deposit')}
                            onWithdraw={() => setModalOpen('withdraw')}
                            onSend={() => setTransferModalOpen(true)}
                        />
                    </section>

                    {/* Analytics & Insights Grid */}
                    <section className="grid md:grid-cols-2 gap-6 h-[280px]">
                        <AnalyticsMini transactions={transactions} />
                        <InsightBox />
                    </section>
                </div>

                {/* Right Column (1 col wide) - Live Feed */}
                <div className="lg:col-span-1 h-[500px] lg:h-auto">
                    <ActivityFeed />
                </div>
            </div>

            {/* Transaction Modals (Reused existing logic) */}
            <AnimatePresence>
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-app-surface border border-white/10 w-full max-w-sm p-6 rounded-3xl shadow-2xl relative overflow-hidden"
                        >
                            {/* Modal Glow */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-secondary"></div>

                            <h3 className="text-xl font-bold mb-6 capitalize flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${modalOpen === 'deposit' ? 'bg-brand-primary' : 'bg-brand-secondary'}`}></span>
                                {modalOpen} Funds
                            </h3>
                            <form onSubmit={handleTransaction}>
                                <div className="mb-6 space-y-2">
                                    <label className="text-xs font-medium text-app-text-muted uppercase tracking-wider">Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-3 text-white/50">$</span>
                                        <Input
                                            type="number"
                                            value={amount}
                                            onChange={e => setAmount(e.target.value)}
                                            placeholder="0.00"
                                            autoFocus
                                            className="pl-8 text-lg font-mono"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button type="button" variant="ghost" onClick={() => setModalOpen(null)} className="flex-1 rounded-xl">
                                        Cancel
                                    </Button>
                                    <Button type="submit" isLoading={isProcessing} className="flex-1 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90">
                                        Confirm
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <TransferModal isOpen={transferModalOpen} onClose={() => setTransferModalOpen(false)} />
        </div>
    );
};

export default Dashboard;
