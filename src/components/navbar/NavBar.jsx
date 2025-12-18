import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import logo from '../../assets/logo.jpg';

const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Dynamic Glass Effect based on scroll
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* --- Main Floating Navbar --- */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-spring ${isScrolled ? 'w-[90%] max-w-[1000px]' : 'w-[95%] max-w-[1200px]'
                    }`}
            >
                <nav
                    className={`
                        relative rounded-full px-6 py-3.5 flex justify-between items-center
                        border border-white/10
                        transition-all duration-500
                        ${isScrolled
                            ? 'bg-black/40 backdrop-blur-3xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
                            : 'bg-white/5 backdrop-blur-2xl shadow-lg'
                        }
                    `}
                >
                    {/* 1. LEFT: Minimal Brand Identity */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-inner ring-1 ring-white/10">
                            <img src={logo} alt="Logo" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent mix-blend-overlay" />
                        </div>
                        <span className="font-sans font-semibold text-lg tracking-tight text-white/90 group-hover:text-white transition-colors">
                            SmartBank
                        </span>
                    </Link>

                    {/* 2. RIGHT: Strict Auth Cluster (Admin, Login, Signup) */}
                    <div className="flex items-center gap-5">

                        {/* Admin Login (Subtle, Text-only) */}
                        <Link to="/admin/login" className="hidden sm:flex items-center gap-1.5 group/admin">
                            <span className="text-xs font-medium text-white/30 group-hover/admin:text-white/60 transition-colors uppercase tracking-widest">
                                Admin
                            </span>
                        </Link>

                        {/* Divider */}
                        <div className="h-4 w-px bg-white/10 hidden sm:block"></div>

                        {/* Login (Minimal Text) */}
                        <Link to="/login" className="hidden sm:block">
                            <span className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 px-1">
                                Login
                            </span>
                        </Link>

                        {/* Sign Up (Premium Glass Button) */}
                        <Link to="/signup">
                            <button className="relative overflow-hidden pl-6 pr-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_35px_rgba(255,255,255,0.25)] hover:scale-[1.02] transition-all duration-300 group">
                                <span className="relative z-10 flex items-center gap-1">
                                    Sign Up <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                </span>
                                {/* Internal White Shine */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </button>
                        </Link>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={20} className="text-white" />
                        </button>
                    </div>
                </nav>
            </motion.div>

            {/* --- Mobile Menu (Full Screen Glass) --- */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-3xl flex flex-col items-center justify-center p-6"
                    >
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex flex-col items-center w-full max-w-sm space-y-6">

                            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                                <button className="w-full py-4 rounded-2xl border border-white/10 text-xl font-medium text-white hover:bg-white/5 transition-colors">
                                    Login
                                </button>
                            </Link>

                            <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                                <button className="w-full py-4 rounded-2xl bg-white text-black text-xl font-bold shadow-xl hover:scale-[1.02] transition-transform">
                                    Sign Up
                                </button>
                            </Link>

                            <div className="w-12 h-px bg-white/10 my-4"></div>

                            <Link to="/admin/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <span className="text-sm font-medium text-white/40 uppercase tracking-widest hover:text-white transition-colors">
                                    Admin Access
                                </span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default NavBar;
