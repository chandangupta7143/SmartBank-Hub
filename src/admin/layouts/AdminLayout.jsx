import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdminStore } from '../store/useAdminStore';
import {
    LayoutDashboard, Users, CreditCard, LogOut, ShieldAlert
} from 'lucide-react';

const AdminSidebarItem = ({ to, icon: Icon, label }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all mb-1 ${isActive
            ? 'bg-red-500/10 text-red-500 border border-red-500/20'
            : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}>
            <Icon size={18} />
            <span className="text-sm font-medium">{label}</span>
        </Link>
    );
};

const AdminLayout = () => {
    const { adminUser, logout } = useAdminStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    if (!adminUser) {
        // Fallback if protected route logic in App.jsx misses (double safety)
        return <div className="p-10 text-white">Access Denied</div>;
    }

    return (
        <div className="flex h-screen bg-[#050505] text-white font-sans selection:bg-red-500/30">
            {/* Admin Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-[#0a0a0a] flex flex-col">
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                            <ShieldAlert className="text-white" size={18} />
                        </div>
                        <div>
                            <h1 className="font-bold tracking-tight text-white">Fusion Admin</h1>
                            <div className="text-[10px] text-red-500 font-mono uppercase tracking-widest"> restricted area</div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-3">
                    <div className="px-4 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Core</div>
                    <AdminSidebarItem to="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
                    <AdminSidebarItem to="/admin/users" icon={Users} label="User Management" />
                    <AdminSidebarItem to="/admin/wallets" icon={CreditCard} label="Wallets & Funds" />
                </div>

                <div className="p-4 border-t border-white/5 bg-red-900/5">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold">
                            {adminUser.name.charAt(0)}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium truncate">{adminUser.name}</p>
                            <p className="text-xs text-gray-500 truncate capitalize">{adminUser.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-xs text-gray-400 hover:text-white"
                    >
                        <LogOut size={14} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto bg-[#050505] relative">
                {/* Top Mock Environment Bar */}
                <div className="h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600"></div>
                <div className="bg-red-950/30 border-b border-red-900/20 px-6 py-2 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                        <span className="text-xs font-mono text-orange-400">MOCK_MODE_ENABLED: Write actions are simulated</span>
                    </div>
                    <div className="text-xs font-mono text-gray-500">v2.4.0-admin</div>
                </div>

                <div className="p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
