import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWalletBalance, useDeposit, useWithdraw } from '../hooks/queries/useWalletQueries';
import { useStore } from '../store/useStore';
import { formatCurrency } from '../utils/currency';

// Premium Components
import HeroCard from '../components/overview/HeroCard';
import SpendingChart from '../components/overview/SpendingChart';
import HealthScore from '../components/overview/HealthScore';
import Insights from '../components/overview/Insights';
import LiveFeed from '../components/overview/LiveFeed';

// Modals & UI
import TransferModal from '../components/TransferModal';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const Overview = () => {
    const { data: walletData, isLoading: isBalanceLoading } = useWalletBalance();
    const { mutateAsync: deposit } = useDeposit();
    const { mutateAsync: withdraw } = useWithdraw();
    const { user } = useStore();

    const balance = walletData || 0;
    const currency = 'USD'; // Base currency

    // UI State
    const [greeting, setGreeting] = useState('');
    const [modalOpen, setModalOpen] = useState(null); // 'deposit' | 'withdraw'
    const [transferModalOpen, setTransferModalOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    // Time-based Greeting
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 18) setGreeting('Good afternoon');
        else setGreeting('Good evening');
    }, []);

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
        <div className="min-h-screen pb-20 overflow-x-hidden">
            {/* 1. Personalized Welcome Bar */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                        {greeting}, <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">{user?.name || 'Chandan'}</span>.
                    </h1>
                    <p className="text-app-text-muted text-sm md:text-base max-w-lg">
                        {greeting === 'Good morning' ? "Let's grow your money today." :
                            greeting === 'Good afternoon' ? "Stay on top of your finances." :
                                "Reviewing your finance keeps you ahead."}
                    </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-status-success animate-pulse"></div>
                    <span className="text-xs font-mono text-white/50">SYSTEM OPTIMAL</span>
                </div>
            </motion.div>

            {/* 2. Main Grid Layout */}
            <div className="grid lg:grid-cols-3 gap-8">

                {/* Left Column (2/3) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Hero Section */}
                    <div className="md:h-[320px]">
                        <HeroCard
                            balance={balance}
                            currency={currency}
                            onDeposit={() => setModalOpen('deposit')}
                            onWithdraw={() => setModalOpen('withdraw')}
                            onSend={() => setTransferModalOpen(true)}
                        />
                    </div>

                    {/* Analytics Row */}
                    <div className="grid md:grid-cols-3 gap-6 h-auto md:h-[300px]">
                        <div className="md:col-span-2 h-full">
                            <SpendingChart />
                        </div>
                        <div className="md:col-span-1 h-full">
                            {/* Health Score Removed */}
                        </div>
                    </div>

                    {/* Insights Row */}
                    <div className="bg-[#0A0F1C]/40 border border-white/5 rounded-3xl p-6">
                        <Insights />
                    </div>
                </div>

                {/* Right Column (1/3) - Live Feed */}
                <div className="lg:col-span-1 h-[600px] lg:h-auto sticky top-6">
                    <LiveFeed />
                </div>
            </div>

            {/* 3. Transaction Modals (Glassmorphism Upgrade) */}
            <AnimatePresence>
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-[#0A0F1C] border border-white/10 w-full max-w-sm p-8 rounded-[2rem] shadow-2xl relative overflow-hidden"
                        >
                            {/* Modal Decor */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent"></div>
                            <div className="absolute top-0 right-0 p-20 bg-brand-primary/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

                            <h3 className="text-2xl font-bold mb-8 capitalize flex items-center gap-3 text-white">
                                <span className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] ${modalOpen === 'deposit' ? 'bg-brand-primary text-brand-primary' : 'bg-brand-secondary text-brand-secondary'}`}></span>
                                {modalOpen} Funds
                            </h3>

                            <form onSubmit={(e) => {
                                e.preventDefault();

                                if (!amount || isNaN(amount)) return;
                                setIsProcessing(true);
                                try {
                                    if (modalOpen === 'deposit') {
                                        deposit(parseFloat(amount));
                                    } else {
                                        withdraw(parseFloat(amount));
                                    }
                                    setModalOpen(null);
                                    setAmount('');
                                } catch (error) {
                                    alert(error.message);
                                } finally {
                                    setIsProcessing(false);
                                }
                            }}>
                                <div className="mb-8 space-y-3">
                                    <label className="text-xs font-bold text-app-text-muted uppercase tracking-widest pl-1">
                                        Enter Amount (INR)
                                    </label>
                                    <div className="relative group">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-xl font-light">
                                            ₹
                                        </span>
                                        <Input
                                            type="number"
                                            value={amount}
                                            onChange={e => setAmount(e.target.value)}
                                            placeholder="0.00"
                                            autoFocus
                                            className="pl-14 text-3xl font-bold bg-white/5 border-white/10 focus:border-brand-primary/50 text-white h-16 rounded-2xl"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Button type="button" variant="ghost" onClick={() => setModalOpen(null)} className="h-12 flex-1 rounded-xl text-white/60 hover:text-white hover:bg-white/10">
                                        Cancel
                                    </Button>
                                    <Button type="submit" isLoading={isProcessing} className="h-12 flex-1 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 shadow-lg shadow-brand-primary/20 font-bold tracking-wide">
                                        CONFIRM
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

export default Overview;
