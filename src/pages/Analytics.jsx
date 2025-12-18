import { useMemo } from 'react';
import { useStore } from '../store/useStore';
import { useCurrencyStore } from '../store/useCurrencyStore';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { Download, PieChart as PieIcon, TrendingUp, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { toast } from 'sonner';
import { subDays, format, isSameDay, parseISO } from 'date-fns';
import { formatCurrency } from '../utils/currency';

const COLORS = {
    'Shopping': '#00ff9d',
    'Bills': '#00d2ff',
    'Food': '#ff00ff',
    'Transport': '#ffcc00',
    'Entertainment': '#ff9900',
    'Other': '#cccccc'
};

const Analytics = () => {
    const { transactions } = useStore();
    const { currentCurrency } = useCurrencyStore();

    // Compute Weekly Trend
    const trendData = useMemo(() => {
        const days = Array.from({ length: 7 }).map((_, i) => {
            const date = subDays(new Date(), 6 - i); // Last 7 days including today
            return {
                date: date,
                name: format(date, 'EEE'), // Mon, Tue...
                income: 0,
                expense: 0
            };
        });

        transactions.forEach(tx => {
            const txDate = new Date(tx.date);
            const dayStat = days.find(d => isSameDay(d.date, txDate));
            if (dayStat) {
                const amount = parseFloat(tx.amount);
                if (tx.type === 'deposit' || tx.type === 'income') {
                    dayStat.income += amount;
                } else {
                    dayStat.expense += amount;
                }
            }
        });

        return days.map(d => ({
            ...d,
            income: parseFloat(d.income.toFixed(2)),
            expense: parseFloat(d.expense.toFixed(2))
        }));
    }, [transactions]);

    // Compute Category Breakdown
    const categoryData = useMemo(() => {
        const stats = {};
        transactions.filter(t => t.type !== 'deposit' && t.type !== 'income').forEach(tx => {
            const cat = tx.category || 'Other';
            if (!stats[cat]) stats[cat] = 0;
            stats[cat] += parseFloat(tx.amount);
        });

        return Object.entries(stats).map(([name, value]) => ({
            name,
            value: parseFloat(value.toFixed(2)),
            color: COLORS[name] || COLORS['Other']
        })).sort((a, b) => b.value - a.value);
    }, [transactions]);

    const handleExport = (format) => {
        toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
            loading: `Generating ${format} Report...`,
            success: `Report downloaded as ${format}`,
            error: 'Export failed'
        });
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-10">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <TrendingUp className="text-brand-primary" /> Analytics & Insights
                </h1>
                <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => handleExport('CSV')}>
                        <Download size={18} className="mr-2" /> CSV
                    </Button>
                    <Button variant="secondary" onClick={() => handleExport('PDF')}>
                        <Download size={18} className="mr-2" /> PDF Report
                    </Button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Spending Trend */}
                <div className="bg-app-surface border border-white/5 rounded-2xl p-6 shadow-lg">
                    <h3 className="font-bold mb-6 flex items-center gap-2">
                        <Calendar size={18} className="text-brand-secondary" /> Weekly Spending Trend
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00ff9d" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00ff9d" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ff00ff" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ff00ff" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                    formatter={(value) => [formatCurrency(value, currentCurrency), undefined]}
                                />
                                <Area type="monotone" dataKey="income" name="Income" stroke="#00ff9d" fillOpacity={1} fill="url(#colorIncome)" />
                                <Area type="monotone" dataKey="expense" name="Expenses" stroke="#ff00ff" fillOpacity={1} fill="url(#colorExpense)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="bg-app-surface border border-white/5 rounded-2xl p-6 shadow-lg">
                    <h3 className="font-bold mb-6 flex items-center gap-2">
                        <PieIcon size={18} className="text-brand-accent" /> Expense by Category
                    </h3>
                    <div className="h-[300px] w-full flex items-center justify-center">
                        {categoryData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                        formatter={(value) => [formatCurrency(value, currentCurrency), undefined]}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="text-app-text-muted text-sm">No expense data available</div>
                        )}
                    </div>
                </div>
            </div>

            {/* AI Insights Placeholders */}
            {/* Insights Section */}
            {transactions.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="glass-panel p-6 rounded-xl border-l-4 border-brand-primary">
                        <h4 className="font-bold text-brand-primary mb-2">Spending Insight</h4>
                        <p className="text-sm text-app-text-muted">
                            You spent <strong>{formatCurrency(trendData.reduce((acc, curr) => acc + curr.expense, 0), currentCurrency)}</strong> in the last 7 days.
                        </p>
                    </div>
                    {/* Only show if we have recurring-looking bills */}
                    <div className="glass-panel p-6 rounded-xl border-l-4 border-brand-secondary">
                        <h4 className="font-bold text-brand-secondary mb-2">Analysis</h4>
                        <p className="text-sm text-app-text-muted">spending patterns are being analyzed to provided better recommendations.</p>
                    </div>

                </div>
            ) : (
                <div className="text-center py-10 bg-white/5 rounded-2xl border border-white/5">
                    <TrendingUp size={48} className="mx-auto text-white/20 mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">No Insights Yet</h3>
                    <p className="text-app-text-muted max-w-md mx-auto">
                        Start making transactions to see detailed analytics, spending trends, and AI-powered financial insights here.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Analytics;
