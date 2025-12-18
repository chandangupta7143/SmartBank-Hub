import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';

const INSIGHTS = []; // Empty start

const InsightBox = () => {
    return (
        <div className="space-y-4 h-full">
            <h3 className="text-sm font-bold text-app-text-muted uppercase tracking-wider flex items-center gap-2">
                <Lightbulb size={14} /> AI Insights
            </h3>

            <div className={`grid gap-3 ${INSIGHTS.length === 0 ? 'h-full items-center justify-center border border-white/5 rounded-2xl bg-white/5' : ''}`}>
                {INSIGHTS.length > 0 ? (
                    INSIGHTS.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (index * 0.1) }}
                            className="flex items-center gap-4 p-4 rounded-2xl bg-app-surface/50 border border-white/5 hover:bg-white/5 transition-colors cursor-default group"
                        >
                            <div className={`p-2 rounded-xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                                <item.icon size={18} />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-white">{item.title}</p>
                                <p className="text-xs text-app-text-muted">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center p-4">
                        <Lightbulb size={24} className="mx-auto text-app-text-muted mb-2 opacity-50" />
                        <p className="text-xs text-app-text-muted">No insights available yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InsightBox;
