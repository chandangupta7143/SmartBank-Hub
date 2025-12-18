import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { format, subDays, subWeeks, startOfWeek } from 'date-fns';
import { useStore } from '../../store/useStore';
import { formatCurrency, getCurrencySymbol } from '../../utils/currency';
import { useCurrencyStore } from '../../store/useCurrencyStore';
import { convertAmount } from '../../utils/currencyMath';

const SpendingChart = () => {
    const { wallet, transactions } = useStore(); // Get transactions
    const { currentCurrency, getRate, convertAndFormat } = useCurrencyStore();
    const rate = getRate(currentCurrency);

    const [timeframe, setTimeframe] = useState('week');

    // Aggregate real data
    const data = useMemo(() => {
        const count = timeframe === 'week' ? 7 : 4; // 7 days or 4 weeks
        const now = new Date();

        // Initialize buckets
        const buckets = Array.from({ length: count }).map((_, i) => {
            const date = timeframe === 'week'
                ? subDays(now, count - 1 - i)
                : subWeeks(now, count - 1 - i);
            return {
                name: timeframe === 'week' ? format(date, 'EEE') : `W${i + 1}`,
                dateStr: timeframe === 'week' ? format(date, 'yyyy-MM-dd') : format(startOfWeek(date), 'yyyy-MM-dd'),
                val: 0
            };
        });

        // Fill buckets
        transactions.forEach(tx => {
            if (tx.type === 'payment' || tx.type === 'withdraw') {
                const txDate = new Date(tx.date);
                const txDateStr = timeframe === 'week'
                    ? format(txDate, 'yyyy-MM-dd')
                    : format(startOfWeek(txDate), 'yyyy-MM-dd');

                const bucket = buckets.find(b => b.dateStr === txDateStr);
                if (bucket) {
                    bucket.val += parseFloat(tx.amount); // amount is in base currency (USD)
                }
            }
        });

        // Convert to target currency
        return buckets.map(b => ({
            ...b,
            val: b.val * rate
        }));
    }, [timeframe, transactions, rate]);

    const total = data.reduce((acc, curr) => acc + curr.val, 0);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col bg-[#0A0F1C]/80 border border-white/5 rounded-3xl p-6 h-full relative overflow-hidden group hover:border-brand-primary/30 transition-all duration-500"
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-6 z-10">
                <div>
                    <h3 className="text-app-text-muted text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                        Spending Analytics
                    </h3>
                    <div className="flex items-baseline gap-3">
                        <span className="text-2xl font-bold text-white max-w-[200px] truncate block">
                            {formatCurrency(total, currentCurrency)}
                        </span>
                        <span className="flex items-center text-xs font-bold text-status-success bg-status-success/10 px-2 py-0.5 rounded-full">
                            <TrendingUp size={12} className="mr-1" /> +12.5%
                        </span>
                    </div>
                </div>

                <div className="flex bg-white/5 rounded-full p-1 border border-white/5">
                    {['week', 'month'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setTimeframe(t)}
                            className={`px-3 py-1 text-xs font-medium rounded-full transition-all capitalize ${timeframe === t
                                ? 'bg-brand-primary text-black shadow-lg shadow-brand-primary/20'
                                : 'text-app-text-muted hover:text-white'
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart */}
            <div className="flex-1 w-full -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="gradientChart" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4F9DFF" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#4F9DFF" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.03)" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#666', fontSize: 10 }}
                            dy={10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0A0F1C',
                                border: '1px solid rgba(79,157,255,0.3)',
                                borderRadius: '12px',
                                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)'
                            }}
                            itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                            cursor={{ stroke: '#4F9DFF', strokeWidth: 1, strokeDasharray: '4 4' }}
                            formatter={(value) => [formatCurrency(value, currentCurrency), 'Spent']}
                        />
                        <Area
                            type="monotone"
                            dataKey="val"
                            stroke="#4F9DFF"
                            strokeWidth={3}
                            fill="url(#gradientChart)"
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default SpendingChart;
