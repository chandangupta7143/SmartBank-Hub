import { Copy, Plus, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Button } from './ui/Button';
import { useState } from 'react';
import { cn } from '../utils/cn';
import { useCurrencyStore } from '../store/useCurrencyStore';

const WalletCard = ({ balance, currency, onDeposit, onWithdraw }) => {
    const [showNumbers, setShowNumbers] = useState(true);
    const { convertAndFormat } = useCurrencyStore();

    return (
        <div className="w-full relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-2xl">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-between h-full min-h-[200px]">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-white/80 text-sm font-medium mb-1">Total Balance</p>
                        <h2 className="text-4xl font-bold tracking-tight">
                            {showNumbers ? convertAndFormat(balance, currency || 'USD') : '••••••'}
                        </h2>
                    </div>
                    <button onClick={() => setShowNumbers(!showNumbers)} className="text-white/70 hover:text-white">
                        {showNumbers ? 'Hide' : 'Show'}
                    </button>
                </div>

                {/* Account Details */}
                <div className="flex items-center gap-2 mt-4 mb-6">
                    <span className="bg-white/20 px-2 py-1 rounded text-xs font-mono">**** 4242</span>
                    <button className="p-1 hover:bg-white/10 rounded">
                        <Copy size={14} />
                    </button>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-auto">
                    <Button
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white border-none flex-1"
                        onClick={onDeposit}
                    >
                        <ArrowDownLeft size={16} className="mr-2" />
                        Deposit
                    </Button>
                    <Button
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white border-none flex-1"
                        onClick={onWithdraw}
                    >
                        <ArrowUpRight size={16} className="mr-2" />
                        Withdraw
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default WalletCard;
