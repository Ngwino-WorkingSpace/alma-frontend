'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sprout } from 'lucide-react';
import { useState, useEffect } from 'react';
import AlmaLogo from './AlmaLogo';

const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300">
            <div className={`w-full max-w-5xl transition-all duration-500 rounded-full border border-white/10 ${scrolled
                ? 'bg-[#1a3a2d]/90 backdrop-blur-xl py-3 shadow-2xl'
                : 'bg-[#1a3a2d] py-4 shadow-xl'
                }`}>
                <div className="mx-auto px-8 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group relative z-10 py-2">
                        <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform shadow-sm">
                            <Sprout size={18} className="text-green-600" />
                        </div>
                        <span className="text-2xl font-black text-white tracking-tighter">ALMA</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-[12px] font-bold uppercase tracking-widest transition-all ${isActive
                                        ? 'text-white'
                                        : 'text-white/60 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/login"
                            className="text-[12px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="px-6 py-2.5 bg-[#4a7c59] text-white rounded-full font-bold text-[12px] uppercase tracking-widest hover:bg-green-700 transition-all active:scale-95 border border-white/10"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white p-2"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <div className={`fixed inset-0 bg-[#1a3a2d] z-[60] transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
                <div className="p-8">
                    <div className="flex justify-between items-center mb-12">
                        <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center">
                            <span className="text-2xl font-black text-white tracking-tighter uppercase">ALMA</span>
                        </Link>
                        <button onClick={() => setIsOpen(false)} className="p-2 text-white/80">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block text-2xl font-black text-white uppercase tracking-tighter"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-8 flex flex-col gap-6 border-t border-white/10">
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="text-xl font-bold text-white/60 uppercase tracking-widest"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                onClick={() => setIsOpen(false)}
                                className="w-full py-4 bg-[#4a7c59] text-white rounded-2xl font-black text-center text-lg uppercase tracking-widest"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
