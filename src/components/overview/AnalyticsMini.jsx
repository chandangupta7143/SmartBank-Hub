import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { ChevronDown, TrendingUp } from 'lucide-react';
import { format, subDays, startOfWeek, subWeeks } from 'date-fns';

const AnalyticsMini = ({ transactions = [] }) => {
    const [timeframe, setTimeframe] = useState('week'); // 'week' | 'month'

    // Mock/Compute Data based on timeframe (Simplified for UI demo)
    // Aggregate real data from transactions
    const data = useMemo(() => {
        const count = timeframe === 'week' ? 7 : 12; // 7 days or 12 weeks
        const now = new Date();

        // Initialize buckets with 0
        const buckets = Array.from({ length: count }).map((_, i) => {
            const date = timeframe === 'week'
                ? subDays(now, count - 1 - i)
                : subWeeks(now, count - 1 - i);
            return {
                name: timeframe === 'week' ? format(date, 'EEE') : `Week ${i + 1}`,
                dateStr: timeframe === 'week' ? format(date, 'yyyy-MM-dd') : format(startOfWeek(date), 'yyyy-MM-dd'),
                value: 0
            };
        });

        // Fill buckets with transaction amounts
        transactions.forEach(tx => {
            if (tx.type === 'payment' || tx.type === 'withdraw') {
                const txDate = new Date(tx.date);
                const txDateStr = timeframe === 'week'
                    ? format(txDate, 'yyyy-MM-dd')
                    : format(startOfWeek(txDate), 'yyyy-MM-dd');

                const bucket = buckets.find(b => b.dateStr === txDateStr);
                if (bucket) {
                    bucket.value += parseFloat(tx.amount);
                }
            }
        });

        return buckets;
    }, [timeframe, transactions]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-app-surface/50 border border-white/5 rounded-3xl p-6 h-full flex flex-col justify-between group hover:border-brand-primary/20 transition-colors"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        Spending <TrendingUp size={16} className="text-status-success" />
                    </h3>
                    <p className="text-xs text-app-text-muted mt-1">
                        {timeframe === 'week' ? 'Last 7 Days' : 'Last 30 Days'}
                    </p>
                </div>

                <div className="flex bg-white/5 rounded-lg p-1">
                    {['week', 'month'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setTimeframe(t)}
                            className={`px-3 py-1 text-xs rounded-md transition-all capitalize ${timeframe === t
                                ? 'bg-brand-primary/20 text-brand-primary shadow-sm'
                                : 'text-app-text-muted hover:text-white'
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-[120px] w-full mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4F9DFF" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#4F9DFF" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0A0F1C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff', fontSize: '12px' }}
                            cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#4F9DFF"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default AnalyticsMini;
