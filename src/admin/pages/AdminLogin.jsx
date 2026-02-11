import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '../store/useAdminStore';
import { motion } from 'framer-motion';
import { ShieldAlert, Lock, ArrowRight, AlertTriangle } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAdminStore();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (login(email, password)) {
            navigate('/admin/dashboard');
        } else {
            setError('Invalid credentials. Access Denied.');
        }
    };

    return (
        <div className="min-h-screen bg-[#020202] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo / Badge */}
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-[0_0_40px_-5px_rgba(220,38,38,0.5)] rotate-45">
                        <ShieldAlert className="text-white -rotate-45" size={32} />
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-orange-600"></div>

                    <h2 className="text-2xl font-bold text-white mb-2 text-center">Admin Access</h2>
                    <p className="text-center text-gray-500 mb-8 text-sm">Restricted to authorized personnel only.</p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm">
                            <AlertTriangle size={16} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Email ID</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-red-500/50 focus:outline-none transition-colors"
                                placeholder="admin@smartbank.com"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-red-500/50 focus:outline-none transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3 rounded-lg shadow-lg shadow-red-900/20 transition-all flex items-center justify-center gap-2 group mt-4"
                        >
                            Authenticate <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest flex items-center justify-center gap-2">
                            <Lock size={10} /> Secure Environment v2.4.0
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminLogin;
