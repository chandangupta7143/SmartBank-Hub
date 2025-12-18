import { useAdminStore } from '../store/useAdminStore';
import { FileText, Clock, User, Shield } from 'lucide-react';

const AdminAudit = () => {
    const { auditLogs } = useAdminStore();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <FileText className="text-gray-500" /> Audit Log
            </h1>
            <p className="text-gray-400 text-sm">Immutable record of all admin actions performed in this session.</p>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden">
                <div className="divide-y divide-white/5">
                    {auditLogs.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 text-sm">No actions recorded yet.</div>
                    ) : (
                        auditLogs.map(log => (
                            <div key={log.id} className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gray-900 border border-white/10 shrink-0 text-gray-400`}>
                                    <Shield size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-bold text-white uppercase tracking-wide">{log.action}</span>
                                        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300 font-mono">
                                            {log.target}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400 truncate">{log.details}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="flex items-center justify-end gap-1 text-xs text-gray-500 mb-1">
                                        <User size={10} /> {log.admin}
                                    </div>
                                    <div className="flex items-center justify-end gap-1 text-xs text-gray-600 font-mono">
                                        <Clock size={10} /> {new Date(log.timestamp).toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminAudit;
