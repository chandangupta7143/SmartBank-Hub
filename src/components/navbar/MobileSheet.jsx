import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CreditCard, ScanLine, ArrowRight } from 'lucide-react';
import { NAV_LINKS, PROFILE_MENU } from '../../mocks/nav-mock';
import { useAuth } from '../../hooks/useAuth';

const MobileSheet = ({ isOpen, onClose }) => {
    const { user } = useAuth();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
                        onClick={onClose}
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full sm:w-96 bg-[#0A0F1C] border-l border-white/10 z-[70] flex flex-col shadow-2xl"
                    >
                        <div className="p-6 flex justify-between items-center border-b border-white/5">
                            <h2 className="text-xl font-brand font-bold text-white">Menu</h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* Navigation */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Navigation</h3>
                                <div className="flex flex-col space-y-2">
                                    {NAV_LINKS.map((link) => (
                                        <Link
                                            key={link.label}
                                            to={link.href}
                                            onClick={onClose}
                                            className="p-3 rounded-xl hover:bg-white/5 text-lg font-medium text-gray-300 hover:text-white transition-colors flex justify-between items-center group"
                                        >
                                            {link.label}
                                            <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-brand-primary" />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Quick Actions</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                                        <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                                            <Send size={20} />
                                        </div>
                                        <span className="text-xs font-medium text-gray-300">Send</span>
                                    </button>
                                    <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                                        <div className="w-10 h-10 rounded-full bg-brand-secondary/20 flex items-center justify-center text-brand-secondary">
                                            <CreditCard size={20} />
                                        </div>
                                        <span className="text-xs font-medium text-gray-300">Wallet</span>
                                    </button>
                                    <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                            <ScanLine size={20} />
                                        </div>
                                        <span className="text-xs font-medium text-gray-300">Scan</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer CTA */}
                        <div className="p-6 border-t border-white/10 bg-black/20">
                            {!user ? (
                                <Link to="/signup" onClick={onClose} className="block w-full">
                                    <button className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary font-bold text-white shadow-lg shadow-brand-primary/20 hover:scale-[1.02] transition-transform">
                                        Open Free Account
                                    </button>
                                </Link>
                            ) : (
                                <Link to="/dashboard" onClick={onClose} className="block w-full">
                                    <button className="w-full py-3 rounded-xl bg-white text-black font-bold shadow-lg hover:scale-[1.02] transition-transform">
                                        Go to Dashboard
                                    </button>
                                </Link>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileSheet;
