import TransactionList from '../components/TransactionList';
import { ArrowRightLeft } from 'lucide-react';

const Transactions = () => {
    return (
        <div className="max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <ArrowRightLeft className="text-brand-primary" /> Transaction History
                </h1>
                <div className="flex gap-2">
                    <select className="bg-app-surface border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-primary">
                        <option value="all">All Types</option>
                        <option value="payment">Payments</option>
                        <option value="deposit">Deposits</option>
                        <option value="transfer">Transfers</option>
                    </select>
                    <select className="bg-app-surface border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-primary">
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>
            </div>

            <div className="flex-1 bg-app-surface border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                <div className="h-full overflow-y-auto custom-scrollbar p-0">
                    <TransactionList />
                </div>
            </div>
        </div>
    );
};

export default Transactions;
