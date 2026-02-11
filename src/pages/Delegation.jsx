import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { delegationService } from '../services/delegationService';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Users, UserPlus, Ban, History, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';

const Delegation = () => {
    const queryClient = useQueryClient();
    const [name, setName] = useState('');
    const [limit, setLimit] = useState('');

    const { data: delegates, isLoading } = useQuery({
        queryKey: ['delegates'],
        queryFn: delegationService.getDelegates
    });

    const addMutation = useMutation({
        mutationFn: async () => delegationService.addDelegate(name, limit),
        onSuccess: () => {
            queryClient.invalidateQueries(['delegates']);
            setName('');
            setLimit('');
        }
    });

    const revokeMutation = useMutation({
        mutationFn: delegationService.revokeDelegate,
        onSuccess: () => queryClient.invalidateQueries(['delegates'])
    });

    const handleAdd = (e) => {
        e.preventDefault();
        if (!name || !limit) return;
        addMutation.mutate();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold flex items-center gap-2">
                <ShieldCheck className="text-brand-primary" /> Delegation Management
            </h1>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Form */}
                <div className="md:col-span-1">
                    <div className="bg-app-surface border border-white/5 rounded-xl p-6">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <UserPlus size={18} /> Add Delegate
                        </h3>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div>
                                <label className="text-xs text-app-text-muted mb-1 block">Delegate Name</label>
                                <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. John Doe" />
                            </div>
                            <div>
                                <label className="text-xs text-app-text-muted mb-1 block">Daily Limit (USD)</label>
                                <Input type="number" value={limit} onChange={e => setLimit(e.target.value)} placeholder="1000" />
                            </div>
                            <Button isLoading={addMutation.isPending} className="w-full">
                                Create Delegate
                            </Button>
                        </form>
                    </div>
                </div>

                {/* List */}
                <div className="md:col-span-2">
                    <div className="bg-app-surface border border-white/5 rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-white/5 flex justify-between items-center">
                            <h3 className="font-bold flex items-center gap-2">
                                <Users size={18} /> Active Delegates
                            </h3>
                            <span className="text-xs text-app-text-muted">{delegates?.length || 0} configured</span>
                        </div>

                        <div className="divide-y divide-white/5">
                            {isLoading ? (
                                <div className="p-8 text-center text-app-text-muted">Loading delegates...</div>
                            ) : delegates?.length === 0 ? (
                                <div className="p-8 text-center text-app-text-muted">No delegates found.</div>
                            ) : (
                                delegates.map(d => (
                                    <div key={d.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-brand-secondary/20 flex items-center justify-center text-brand-secondary">
                                                <Users size={20} />
                                            </div>
                                            <div>
                                                <p className="font-medium flex items-center gap-2">
                                                    {d.name}
                                                    {!d.active && <span className="px-1.5 py-0.5 bg-status-error/20 text-status-error text-[10px] rounded">REVOKED</span>}
                                                </p>
                                                <div className="flex gap-4 text-xs text-app-text-muted">
                                                    <span>Limit: ${d.limit}</span>
                                                    <span>Spent: ${d.spent}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {d.active ? (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => revokeMutation.mutate(d.id)}
                                                className="text-status-error hover:bg-status-error/10"
                                            >
                                                <Ban size={16} />
                                            </Button>
                                        ) : (
                                            <span className="text-xs text-app-text-muted italic">Inactive</span>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Mock Audit */}
                    <div className="mt-8">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <History size={18} /> Activity Audit
                        </h3>
                        <div className="bg-app-surface border border-white/5 rounded-xl p-4 text-sm space-y-3">
                            {/* Static mock audit log for now */}
                            <div className="text-center text-app-text-muted py-2 text-xs">
                                No activity recorded.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Delegation;
