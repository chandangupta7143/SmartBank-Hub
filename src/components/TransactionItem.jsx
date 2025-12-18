import { ArrowUpRight, ArrowDownLeft, Coffee, DollarSign } from 'lucide-react';
import { cn } from '../utils/cn';
import { format } from 'date-fns';
import { useCurrencyStore } from '../store/useCurrencyStore';

const TransactionItem = ({ transaction }) => {
    const { convertAndFormat } = useCurrencyStore();
    const { type, amount, status, date, description, currency: txCurrency } = transaction;

    const isNegative = type === 'payment' || type === 'withdraw' || type === 'transfer';

    const Icon = type === 'payment' ? Coffee :
        type === 'deposit' ? DollarSign :
            isNegative ? ArrowUpRight : ArrowDownLeft;

    const colorClass = isNegative ? 'text-app-text' : 'text-status-success';
    const bgClass = isNegative ? 'bg-app-surface-highlight' : 'bg-status-success/10 text-status-success';

    return (
        <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
            <div className="flex items-center gap-4">
                <div className={cn("p-2.5 rounded-full", bgClass)}>
                    <Icon size={18} />
                </div>
                <div>
                    <p className="font-medium text-app-text group-hover:text-white transition-colors">
                        {description}
                    </p>
                    <p className="text-xs text-app-text-muted">
                        {format(new Date(date), 'MMM d, h:mm a')} • <span className="capitalize">{type}</span>
                    </p>
                </div>
            </div>

            <div className="text-right">
                <p className={cn("font-bold tracking-tight", colorClass)}>
                    {isNegative ? '-' : '+'}{convertAndFormat(amount, txCurrency || 'USD')}
                </p>
                <p className={cn(
                    "text-xs font-medium uppercase",
                    status === 'completed' ? 'text-status-success' :
                        status === 'pending' ? 'text-status-warning' : 'text-status-error'
                )}>
                    {status}
                </p>
            </div>
        </div>
    );
};

export default TransactionItem;
