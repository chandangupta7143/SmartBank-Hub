import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, Lightbulb, ChevronRight } from 'lucide-react';

const INSIGHT_DATA = [
    {
        id: 1,
        icon: TrendingUp,
        color: 'text-brand-primary',
        glow: 'shadow-[0_0_15px_-5px_#4F9DFF]',
        border: 'border-brand-primary/20',
        title: 'Spending Up 12%',
        desc: 'Higher than last week'
    },
    {
        id: 2,
        icon: AlertTriangle,
        color: 'text-brand-secondary',
        glow: 'shadow-[0_0_15px_-5px_#A66BFF]',
        border: 'border-brand-secondary/20',
        title: 'Netflix Subscription',
        desc: 'Payment due tomorrow'
    },
    {
        id: 3,
        icon: Lightbulb,
        color: 'text-brand-accent',
        glow: 'shadow-[0_0_15px_-5px_#00ff9d]',
        border: 'border-brand-accent/20',
        title: 'Smart Saving Tip',
        desc: 'Save $50 by cooking'
    }
];

const Insights = () => {
    return (
        <div className="space-y-4 h-full">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-app-text-muted text-xs font-bold uppercase tracking-widest">
                    Smart Insights
                </h3>
                <button className="text-xs text-brand-primary hover:text-white transition-colors flex items-center">
                    View All <ChevronRight size={12} />
                </button>
            </div>

            <div className="grid gap-3">
                {INSIGHT_DATA.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (index * 0.1) }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className={`flex items-center gap-4 p-3 rounded-2xl bg-[#0A0F1C]/60 border ${item.border} hover:bg-white/5 transition-all cursor-pointer group`}
                    >
                        {/* Icon Box */}
                        <div className={`p-2.5 rounded-xl bg-white/5 ${item.color} ${item.glow} group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon size={18} strokeWidth={2.5} />
                        </div>

                        {/* Text */}
                        <div>
                            <h4 className="font-bold text-sm text-white/90 group-hover:text-white">{item.title}</h4>
                            <p className="text-xs text-app-text-muted group-hover:text-white/60 transition-colors">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Insights;
