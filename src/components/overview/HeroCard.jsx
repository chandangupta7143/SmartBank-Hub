import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Eye, EyeOff, Copy, ArrowUpRight, ArrowDownLeft, Send, Sparkles, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { formatCurrency } from '../../utils/currency';

const HeroCard = ({ balance, currency: baseCurrencyProp, onDeposit, onWithdraw, onSend }) => {
    const [showBalance, setShowBalance] = useState(true);
    
    // Display balance in user's selected currency
    const displayBalance = formatCurrency(balance || 0);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [5, -5]);
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleCopyId = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText('0x71C...9A23');
        toast.success('Wallet ID copied!', {
            icon: <Sparkles className="text-brand-primary" size={16} />,
            style: { background: '#0A0F1C', border: '1px solid #4F9DFF', color: '#fff' }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full relative perspective-1000 group z-10"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Ambient Animated Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 via-brand-secondary/20 to-brand-accent/20 rounded-[2rem] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-1000 animate-pulse-slow"></div>

            {/* Main Card */}
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative bg-[#0A0F1C]/80 backdrop-blur-2xl border border-brand-primary/30 hover:border-brand-primary/60 rounded-[2rem] p-8 overflow-hidden shadow-[0_0_40px_-10px_rgba(79,157,255,0.3)] transition-colors duration-500"
            >
                {/* Internal Decorative Gradients */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none mix-blend-screen"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none mix-blend-screen"></div>

                <div className="relative z-10 flex flex-col justify-between h-full space-y-8">

                    {/* Top Row */}
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 text-brand-primary/80 font-medium text-sm tracking-wider uppercase"
                            >
                                <Zap size={14} className="fill-brand-primary" /> Total Balance
                            </motion.div>

                            <div className="flex items-center gap-4">
                                <AnimatePresence mode="wait">
                                    {showBalance ? (
                                        <motion.h1
                                            key="balance"
                                            initial={{ opacity: 0, filter: 'blur(8px)' }}
                                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                                            exit={{ opacity: 0, filter: 'blur(8px)' }}
                                            className="text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                        >
                                            {displayBalance}
                                        </motion.h1>
                                    ) : (
                                        <motion.h1
                                            key="hidden"
                                            initial={{ opacity: 0, filter: 'blur(8px)' }}
                                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                                            exit={{ opacity: 0, filter: 'blur(8px)' }}
                                            className="text-5xl md:text-6xl font-bold tracking-tight text-white/10 select-none"
                                        >
                                            •••••••
                                        </motion.h1>
                                    )}
                                </AnimatePresence>
                                <button
                                    onClick={() => setShowBalance(!showBalance)}
                                    className="p-2 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-all"
                                >
                                    {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleCopyId}
                                className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-brand-primary/10 hover:border-brand-primary/30 transition-all group/id"
                            >
                                <div className="w-2 h-2 rounded-full bg-status-success shadow-[0_0_8px_#00ff9d] animate-pulse"></div>
                                <span className="text-xs font-mono text-white/60 group-hover/id:text-white transition-colors">WALLET-ID</span>
                                <Copy size={12} className="text-white/40 group-hover/id:text-brand-primary" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Actions Row */}
                    <div className="grid grid-cols-3 gap-4 md:gap-6 pt-4">
                        <ActionButton
                            icon={ArrowDownLeft}
                            label="Deposit"
                            color="text-brand-primary"
                            bg="bg-brand-primary/20"
                            onClick={onDeposit}
                            delay={0.1}
                        />
                        <ActionButton
                            icon={ArrowUpRight}
                            label="Withdraw"
                            color="text-brand-secondary"
                            bg="bg-brand-secondary/20"
                            onClick={onWithdraw}
                            delay={0.2}
                        />
                        <ActionButton
                            icon={Send}
                            label="Send"
                            color="text-brand-accent"
                            bg="bg-brand-accent/20"
                            onClick={onSend}
                            delay={0.3}
                        />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ActionButton = ({ icon: Icon, label, color, bg, onClick, delay }) => (
    <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 + delay }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="relative group flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all overflow-hidden"
    >
        <div className={`p-3 rounded-xl ${bg} ${color} shadow-[0_0_15px_-3px_currentColor] group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={24} strokeWidth={2.5} />
        </div>
        <span className="text-sm font-semibold text-white/80 group-hover:text-white tracking-wide">{label}</span>

        {/* Ripple Click Effect Container (Simplified as hover glow for now) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </motion.button>
);

export default HeroCard;
