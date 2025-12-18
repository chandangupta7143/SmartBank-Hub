import { useEffect, useState } from 'react';
import { useCurrencyStore } from '../store/useCurrencyStore';
import { ChevronDown, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrencySymbol } from '../utils/currency';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY'];

const CurrencySelector = () => {
    const { currentCurrency, setCurrency, fetchRates, lastUpdated, isLoading } = useCurrencyStore();
    const [isOpen, setIsOpen] = useState(false);

    // Initial fetch on mount if no rates or empty
    useEffect(() => {
        // We could check if (lastUpdated) but fetching often is okay if cached
        fetchRates();
    }, [fetchRates]);

    const handleSelect = (code) => {
        setCurrency(code);
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
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute top-full right-0 mt-2 w-48 bg-[#0A0F1C] border border-white/10 rounded-xl shadow-xl overflow-hidden py-1"
                    >
                        <div className="px-3 py-2 text-xs text-app-text-muted border-b border-white/5 flex flex-col gap-1">
                            <div className="flex justify-between items-center">
                                <span>Select Currency</span>
                                <button onClick={(e) => { e.stopPropagation(); fetchRates(); }} className={isLoading ? 'animate-spin' : ''}>
                                    <RefreshCw size={12} />
                                </button>
                            </div>
                            {currentCurrency !== 'USD' && (
                                <div className="text-[10px] text-white/50 font-mono">
                                    1 USD ≈ {useCurrencyStore.getState().getRate(currentCurrency).toFixed(2)} {currentCurrency}
                                </div>
                            )}
                            {lastUpdated && (
                                <div className="text-[10px] text-white/30">
                                    Updated: {new Date(lastUpdated).toLocaleTimeString()}
                                </div>
                            )}
                        </div>
                        <div className="max-h-60 overflow-y-auto custom-scrollbar">
                            {CURRENCIES.map(code => (
                                <button
                                    key={code}
                                    onClick={() => handleSelect(code)}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors flex justify-between items-center ${currentCurrency === code ? 'text-brand-primary bg-brand-primary/5' : 'text-white/80'}`}
                                >
                                    <span>{code} <span className="text-white/30 ml-1">({getCurrencySymbol(code)})</span></span>
                                    {currentCurrency === code && <div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div>}
                                </button>
                            ))}
                        </div>
                        {lastUpdated && (
                            <div className="px-3 py-1.5 bg-white/[0.02] text-[10px] text-white/30 text-center">
                                Updated: {new Date(lastUpdated).toLocaleTimeString()}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CurrencySelector;
