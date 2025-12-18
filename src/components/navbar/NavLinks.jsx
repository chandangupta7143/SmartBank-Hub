import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NAV_LINKS } from '../../mocks/nav-mock';

const NavLinks = () => {
    return (
        <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
                <Link key={link.label} to={link.href} className="relative px-4 py-2 text-sm font-medium text-app-text-muted hover:text-white transition-colors group">
                    <span className="relative z-10">{link.label}</span>
                    <motion.div
                        className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100"
                        layoutId="nav-hover"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-full group-hover:h-[1px] group-hover:bottom-2"></div>
                </Link>
            ))}
        </nav>
    );
};

export default NavLinks;
