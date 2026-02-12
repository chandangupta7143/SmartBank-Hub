import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import {
    LayoutDashboard,
    Wallet,
    ArrowRightLeft,
    QrCode,
    Users,
    Settings,
    LogOut,
    TrendingUp
} from 'lucide-react';
import { cn } from '../utils/cn';
import logo from '../assets/logo.jpg';

const NavItem = ({ to, icon: Icon, label }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all mx-2",
                isActive
                    ? "bg-brand-primary/10 text-brand-primary font-medium shadow-[0_0_15px_rgba(59,130,246,0.2)] border border-brand-primary/20"
                    : "text-app-text-muted hover:text-white hover:bg-white/5"
            )}
        >
            <Icon size={20} className={isActive ? "animate-pulse" : ""} />
            <span>{label}</span>
        </Link>
    )
};

const Sidebar = () => {
    const { user } = useStore();

    return (
        <aside className="w-64 bg-app-surface border-r border-white/5 flex flex-col h-full fixed left-0 top-0 z-20 backdrop-blur-xl">
            <div className="p-6 border-b border-white/5">
                <Link to="/dashboard" className="flex items-center gap-3 group cursor-pointer">
                    <div className="relative transform group-hover:scale-105 transition-transform duration-300">
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                        <img
                            src={logo}
                            alt="SmartBank Hub"
                            className="relative w-10 h-10 rounded-lg object-contain bg-black border border-white/10"
                        />
                    </div>

                    <div className="flex flex-col">
                        <h1 className="font-brand text-xl font-black tracking-tighter text-white leading-none group-hover:text-brand-primary transition-colors duration-300">
                            SmartBank
                        </h1>
                        <div className="flex items-center gap-2">
                            <span className="text-[8px] font-bold tracking-[0.4em] text-app-text-muted uppercase">HUB</span>
                            <div className="h-[1.5px] w-6 bg-gradient-to-r from-brand-primary to-transparent rounded-full"></div>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="flex-1 flex flex-col gap-1 overflow-y-auto py-6">
                <div className="px-6 mb-2 text-xs font-bold text-app-text-muted uppercase tracking-wider">
                    Menu
                </div>
                <NavItem to="/dashboard" icon={LayoutDashboard} label="Overview" />
                <NavItem to="/dashboard/wallet" icon={Wallet} label="My Wallet" />
                <NavItem to="/dashboard/transactions" icon={ArrowRightLeft} label="Transactions" />
                <NavItem to="/dashboard/analytics" icon={TrendingUp} label="Analytics" />

                <div className="px-6 mt-6 mb-2 text-xs font-bold text-app-text-muted uppercase tracking-wider">
                    Payments
                </div>
                <NavItem to="/dashboard/qr" icon={QrCode} label="QR Pay" />
                <NavItem to="/dashboard/contacts" icon={Users} label="P2P & Contacts" />



            </div>

            <div className="p-4 border-t border-white/5 bg-black/20">
                <NavItem to="/dashboard/settings" icon={Settings} label="Settings" />
            </div>
        </aside>
    );
};

export default Sidebar;
