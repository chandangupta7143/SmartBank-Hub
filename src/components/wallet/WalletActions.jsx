import { ArrowUpRight, ArrowDownLeft, Send, Snowflake, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const ActionButton = ({ icon: Icon, label, onClick, variant = 'primary' }) => {
    return (
        <motion.button
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="flex flex-col items-center gap-3 group"
        >
            <div className={`
                w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg
                ${variant === 'primary'
                    ? 'bg-white text-black hover:shadow-white/25'
                    : 'bg-[#1a1a1a] text-white border border-white/5 hover:border-white/20 hover:bg-[#252525]'}
            `}>
                <Icon size={24} strokeWidth={2} />
            </div>
            <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">
                {label}
            </span>
        </motion.button>
    );
};

const WalletActions = ({ onDeposit, onWithdraw, onSend, onFreeze }) => {
    return (
        <div className="flex items-center justify-between px-2 md:px-4 py-6">
            <ActionButton
                icon={ArrowDownLeft}
                label="Deposit"
                onClick={onDeposit}
                variant="primary"
            />
            <ActionButton
                icon={Send}
                label="Send"
                onClick={onSend}
                variant="secondary"
            />
            <ActionButton
                icon={ArrowUpRight}
                label="Withdraw"
                onClick={onWithdraw}
                variant="secondary"
            />
            <ActionButton
                icon={Snowflake}
                label="Freeze"
                onClick={onFreeze}
                variant="secondary"
            />
        </div>
    );
};

export default WalletActions;
