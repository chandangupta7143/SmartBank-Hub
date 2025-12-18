import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.jpg';

const AuthLayout = () => {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side - Hero / Visuals */}
            <div className="hidden lg:flex flex-col justify-between bg-app-surface p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-app-bg to-brand-accent/10 pointer-events-none" />

                {/* Branding */}
                <div className="relative z-10">
                    <Link to="/" className="flex items-center gap-4 group cursor-pointer inline-flex">
                        <div className="relative transform group-hover:scale-105 transition-transform duration-300">
                            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                            <img
                                src={logo}
                                alt="SmartBank Hub"
                                className="relative w-12 h-12 rounded-xl object-contain bg-black border border-white/10"
                            />
                        </div>

                        <div className="flex flex-col">
                            <h1 className="font-brand text-2xl font-black tracking-tighter text-white leading-none group-hover:text-brand-primary transition-colors duration-300">
                                SmartBank
                            </h1>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold tracking-[0.4em] text-app-text-muted uppercase">HUB</span>
                                <div className="h-[2px] w-8 bg-gradient-to-r from-brand-primary to-transparent rounded-full"></div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-md">
                    <h1 className="text-4xl font-bold mb-4 text-white">
                        Future of Banking is Here.
                    </h1>
                    <p className="text-app-text-muted text-lg">
                        Experience the next generation of financial management with SmartBank Hub.
                        Secure, fast, and purely digital.
                    </p>
                </div>

                {/* Footer */}
                <div className="relative z-10 text-sm text-app-text-muted">
                    &copy; 2024 SmartBank Hub Inc.
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-6 lg:p-12 bg-app-bg">
                <div className="w-full max-w-md">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
