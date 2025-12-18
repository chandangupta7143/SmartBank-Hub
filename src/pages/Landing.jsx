import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight, Shield, Globe, Zap, CheckCircle2, Lock, TrendingUp, Wifi } from 'lucide-react';
import logo from '../assets/logo.jpg';


import NavBar from '../components/navbar/NavBar';

const Landing = () => {
    return (
        <div className="min-h-screen bg-app-bg text-app-text flex flex-col relative overflow-hidden font-sans">
            <NavBar />

            {/* Background Effects (Subtle & Premium) */}
            <div className="absolute top-0 -left-64 w-[600px] h-[600px] bg-brand-primary/20 rounded-full mix-blend-screen filter blur-[80px] opacity-40 animate-blob"></div>
            <div className="absolute top-0 -right-64 w-[600px] h-[600px] bg-brand-secondary/20 rounded-full mix-blend-screen filter blur-[80px] opacity-40 animate-blob animation-delay-2000"></div>

            {/* Header handled by NavBar component */}

            {/* Hero Section */}
            <main className="flex-1 flex flex-col justify-center relative z-10 pt-40 pb-0">
                <div className="max-w-[1440px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full">

                    {/* Left - Content */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-status-success"></span>
                            </span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-white/80">Global Banking Network</span>
                        </div>

                        <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight font-brand">
                            The Future <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent animate-gradient">of Banking.</span>
                        </h1>

                        <p className="text-xl text-app-text-muted mb-8 max-w-lg leading-relaxed">
                            Experience the speed of light. Without the friction.
                            SmartBank Hub is the next-generation mock banking platform for testing.
                        </p>

                        <div className="flex gap-4 items-center">
                            <Link to="/signup">
                                <Button size="lg" className="h-14 px-8 rounded-full shimmer hover:scale-105 transition-transform text-lg font-brand font-bold">
                                    Start Banking Now <ArrowRight className="ml-2" />
                                </Button>
                            </Link>

                        </div>
                    </div>

                    {/* Right - Premium Visual (Global Elite Card) */}
                    <div className="relative perspective-1000 flex justify-center lg:justify-end py-10">
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-brand-accent/20 blur-[100px] rounded-full" />

                        {/* 3D Floating Composition */}
                        <div className="relative z-10 preserve-3d animate-float-3d">

                            {/* Main Card: The SmartBank Global Elite */}
                            <div className="w-[520px] h-[320px] rounded-[2rem] p-10 relative overflow-hidden shadow-2xl border border-white/10 backdrop-blur-xl bg-[#0a0a0a] group hover:shadow-brand-primary/20 transition-all duration-500 transform translate-z-10">
                                {/* World Map Background Texture */}
                                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center grayscale mix-blend-overlay"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-secondary/10"></div>

                                {/* Glossy Overlay (Static) */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40"></div>

                                {/* Dynamic Gloss Sweep Animation */}
                                <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] animate-gloss-sweep pointer-events-none z-20"></div>

                                <div className="relative z-10 flex flex-col justify-between h-full">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-5">
                                            <img src={logo} alt="SmartBank" className="h-12 w-12 rounded-xl object-contain shadow-lg border border-white/20" />
                                            <div className="flex flex-col">
                                                <div className="text-3xl font-black tracking-widest text-white font-brand leading-none">SMARTBANK</div>
                                                <div className="text-[10px] font-bold tracking-[0.4em] text-brand-primary uppercase text-right">GLOBAL</div>
                                            </div>
                                        </div>
                                        <Globe size={32} className="text-white/20" />
                                    </div>

                                    <div className="flex gap-4 items-center pl-1">
                                        <div className="w-16 h-12 rounded-md bg-gradient-to-br from-[#FFD700] to-[#B8860B] flex items-center justify-center shadow-inner border border-white/10">
                                            <div className="w-12 h-[3px] bg-black/10 rounded-full"></div>
                                        </div>
                                        <Wifi size={28} className="text-white/50 rotate-90" />
                                    </div>

                                    <div>
                                        <div className="font-mono text-3xl tracking-[0.2em] text-white/90 mb-5 drop-shadow-md">
                                            •••• •••• •••• 7143
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <div className="text-xs text-white/50 uppercase tracking-widest mb-1">Card Holder</div>
                                                <div className="text-2xl font-bold text-white tracking-wide font-brand">CHANDAN</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Valid Thru</div>
                                                <div className="text-lg font-mono text-white">--/--</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Status Pill (Bottom Left) */}
                            <div className="absolute -bottom-16 -left-8 glass-panel px-6 py-3 rounded-full flex items-center gap-3 shadow-lg animate-bounce duration-[3000ms] border border-white/5 bg-black/40 backdrop-blur-md">
                                <CheckCircle2 size={20} className="text-status-success" />
                                <span className="text-base font-medium">Global Access Active</span>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            {/* Features - Reduced Spacing */}
            <section className="py-8 bg-black/20 backdrop-blur-sm border-t border-white/5 mt-0 mb-0">
                <div className="max-w-[1440px] mx-auto px-6 grid md:grid-cols-3 gap-6">
                    {[
                        { icon: Zap, title: "Instant Global", desc: "Transfers happen in milliseconds." },
                        { icon: Shield, title: "Risk-Free Vault", desc: "Safe sandbox environment." },
                        { icon: Globe, title: "World Access", desc: "Send money anywhere (mock)." },
                    ].map((f, i) => (
                        <div key={i} className="p-5 rounded-xl bg-app-surface border border-white/5 hover:border-brand-primary/30 transition-all hover:bg-white/5 group">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:bg-brand-primary/20 transition-colors">
                                <f.icon className="w-5 h-5 text-brand-primary" />
                            </div>
                            <h3 className="text-lg font-bold mb-1 font-brand">{f.title}</h3>
                            <p className="text-sm text-app-text-muted leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            {/* Footer */}
            <footer className="border-t border-white/10 bg-[#050505] relative z-10 py-8">
                <div className="max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-app-text-muted">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="SmartBank" className="h-5 w-5 rounded opacity-50 grayscale" />
                        <span>&copy; 2024 SmartBank Hub. All rights reserved.</span>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Status</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
