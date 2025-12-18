import { useWallet } from '../hooks/useWallet';
import WalletCard from '../components/WalletCard';
import { CreditCard, Plus, ArrowUpRight, Wallet as WalletIcon } from 'lucide-react';
import { useCurrencyStore } from '../store/useCurrencyStore';

const Wallet = () => {
    const { balance, deposit, withdraw } = useWallet();
    const { convertAndFormat } = useCurrencyStore();

    // Mock limits in USD (Reset to 0 for new user)
    const spendingCurrent = 0;
    const spendingLimit = 0;
    const withdrawalCurrent = 0;
    const withdrawalLimit = 0;

    return (
        <div className="p-4 md:p-8 pt-24 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">My Wallet</h1>
                    <p className="text-app-text-muted mt-1">Manage your cards and limits</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <Plus size={18} /> Add Card
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Main Card Section */}
                <div className="space-y-6">
                    <div className="glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-brand-primary/5 group-hover:bg-brand-primary/10 transition-colors"></div>
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
                            <CreditCard className="text-brand-primary" size={20} /> Primary Card
                        </h2>

                        <WalletCard
                            balance={balance}
                            currency="USD" // Base currency 
                            onDeposit={() => { }}
                            onWithdraw={() => { }}
                            onSend={() => { }}
                        />

                        <div className="mt-8 grid grid-cols-2 gap-4 relative z-10">
                            <div className="p-4 rounded-2xl bg-black/20 border border-white/5">
                                <p className="text-xs text-app-text-muted uppercase tracking-wider mb-1">Card Holder</p>
                                <p className="font-mono text-white">My Account</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-black/20 border border-white/5">
                                <p className="text-xs text-app-text-muted uppercase tracking-wider mb-1">Expires</p>
                                <p className="font-mono text-white">--/--</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics / Limits */}
                <div className="space-y-6">
                    <div className="glass-panel p-6 rounded-3xl border border-white/5 h-full">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <WalletIcon className="text-brand-secondary" size={20} /> Monthly Limits
                        </h3>

                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Spending</span>
                                    <span className="text-brand-primary">
                                        {convertAndFormat(spendingCurrent, 'USD')} / {convertAndFormat(spendingLimit, 'USD')}
                                    </span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-brand-primary w-[25%]"></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Withdrawals</span>
                                    <span className="text-brand-secondary">
                                        {convertAndFormat(withdrawalCurrent, 'USD')} / {convertAndFormat(withdrawalLimit, 'USD')}
                                    </span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-brand-secondary w-[20%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-app-surface border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/5 transition-colors cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <Plus size={20} />
                            </div>
                            <span className="text-sm font-medium">Add New Card</span>
                        </div>
                        <div className="bg-app-surface border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/5 transition-colors cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <ArrowUpRight size={20} />
                            </div>
                            <span className="text-sm font-medium">Upgrade Limit</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
