import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useAuth } from '../hooks/useAuth';
import {
    Moon, Sun, DollarSign, Languages, User, Bell, Shield, Trash2,
    Mail, LogOut, CheckCircle, Smartphone, Lock
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const TABS = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Moon }, // Using Moon as visual rep for appearance/prefs
    { id: 'security', label: 'Security', icon: Shield },
];

const Settings = () => {
    const { toggleTheme, theme, wallet, setCurrency } = useStore();
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('account');

    // Mock States
    const [name, setName] = useState(user?.name || 'Demo User');
    const [email, setEmail] = useState('user@smartbank.hub');
    const [notifEmail, setNotifEmail] = useState(true);
    const [notifPush, setNotifPush] = useState(true);

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        toast.promise(new Promise(r => setTimeout(r, 1000)), {
            loading: 'Updating profile...',
            success: 'Profile updated successfully',
            error: 'Failed to update'
        });
    };

    const handleDeleteAccount = () => {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            toast.error("Account Deletion Simulated", { description: "In a real app, your data would be wiped." });
            logout();
        }
    };

    return (
        <div className="max-w-4xl mx-auto min-h-[600px]">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Tabs */}
                <div className="w-full md:w-64 space-y-1">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                ? 'bg-brand-primary/10 text-brand-primary shadow-sm ring-1 ring-brand-primary/20'
                                : 'text-app-text-muted hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}

                    <div className="pt-4 mt-4 border-t border-white/5">
                        <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-status-error hover:bg-status-error/10 transition-colors">
                            <LogOut size={18} />
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 space-y-6">
                    {activeTab === 'account' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            {/* Profile Card */}
                            <div className="bg-app-surface border border-white/5 rounded-2xl p-6">
                                <h3 className="font-bold mb-6 text-lg">Profile Information</h3>
                                <div className="flex items-start gap-6 mb-8">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary p-[2px]">
                                        <div className="w-full h-full rounded-full bg-app-surface flex items-center justify-center overflow-hidden">
                                            <User size={32} className="text-white/50" />
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <Button variant="secondary" size="sm">Change Avatar</Button>
                                        <p className="text-xs text-app-text-muted">JPG, GIF or PNG. Max size of 800K</p>
                                    </div>
                                </div>

                                <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
                                    <div>
                                        <label className="text-xs font-medium text-app-text-muted mb-1 block">Full Name</label>
                                        <Input value={name} onChange={e => setName(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-app-text-muted mb-1 block">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-2.5 text-app-text-muted" size={16} />
                                            <Input className="pl-10" value={email} onChange={e => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                    <Button className="mt-2">
                                        Save Changes
                                    </Button>
                                </form>
                            </div>

                            {/* Danger Zone */}
                            <div className="border border-status-error/30 bg-status-error/5 rounded-2xl p-6">
                                <h3 className="font-bold text-status-error mb-2 flex items-center gap-2">
                                    <Trash2 size={18} /> Danger Zone
                                </h3>
                                <p className="text-sm text-app-text-muted mb-4">
                                    Once you delete your account, there is no going back. Please be certain.
                                </p>
                                <Button variant="ghost" onClick={handleDeleteAccount} className="text-status-error hover:bg-status-error hover:text-white border border-status-error/50">
                                    Delete Account
                                </Button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'preferences' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            {/* Appearance */}
                            <div className="bg-app-surface border border-white/5 rounded-2xl p-6">
                                <h3 className="font-bold mb-6 text-lg">Appearance</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl">
                                            {theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
                                        </div>
                                        <div>
                                            <p className="font-medium">Interface Theme</p>
                                            <p className="text-sm text-app-text-muted">Select your preferred viewing mode</p>
                                        </div>
                                    </div>
                                    <div className="flex bg-app-surface-highlight rounded-lg p-1">
                                        <button
                                            onClick={() => theme !== 'light' && toggleTheme()}
                                            className={`px-3 py-1.5 rounded-md text-sm transition-all ${theme === 'light' ? 'bg-white text-black shadow-sm' : 'text-app-text-muted hover:text-white'}`}
                                        >
                                            Light
                                        </button>
                                        <button
                                            onClick={() => theme !== 'dark' && toggleTheme()}
                                            className={`px-3 py-1.5 rounded-md text-sm transition-all ${theme === 'dark' ? 'bg-app-surface shadow-sm text-white' : 'text-app-text-muted hover:text-white'}`}
                                        >
                                            Dark
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Regional */}
                            <div className="bg-app-surface border border-white/5 rounded-2xl p-6">
                                <h3 className="font-bold mb-6 text-lg">Regional</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <DollarSign size={18} className="text-app-text-muted" />
                                            <span className="font-medium">Currency</span>
                                        </div>
                                        <select
                                            value={wallet.currency}
                                            onChange={(e) => setCurrency(e.target.value)}
                                            className="bg-app-surface-highlight border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-brand-primary"
                                        >
                                            <option value="USD">USD ($)</option>
                                            <option value="EUR">EUR (€)</option>
                                            <option value="GBP">GBP (£)</option>
                                            <option value="INR">INR (₹)</option>
                                            <option value="JPY">JPY (¥)</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Languages size={18} className="text-app-text-muted" />
                                            <span className="font-medium">Language</span>
                                        </div>
                                        <select className="bg-app-surface-highlight border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-brand-primary">
                                            <option>English (US)</option>
                                            <option>Spanish</option>
                                            <option>French</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            {/* 2FA & Auth */}
                            <div className="bg-app-surface border border-white/5 rounded-2xl p-6">
                                <h3 className="font-bold mb-6 text-lg flex items-center gap-2">
                                    <Shield size={20} className="text-brand-secondary" /> Two-Factor Authentication
                                </h3>

                                <div className="flex items-center justify-between p-4 border border-white/5 rounded-xl bg-white/[0.02]">
                                    <div className="flex gap-4">
                                        <div className="mt-1">
                                            <Smartphone size={20} className="text-app-text-muted" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Authenticator App</p>
                                            <p className="text-sm text-app-text-muted">Use an app like Google Authenticator</p>
                                        </div>
                                    </div>
                                    <Button size="sm" onClick={() => toast.success("Configured successfully")}>Setup</Button>
                                </div>
                            </div>

                            {/* Notification Settings */}
                            <div className="bg-app-surface border border-white/5 rounded-2xl p-6">
                                <h3 className="font-bold mb-6 text-lg flex items-center gap-2">
                                    <Bell size={20} className="text-brand-accent" /> Notification Preferences
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-3">
                                            <Mail size={18} className="text-app-text-muted" />
                                            <div>
                                                <p className="font-medium text-sm">Email Notifications</p>
                                                <p className="text-xs text-app-text-muted">Get security alerts and monthly statements</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setNotifEmail(!notifEmail)}
                                            className={`w-10 h-5 rounded-full transition-colors relative ${notifEmail ? 'bg-brand-primary' : 'bg-white/10'}`}
                                        >
                                            <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${notifEmail ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                        </button>
                                    </div>
                                    <div className="border-t border-white/5 my-2"></div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-3">
                                            <Bell size={18} className="text-app-text-muted" />
                                            <div>
                                                <p className="font-medium text-sm">Push Notifications</p>
                                                <p className="text-xs text-app-text-muted">Real-time transaction alerts</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setNotifPush(!notifPush)}
                                            className={`w-10 h-5 rounded-full transition-colors relative ${notifPush ? 'bg-brand-primary' : 'bg-white/10'}`}
                                        >
                                            <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${notifPush ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Session */}
                            <div className="bg-app-surface border border-white/5 rounded-2xl p-6">
                                <h3 className="font-bold mb-6 text-lg flex items-center gap-2">
                                    <Lock size={20} className="text-app-text-muted" /> Active Sessions
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-status-success"></div>
                                        <span className="text-sm">Windows 11 · Chrome · Current Session</span>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-status-error">Revoke</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="text-center pt-12 pb-4 text-xs text-app-text-muted">
                SmartBank Hub v2.1.0-beta
            </div>
        </div>
    );
};

export default Settings;
