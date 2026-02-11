import { useEffect, useState } from 'react';
import { useCurrencyStore } from '../store/useCurrencyStore';
import { ChevronDown, Globe, Check, TrendingUp, ArrowRightLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExchangeRates } from '../hooks/queries/useCurrencyQueries';

const SUPPORTED_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'INR', 'AUD', 'CAD'];

const CurrencySelector = () => {
    const { currentCurrency, setCurrentCurrency } = useCurrencyStore();
    const { data: rates, isLoading } = useExchangeRates();
    const [isOpen, setIsOpen] = useState(false);

    // Get currency symbol
    const getCurrencySymbol = (code) => {
        const symbols = {
            USD: '$',
            EUR: '€',
            GBP: '£',
            JPY: '¥',
            INR: '₹',
            AUD: 'A$',
            CAD: 'C$'
        };
        return symbols[code] || code;
    };

    const handleCurrencyChange = (currency) => {
        setCurrentCurrency(currency);
        setIsOpen(false);
    };

    return (
        <div className="relative z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-medium"
            >
                <span>{currentCurrency}</span>
                <ChevronDown size={14} className={`text-app-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-2 w-64 bg-[#0A0F1C]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                    >
                        {isLoading ? (
                            <div className="p-4 text-center text-app-text-muted text-sm">
                                Loading rates...
                            </div>
                        ) : (
                            <div className="p-2 space-y-1">
                                {SUPPORTED_CURRENCIES.map((currency) => {
                                    const rate = rates?.[currency] || '...';
                                    return (
                                        <motion.button
                                            key={currency}
                                            whileHover={{ scale: 1.02, x: 4 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleCurrencyChange(currency)}
                                            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${currentCurrency === currency
                                                    ? 'bg-brand-primary/20 border border-brand-primary/30'
                                                    : 'hover:bg-white/5 border border-transparent'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{getCurrencySymbol(currency)}</span>
                                                <div className="text-left">
                                                    <div className="text-sm font-semibold text-white">{currency}</div>
                                                    {currency !== 'USD' && (
                                                        <div className="text-xs text-app-text-muted">
                                                            1 USD = {typeof rate === 'number' ? rate.toFixed(2) : rate} {currency}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {currentCurrency === currency && (
                                                <Check size={16} className="text-brand-primary" />
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CurrencySelector;
