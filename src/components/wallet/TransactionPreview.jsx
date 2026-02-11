import { motion } from 'framer-motion';
import { Coffee, ShoppingBag, Zap, ArrowUpRight } from 'lucide-react';
import { useCurrencyStore } from '../../store/useCurrencyStore';

const TransactionItem = ({ icon: Icon, title, date, amount, category, color }) => {
    const { convertAndFormat } = useCurrencyStore();

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.03)' }}
            className="flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-white/5"
        >
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full ${color} bg-opacity-10 flex items-center justify-center`}>
                    <Icon size={18} className={color.replace('bg-', 'text-')} />
                </div>
                <div>
                    <h4 className="font-bold text-white text-sm">{title}</h4>
                    <p className="text-xs text-gray-500">{date} • {category}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="font-bold text-white text-sm">-{convertAndFormat(amount, 'USD')}</p>
            </div>
        </motion.div>
    );
};

const TransactionPreview = () => {
    return (
        <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-6 md:p-8 h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                <button className="text-white/40 hover:text-white transition-colors">
                    <ArrowUpRight size={20} />
                </button>
            </div>

            <div className="space-y-1">
                <TransactionItem
                    icon={Coffee}
                    title="Starbucks Coffee"
                    date="Today, 10:23 AM"
                    amount={5.40}
                    category="Food & Drink"
                    color="bg-orange-500 text-orange-500"
                />
                <TransactionItem
                    icon={ShoppingBag}
                    title="Apple Store"
                    date="Yesterday"
                    amount={129.00}
                    category="Shopping"
                    color="bg-blue-500 text-blue-500"
                />
                <TransactionItem
                    icon={Zap}
                    title="Electric Bill"
                    date="Dec 12"
                    amount={84.20}
                    category="Utilities"
                    color="bg-yellow-500 text-yellow-500"
                />
            </div>

            <button className="w-full mt-6 py-3 border border-white/10 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all">
                View All Transactions
            </button>
        </div>
    );
};

export default TransactionPreview;
