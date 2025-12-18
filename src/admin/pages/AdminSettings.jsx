import { useAdminStore } from '../store/useAdminStore';
import { ToggleLeft, ToggleRight, Server, Database, ShieldAlert, BadgeCheck } from 'lucide-react';
import { toast } from 'sonner';

const AdminSettings = () => {
    const { settings, toggleMaintenance } = useAdminStore();

    const handleMaintenanceToggle = () => {
        if (confirm('Are you sure? This will simulate maintenance mode.')) {
            toggleMaintenance();
            toast.success(`Maintenance Mode ${!settings.maintenanceMode ? 'ENABLED' : 'DISABLED'}`);
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-white mb-6">System Settings</h1>

            {/* Critical Zone */}
            <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-6">
                <h3 className="text-red-500 font-bold uppercase tracking-wider text-sm mb-6 flex items-center gap-2">
                    <ShieldAlert size={16} /> Danger Zone
                </h3>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-white font-bold">Maintenance Mode</p>
                        <p className="text-sm text-gray-500">Prevents user logins and displays maintenance banner.</p>
                    </div>
                    <button onClick={handleMaintenanceToggle} className="text-red-500 hover:text-red-400 transition-colors">
                        {settings.maintenanceMode ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
                    </button>
                </div>
            </div>

            {/* Feature Flags */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
                <h3 className="text-gray-400 font-bold uppercase tracking-wider text-sm mb-6 flex items-center gap-2">
                    <BadgeCheck size={16} /> Feature Flags (Mock)
                </h3>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-bold">QR Payments</p>
                            <p className="text-sm text-gray-500">Enable/Disable QR code generation and scanning.</p>
                        </div>
                        <button className="text-green-500 hover:text-green-400 transition-colors">
                            <ToggleRight size={40} />
                        </button>
                    </div>
                    <div className="flex items-center justify-between opacity-50">
                        <div>
                            <p className="text-white font-bold">Crypto Wallet</p>
                            <p className="text-sm text-gray-500">Beta feature. Currently disabled globally.</p>
                        </div>
                        <button className="text-gray-600 cursor-not-allowed">
                            <ToggleLeft size={40} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Environment Info */}
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
                    <h4 className="text-gray-500 text-xs font-bold uppercase mb-4 flex items-center gap-2">
                        <Server size={14} /> API Environment
                    </h4>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Endpoint</span>
                            <span className="text-white font-mono">api.mock-fusion.internal</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Status</span>
                            <span className="text-green-500 font-bold">ONLINE</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Latency</span>
                            <span className="text-white font-mono">12ms</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
                    <h4 className="text-gray-500 text-xs font-bold uppercase mb-4 flex items-center gap-2">
                        <Database size={14} /> Database Status
                    </h4>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Type</span>
                            <span className="text-white font-mono">LocalStorage (Mock)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Records</span>
                            <span className="text-white font-mono">142</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Last Backup</span>
                            <span className="text-white font-mono">Never</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
