import { motion } from 'framer-motion';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

const LimitBar = ({ label, current, limit, colorClass }) => {
    const percentage = Math.min((current / limit) * 100, 100);

    return (
        <div className="group">
            <div className="flex justify-between items-end mb-2">
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">{label}</p>
                    <p className="text-sm text-white font-medium">
                        {formatCurrency(current)}
                        <span className="text-gray-600 mx-1">/</span>
                        {formatCurrency(limit)}
                    </p>
                </div>
                <div className="text-right">
                    <span className={`text-xs font-bold ${percentage > 80 ? 'text-red-500' : 'text-gray-400'}`}>
                        {percentage.toFixed(0)}%
                    </span>
                </div>
            </div>

            <div className="h-3 w-full bg-[#1a1a1a] rounded-full overflow-hidden border border-white/5 relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`h-full rounded-full ${colorClass} shadow-[0_0_10px_rgba(255,255,255,0.2)]`}
                />
            </div>
        </div>
    );
};

const BalanceLimits = () => {
    return (
        <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-6 md:p-8 space-y-8 relative overflow-hidden">
            {/* Security Badge */}
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <ShieldCheck size={120} />
            </div>

            <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    Spending Limits
                    <AlertCircle size={14} className="text-gray-500 cursor-help" />
                </h3>

                <div className="space-y-8">
                    <LimitBar
                        label="Monthly Spending"
                        current={1240}
                        limit={5000}
                        colorClass="bg-gradient-to-r from-blue-600 to-cyan-400"
                    />

                    <LimitBar
                        label="ATM Withdrawals"
                        current={200}
                        limit={1000}
                        colorClass="bg-gradient-to-r from-orange-500 to-yellow-400"
                    />
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                    <p className="text-xs text-gray-500">Limits reset on <span className="text-white">Jan 1st</span></p>
                    <button className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:text-white transition-colors">
                        Adjust Limits
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BalanceLimits;
