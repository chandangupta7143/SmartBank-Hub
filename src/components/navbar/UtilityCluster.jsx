import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, UserCircle, ChevronDown, LogOut, Settings as SettingsIcon, HelpCircle, Shield } from 'lucide-react';
import { Button } from '../ui/Button';
import PremiumAuthButton from '../ui/PremiumAuthButton';
import { useAuth } from '../../hooks/useAuth';
import { NOTIFICATIONS, PROFILE_MENU } from '../../mocks/nav-mock';
import { motion, AnimatePresence } from 'framer-motion';

const UtilityCluster = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex items-center gap-3 sm:gap-4">
            {/* Notifications */}
            <div className="relative">
                <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 text-app-text-muted hover:text-white hover:bg-white/5 rounded-full transition-colors relative"
                    aria-label="Notifications"
                >
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse border border-black"></span>
                </button>

                <AnimatePresence>
                    {showNotifications && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute top-full right-0 mt-2 w-80 bg-[#0A0F1C] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-3xl"
                        >
                            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                                <h3 className="font-bold text-white text-sm">Notifications</h3>
                                <span className="text-[10px] bg-brand-primary/20 text-brand-primary px-2 py-0.5 rounded-full">3 New</span>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                {NOTIFICATIONS.map((n) => (
                                    <div key={n.id} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                                        <div className="flex gap-3">
                                            <div className="w-2 h-2 mt-2 rounded-full bg-brand-secondary shrink-0 group-hover:shadow-[0_0_8px_rgba(79,157,255,0.6)] transition-shadow"></div>
                                            <div>
                                                <p className="text-sm text-gray-300 leading-snug group-hover:text-white transition-colors">{n.text}</p>
                                                <span className="text-[10px] text-gray-500 mt-1 block font-mono">{n.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-2 bg-black/20 text-center">
                                <button className="text-xs text-brand-primary hover:text-brand-secondary transition-colors font-medium">Mark all as read</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="h-6 w-px bg-white/10 hidden sm:block"></div>

            {/* Auth Actions */}
            {user ? (
                <div className="relative">
                    <button
                        onClick={() => setShowProfile(!showProfile)}
                        className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-white/5 transition-all border border-transparent hover:border-white/10 group"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary p-[1px] shadow-lg group-hover:shadow-brand-primary/20 transition-shadow">
                            <div className="w-full h-full rounded-full bg-[#0A0F1C] flex items-center justify-center">
                                <UserCircle size={18} className="text-white" />
                            </div>
                        </div>
                        <span className="text-sm font-medium text-white hidden sm:block">{user.name}</span>
                        <ChevronDown size={14} className="text-gray-500 group-hover:text-white transition-colors" />
                    </button>

                    <AnimatePresence>
                        {showProfile && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute top-full right-0 mt-2 w-56 bg-[#0A0F1C] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 p-1"
                            >
                                <div className="px-3 py-2 border-b border-white/5 mb-1">
                                    <p className="text-xs text-gray-500">Signed in as</p>
                                    <p className="text-sm font-bold text-white truncate">{user.email || 'User'}</p>
                                </div>
                                {PROFILE_MENU.map((item) => (
                                    <Link
                                        key={item.label}
                                        to={item.href}
                                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                        onClick={() => setShowProfile(false)}
                                    >
                                        {item.label === 'Dashboard' && <UserCircle size={16} />}
                                        {item.label === 'Settings' && <SettingsIcon size={16} />}
                                        {item.label === 'Help Center' && <HelpCircle size={16} />}
                                        {item.label}
                                    </Link>
                                ))}
                                {/* Admin Link */}
                                <Link
                                    to="/admin/login"
                                    className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors mt-1"
                                    onClick={() => setShowProfile(false)}
                                >
                                    <Shield size={16} /> Admin Panel
                                </Link>
                                <div className="h-px bg-white/5 my-1"></div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <Link to="/login">
                        <PremiumAuthButton variant="glass-login" className="px-5 py-2">
                            Log In
                        </PremiumAuthButton>
                    </Link>
                    <Link to="/signup">
                        <PremiumAuthButton variant="solid-signup" className="px-6 py-2">
                            Open Account
                        </PremiumAuthButton>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UtilityCluster;
