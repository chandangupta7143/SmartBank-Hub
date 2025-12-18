import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg';

const Brand = () => {
    return (
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
                <div className="absolute -inset-2 bg-brand-primary/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                    src={logo}
                    alt="Fusion Finance"
                    className="relative w-9 h-9 rounded-xl object-contain shadow-lg ring-1 ring-white/10 group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="flex flex-col">
                <span className="font-brand text-lg font-black tracking-tight text-white leading-none group-hover:text-brand-primary transition-colors duration-300">
                    Fusion Finance
                </span>
                <span className="text-[9px] font-bold tracking-[0.3em] text-brand-primary uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                    Global
                </span>
            </div>
        </Link>
    );
};

export default Brand;
