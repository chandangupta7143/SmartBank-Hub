import { useStore } from '../store/useStore';
import { Bell, Check, Info, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

const Notifications = () => {
    // Mock notifications - in real app, would come from React Query
    const notifications = [];

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Bell className="text-brand-primary" /> Notifications
                </h1>
            </div>

            {notifications.length === 0 ? (
                <div className="text-center py-20 bg-app-surface border border-white/5 rounded-2xl">
                    <Bell size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-app-text-muted">No new notifications</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {notifications.map((n, i) => (
                        <div key={n.id || i} className="bg-app-surface border border-white/5 rounded-xl p-4 flex gap-4 hover:border-brand-primary/20 transition-colors animate-in fade-in slide-in-from-bottom-2">
                            <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0 
                                ${n.type === 'success' ? 'bg-status-success/10 text-status-success' :
                                    n.type === 'warning' ? 'bg-status-warning/10 text-status-warning' :
                                        'bg-status-info/10 text-status-info'}`}>
                                {n.type === 'success' ? <Check size={20} /> : n.type === 'warning' ? <AlertTriangle size={20} /> : <Info size={20} />}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-bold text-sm">{n.title}</h4>
                                    <span className="text-[10px] text-app-text-muted">{n.time ? format(new Date(n.time), 'MMM d, HH:mm') : 'Just now'}</span>
                                </div>
                                <p className="text-sm text-app-text-muted">{n.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notifications;
