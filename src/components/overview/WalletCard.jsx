import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Copy, ArrowUpRight, ArrowDownLeft, Send, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const WalletCard = ({ balance, currency, onDeposit, onWithdraw, onSend }) => {
    const [showBalance, setShowBalance] = useState(true);

    const handleCopyId = () => {
        navigator.clipboard.writeText('0x71C...9A23');
        toast.success('Wallet ID copied to clipboard');
    };

    const floatAnimation = {
        y: [0, -10, 0],
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full group"
        >
            {/* Glow / Backdrop Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary/40 via-brand-secondary/40 to-brand-accent/40 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-700"></div>

            {/* Main Card Surface */}
            <motion.div
                whileHover={{ scale: 1.005, rotateX: 1, rotateY: 1 }}
                style={{ perspective: 1000 }}
                className="relative bg-app-surface/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl overflow-hidden shadow-2xl"
            >
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 p-32 bg-brand-primary/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 p-24 bg-brand-secondary/10 rounded-full blur-[60px] -ml-12 -mb-12 pointer-events-none"></div>

                {/* Header Row */}
                <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-app-text-muted mb-1 flex items-center gap-2">
                            <Sparkles size={14} className="text-brand-accent" /> Total Balance
                        </span>

                        <div className="flex items-center gap-4">
                            <AnimatePresence mode="wait">
                                {showBalance ? (
                                    <motion.h2
                                        key="balance"
                                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, filter: 'blur(10px)' }}
                                        className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
                                    >
                                        {currency} {balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </motion.h2>
                                ) : (
                                    <motion.h2
                                        key="hidden"
                                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, filter: 'blur(10px)' }}
                                        className="text-4xl md:text-5xl font-bold tracking-tight text-white/20 select-none"
                                    >
                                        •••••••
                                    </motion.h2>
                                )}
                            </AnimatePresence>

                            <button
                                onClick={() => setShowBalance(!showBalance)}
                                className="p-2 rounded-xl hover:bg-white/5 text-app-text-muted hover:text-white transition-colors"
                            >
                                {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <motion.div
                        animate={floatAnimation}
                        className="hidden md:flex flex-col items-end"
                    >
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full cursor-pointer hover:bg-white/10 transition-colors" onClick={handleCopyId}>
                            <div className="w-2 h-2 rounded-full bg-status-success animate-pulse"></div>
                            <span className="text-xs font-mono text-app-text-muted">WALLET-ID</span>
                            <Copy size={12} className="text-app-text-muted" />
                        </div>
                        <span className="text-[10px] text-app-text-muted mt-2 font-medium tracking-wider">PREMIUM TIER</span>
                    </motion.div>
                </div>

                {/* Quick Actions Row */}
                <div className="grid grid-cols-3 gap-4 pt-4 relative z-10 w-full md:w-fit">
                    <ActionButton icon={ArrowDownLeft} label="Deposit" onClick={onDeposit} color="text-brand-primary" />
                    <ActionButton icon={ArrowUpRight} label="Withdraw" onClick={onWithdraw} color="text-brand-secondary" />
                    <ActionButton icon={Send} label="Send" onClick={onSend} color="text-brand-accent" />
                </div>
            </motion.div>
        </motion.div>
    );
};

// Helper Component for Actions
const ActionButton = ({ icon: Icon, label, onClick, color }) => (
    <motion.button
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm transition-all group/btn"
    >
        <div className={`p-3 rounded-full bg-white/5 ${color} group-hover/btn:bg-white/10 transition-colors`}>
            <Icon size={24} />
        </div>
        <span className="text-sm font-medium text-white/80">{label}</span>
    </motion.button>
);

export default WalletCard;
