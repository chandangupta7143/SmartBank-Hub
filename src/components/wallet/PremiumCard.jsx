import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Copy, Wifi } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../utils/cn';
import { useCurrencyStore } from '../../store/useCurrencyStore';

const PremiumCard = ({ balance, currency = 'USD', holderName = 'My Account' }) => {
    const { convertAndFormat } = useCurrencyStore();
    const [showBalance, setShowBalance] = useState(true);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);
    const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-[1.586/1] rounded-3xl overflow-hidden cursor-default perspective-1000 group"
        >
            {/* Card Background - Deep Premium Mesh */}
            <div className="absolute inset-0 bg-[#0f0f0f] bg-gradient-to-br from-[#1a1a1a] to-black z-0"></div>

            {/* Dynamic Orbs/Glows */}
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-brand-primary/20 blur-[80px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[60px]" />

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0 mix-blend-overlay"></div>

            {/* Glass Glare */}
            <motion.div
                style={{
                    background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.1) 0%, transparent 60%)`
                }}
                className="absolute inset-0 z-10 pointer-events-none"
            />

            {/* Content Container */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-20 text-white transform-style-3d">

                {/* Top Row: Chip & Wifi & Visa */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        {/* Realistic EMV Chip */}
                        <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-yellow-200 to-yellow-500 border border-yellow-600/50 shadow-inner overflow-hidden relative">
                            <div className="absolute inset-0 border-[0.5px] border-black/20 rounded-md m-[2px]"></div>
                            <div className="absolute top-1/2 w-full h-[0.5px] bg-black/20"></div>
                            <div className="absolute left-1/2 h-full w-[0.5px] bg-black/20"></div>
                            <div className="absolute left-1/3 top-1/4 w-1/3 h-1/2 border border-black/20 rounded-sm"></div>
                        </div>
                        <Wifi className="text-white/50 rotate-90" size={20} />
                    </div>

                    <div className="text-right">
                        <h3 className="text-lg font-bold italic tracking-wider opacity-90">VISA</h3>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Infinite</span>
                    </div>
                </div>

                {/* Middle: Number */}
                <div className="mt-4">
                    <div className="flex items-center gap-4 group/number cursor-pointer w-fit">
                        <p className="font-mono text-xl md:text-2xl tracking-widest text-white/90 shadow-black drop-shadow-md">
                            •••• •••• •••• 4242
                        </p>
                        <Copy size={16} className="text-white/30 opacity-0 group-hover/number:opacity-100 transition-opacity" />
                    </div>
                </div>

                {/* Bottom: Holder & Balance */}
                <div className="flex justify-between items-end mt-4">
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Card Holder</p>
                        <p className="font-medium tracking-wide text-white/90 uppercase text-sm md:text-base">{holderName}</p>
                    </div>

                    <div className="text-right pointer-events-auto">
                        <button
                            onClick={() => setShowBalance(!showBalance)}
                            className="bg-white/5 hover:bg-white/10 border border-white/5 backdrop-blur-md rounded-xl px-4 py-2 transition-all group/btn"
                        >
                            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Current Balance</p>
                            <div className="h-8 flex items-center justify-end overflow-hidden">
                                {showBalance ? (
                                    <motion.p
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        key="bal"
                                        className="text-xl md:text-2xl font-bold tracking-tight text-white drop-shadow-lg"
                                    >
                                        {convertAndFormat(balance, currency)}
                                    </motion.p>
                                ) : (
                                    <motion.div
                                        initial={{ filter: 'blur(0px)' }}
                                        animate={{ filter: 'blur(8px)' }}
                                        className="h-full flex items-center"
                                    >
                                        <p className="text-xl font-bold text-white/50">$ ••••••</p>
                                    </motion.div>
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Shiny Border */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 z-30 pointer-events-none"></div>
        </motion.div>
    );
};

export default PremiumCard;
