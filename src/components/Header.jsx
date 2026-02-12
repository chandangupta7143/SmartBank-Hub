import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/Button';
import { Bell, LogOut, Menu, UserCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

const Header = ({ toggleSidebar }) => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const theme = useStore((state) => state.theme);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="h-16 border-b border-white/5 bg-app-surface/50 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 w-full z-20">
            <div className="flex items-center gap-4">
                <button onClick={toggleSidebar} className="lg:hidden p-2 hover:bg-white/5 rounded-lg">
                    <Menu size={20} />
                </button>
                <h2 className="text-lg font-bold hidden md:block text-app-text-muted">
                    Welcome back, <span className="text-white">{user?.name || 'User'}</span>
                </h2>
            </div>

            <div className="flex items-center gap-3">
                <Link to="/dashboard/notifications" className="p-2 hover:bg-white/5 rounded-lg relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-status-error rounded-full animate-pulse"></span>
                </Link>

                <div className="h-8 w-[1px] bg-white/10 mx-1"></div>

                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary p-[1px]">
                        <div className="w-full h-full rounded-full bg-app-surface flex items-center justify-center">
                            <UserCircle size={20} className="text-brand-primary" />
                        </div>
                    </div>
                    <span className="text-sm font-medium hidden sm:block">{user?.name}</span>
                </div>

                <Button variant="ghost" size="sm" onClick={handleLogout} className="ml-2">
                    <LogOut size={18} />
                </Button>
            </div>
        </header >
    );
};

export default Header;
