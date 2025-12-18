import { useState } from 'react';
import { useAdminStore } from '../store/useAdminStore';
import { CreditCard, ArrowUpRight, ArrowDownLeft, Search, AlertOctagon } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';
import { toast } from 'sonner';

const AdminWallets = () => {
    const { users, updateUserBalance } = useAdminStore();
    const [search, setSearch] = useState('');

    // Manual Adjustment State
    const [showAdjust, setShowAdjust] = useState(null);
    const [amount, setAmount] = useState('');
    const [reason, setReason] = useState('');

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleAdjustment = (e) => {
        e.preventDefault();
        if (!amount || !reason) return;

        const user = users.find(u => u.id === showAdjust);
        if (!user) return;

        const newBalance = user.balance + parseFloat(amount);
        updateUserBalance(user.id, newBalance, reason);
        toast.success(`Balance adjusted for ${user.email}`);
        setShowAdjust(null);
        setAmount('');
        setReason('');
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <CreditCard className="text-gray-500" /> Wallet Management
            </h1>

            <div className="flex justify-between items-center bg-[#0a0a0a] border border-white/10 p-4 rounded-xl">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search wallet by owner..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-red-500/50 w-64 text-sm"
                    />
                </div>
                <div className="text-sm text-gray-500">
                    Total System Liability: <span className="text-white font-mono font-bold">{formatCurrency(users.reduce((acc, u) => acc + u.balance, 0), 'USD')}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredUsers.map(user => (
                    <div key={user.id} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 relative group hover:border-white/10 transition-colors">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white font-bold text-sm">
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-white font-bold">{user.name}</h3>
                                    <p className="text-xs text-gray-500 font-mono">ID: {user.id}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Current Balance</p>
                                <p className="text-2xl font-bold text-white font-mono">{formatCurrency(user.balance, 'USD')}</p>
                            </div>
                        </div>

                        {showAdjust === user.id ? (
                            <form onSubmit={handleAdjustment} className="bg-white/5 p-4 rounded-lg border border-white/10 animate-in fade-in slide-in-from-top-2">
                                <h4 className="text-xs font-bold text-white uppercase mb-3 flex items-center gap-2">
                                    <AlertOctagon size={12} className="text-orange-500" /> Adjust Balance
                                </h4>
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <input
                                        type="number"
                                        placeholder="+/- Amount"
                                        value={amount}
                                        onChange={e => setAmount(e.target.value)}
                                        className="bg-black border border-white/10 rounded px-3 py-2 text-white text-sm"
                                        autoFocus
                                    />
                                    <input
                                        type="text"
                                        placeholder="Reason (Required)"
                                        value={reason}
                                        onChange={e => setReason(e.target.value)}
                                        className="bg-black border border-white/10 rounded px-3 py-2 text-white text-sm"
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button type="button" onClick={() => setShowAdjust(null)} className="text-xs text-gray-500 hover:text-white px-3 py-1">Cancel</button>
                                    <button type="submit" className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded font-bold">Confim Adjustment</button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowAdjust(user.id)}
                                    className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 font-medium transition-colors border border-white/5 flex items-center justify-center gap-2"
                                >
                                    <ArrowUpRight size={14} className="text-green-500" /> Credit / Debit
                                </button>
                                <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 font-medium transition-colors border border-white/5 flex items-center justify-center gap-2">
                                    <ArrowDownLeft size={14} className="text-blue-500" /> View Ledger
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminWallets;
