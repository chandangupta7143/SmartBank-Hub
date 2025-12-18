import { motion } from 'framer-motion';

const HealthScore = ({ score = 85 }) => {
    // Circle Config
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0A0F1C]/80 border border-white/5 rounded-3xl p-6 flex flex-col justify-center items-center relative overflow-hidden group hover:border-brand-secondary/30 transition-all duration-500"
        >
            <div className="relative mb-3">
                {/* SVG Gauge */}
                <svg width="80" height="80" className="transform -rotate-90">
                    {/* Track */}
                    <circle
                        cx="40"
                        cy="40"
                        r={radius}
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="6"
                        fill="transparent"
                    />
                    {/* Progress */}
                    <motion.circle
                        cx="40"
                        cy="40"
                        r={radius}
                        stroke="#00ff9d"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        strokeLinecap="round"
                    />
                </svg>
                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center pt-1">
                    <span className="text-xl font-bold text-white">{score}</span>
                </div>
            </div>

            <div className="text-center">
                <h4 className="text-xs font-bold text-app-text-muted uppercase tracking-wider mb-1">Health Score</h4>
                <p className="text-[10px] text-status-success bg-status-success/10 px-2 py-0.5 rounded-full inline-block">
                    Excellent
                </p>
            </div>
        </motion.div>
    );
};

export default HealthScore;
