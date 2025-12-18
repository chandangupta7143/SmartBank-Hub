import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Lock, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';

/**
 * PremiumAuthButton
 * 
 * Variants:
 * - 'glass-login': Transparent, subtle border, gloss effect.
 * - 'solid-signup': High contrast, magnetic feel, maximum visibility.
 * - 'stealth-admin': Dark, red accents, hidden until hovered.
 */
const PremiumAuthButton = ({ variant = 'glass-login', children, onClick, className = '' }) => {

    // Base classes shared by all buttons
    const baseClasses = "relative group overflow-hidden rounded-full font-sans font-bold tracking-wide transition-all duration-300 flex items-center justify-center";

    // Variant specific styles
    const variants = {
        'glass-login': {
            container: "bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 hover:border-white/20 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.2)]",
            text: "text-sm",
            icon: null
        },
        'solid-signup': {
            container: "bg-white text-black border border-white hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]",
            text: "text-sm",
            icon: <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        },
        'stealth-admin': {
            container: "bg-black/40 border border-red-500/20 text-red-400/80 hover:text-red-400 hover:bg-red-950/30 hover:border-red-500/50 backdrop-blur-xl shadow-inner",
            text: "text-[10px] uppercase tracking-[0.2em]",
            icon: <ShieldCheck size={14} className="mr-2 group-hover:animate-pulse" />
        }
    };

    const style = variants[variant] || variants['glass-login'];

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            className={`${baseClasses} ${style.container} ${className}`}
            onClick={onClick}
        >
            {/* 1. Global Gloss Sweep (Common to all) */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] group-hover:animate-[gloss-sweep_1s_ease-in-out_infinite]" />

            {/* 2. Specific Effects based on Variant */}

            {/* Helper: Dot Grid Pattern for Admin */}
            {variant === 'stealth-admin' && (
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ff0000_1px,transparent_1px)] [background-size:4px_4px]" />
            )}

            {/* Helper: Star Sparkle for Signup */}
            {variant === 'solid-signup' && (
                <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Sparkles size={12} className="text-yellow-400 animate-spin-slow" />
                </div>
            )}

            {/* Content Layer */}
            <span className={`relative z-10 flex items-center ${style.text}`}>
                {style.icon && variant === 'stealth-admin' && style.icon}
                {children}
                {style.icon && variant !== 'stealth-admin' && style.icon}
            </span>

            {/* 3. Global Badges (Optional Context) */}
            {variant === 'glass-login' && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            )}
        </motion.button>
    );
};

export const GlobalIndicator = () => (
    <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 mx-4 hover:bg-white/10 transition-colors cursor-default group">
        <div className="relative">
            <Globe size={14} className="text-brand-primary opacity-60 group-hover:opacity-100 transition-opacity animate-pulse-slow" />
            <div className="absolute inset-0 bg-brand-primary blur-md opacity-20" />
        </div>
        <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white/80 transition-colors font-mono">
            Global<span className="hidden xl:inline"> Access</span>
        </span>
    </div>
);

export default PremiumAuthButton;
