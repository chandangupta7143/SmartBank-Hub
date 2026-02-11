import { useAdminStore } from '../store/useAdminStore';
import { Users, AlertCircle, RefreshCw, DollarSign, Activity } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 relative overflow-hidden">
        <div className={`absolute top-0 right-0 p-4 opacity-10 ${color}`}>
            <Icon size={48} />
        </div>
        <h3 className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-2">{title}</h3>
        <p className="text-3xl font-bold text-white mb-2">{value}</p>
        <p className={`text-xs ${parseInt(change) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change} <span className="text-gray-600 ml-1">vs last week</span>
        </p>
    </div>
);

const AdminDashboard = () => {
    const { users, kycQueue, settings, auditLogs } = useAdminStore(); // Get auditLogs

    const activeUsers = users.filter(u => u.status === 'active').length;
    const pendingKYC = kycQueue.length;
    const totalBalance = users.reduce((acc, curr) => acc + curr.balance, 0);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">System Overview</h1>
                    <p className="text-gray-400">Monitoring {users.length} users and system health.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2">
                        <RefreshCw size={14} /> Refresh Data
                    </button>
                    {settings.maintenanceMode && (
                        <div className="px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-lg text-sm text-orange-500 flex items-center gap-2 animate-pulse">
                            <AlertCircle size={14} /> Maintenance Active
                        </div>
                    )}
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    title="Total Active Users"
                    value={activeUsers}
                    change="+12%"
                    icon={Users}
                    color="text-blue-500"
                />
                <StatCard
                    title="Pending KYC"
                    value={pendingKYC}
                    change={pendingKYC > 0 ? "+5%" : "0%"}
                    icon={Activity}
                    color="text-orange-500"
                />
                <StatCard
                    title="System Float (USD)"
                    value={formatCurrency(totalBalance, 'USD')}
                    change="+8.4%"
                    icon={DollarSign}
                    color="text-green-500"
                />
                <StatCard
                    title="Failed Jobs (24h)"
                    value="0"
                    change="-100%"
                    icon={AlertCircle}
                    color="text-red-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
                    <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                        <Activity className="text-red-500" size={18} /> Recent System Actions
                    </h3>
                    <div className="space-y-4">
                        {auditLogs.slice(0, 5).map(log => (
                            <div key={log.id} className="p-4 bg-white/5 rounded-lg border border-white/5 flex justify-between items-center">
                                <div className="text-sm">
                                    <span className="text-blue-400 font-mono text-xs">[{log.action}]</span>
                                    <span className="text-gray-400 ml-2">{log.details}</span>
                                </div>
                                <span className="text-xs text-gray-600">{new Date(log.timestamp).toLocaleTimeString()}</span>
                            </div>
                        ))}
                        {auditLogs.length === 0 && (
                            <div className="text-center text-gray-500 text-xs py-4">No recent activity</div>
                        )}
                    </div>
                </div>

                {/* KYC Preview */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
                    <h3 className="font-bold text-white mb-6 flex items-center gap-2 text-orange-500">
                        <AlertCircle size={18} /> Pending KYC Requests
                    </h3>

                    {pendingKYC === 0 ? (
                        <div className="h-40 flex flex-col items-center justify-center text-gray-600">
                            <Activity size={32} className="mb-2 opacity-20" />
                            <p className="text-sm">Queue is empty</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {kycQueue.slice(0, 3).map(kyc => (
                                <div key={kyc.id} className="flex items-center justify-between p-4 bg-orange-500/5 border border-orange-500/20 rounded-lg">
                                    <div>
                                        <p className="text-white font-medium">{kyc.name}</p>
                                        <p className="text-xs text-orange-400">Doc: {kyc.docType}</p>
                                    </div>
                                    <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors">
                                        Review
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
