import Link from 'next/link';
import { Instagram, Facebook, Linkedin, Twitter, Mail } from 'lucide-react';
import AlmaLogo from './AlmaLogo';

export default function Footer() {
    return (
        <footer className="relative bg-white pt-24 pb-12 overflow-hidden border-t border-slate-100">
            {/* Massive Background Text like the Simba Mockup */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
                <span className="text-[25vw] font-black text-slate-50 leading-none opacity-50 tracking-tighter">
                    ALMA
                </span>
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
                    {/* Brand Column */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-black text-green-700 tracking-tighter uppercase flex items-center gap-2">
                                ALMA AGRICULTURE
                            </h2>
                            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400">
                                FRESHNESS • QUALITY • SUSTAINABILITY
                            </p>
                        </div>
                    </div>

                    {/* Shop Column */}
                    <div className="space-y-8">
                        <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-300">SHOP</h3>
                        <ul className="space-y-4 font-bold text-sm text-slate-900">
                            <li><Link href="/shop" className="hover:text-green-600 transition-colors">FRESH PRODUCE</Link></li>
                            <li><Link href="/shop" className="hover:text-green-600 transition-colors">ORGANIC SEEDS</Link></li>
                            <li><Link href="/shop" className="hover:text-green-600 transition-colors">FARM TOOLS</Link></li>
                            <li><Link href="/shop" className="hover:text-green-600 transition-colors">LIVESTOCK</Link></li>
                            <li><Link href="/shop" className="hover:text-green-600 transition-colors">AGROCHEMICALS</Link></li>
                        </ul>
                    </div>

                    {/* Connect Column */}
                    <div className="space-y-8">
                        <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-300">CONNECT</h3>
                        <ul className="space-y-4 font-bold text-sm text-slate-900">
                            <li><a href="#" className="flex items-center gap-2 hover:text-green-600 transition-colors"><Instagram size={14} /> INSTAGRAM</a></li>
                            <li><a href="#" className="flex items-center gap-2 hover:text-green-600 transition-colors"><Facebook size={14} /> FACEBOOK</a></li>
                            <li><a href="#" className="flex items-center gap-2 hover:text-green-600 transition-colors"><Linkedin size={14} /> LINKEDIN</a></li>
                            <li><a href="#" className="flex items-center gap-2 hover:text-green-600 transition-colors"><Twitter size={14} /> TWITTER</a></li>
                            <li><a href="#" className="flex items-center gap-2 hover:text-green-600 transition-colors"><Mail size={14} /> EMAIL</a></li>
                        </ul>
                    </div>

                    {/* Info Column */}
                    <div className="space-y-8">
                        <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-300">INFO</h3>
                        <div className="space-y-6 font-bold text-sm text-slate-900">
                            <div>
                                <p className="leading-tight uppercase">AVAILABLE FOR</p>
                                <p className="leading-tight uppercase">24/7 ONLINE ORDERS.</p>
                            </div>
                            <div>
                                <p className="leading-tight uppercase">LOCATION</p>
                                <p className="leading-tight uppercase">KIGALI, RWANDA</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                        © 2026 ALMA AGRICULTURE. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-4 items-center">
                        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                            ALMA DIGITAL EXPERIENCE V1.0
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
