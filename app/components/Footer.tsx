'use client';

import Link from 'next/link';
import { Instagram, Facebook, Linkedin, Twitter, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative bg-[#0a1a14] pt-32 pb-12 overflow-hidden font-[family-name:var(--font-jost)] text-white">
            {/* Massive Background Text - Global Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                <span className="text-[35vw] font-black text-white/[0.03] leading-none tracking-tighter uppercase">
                    ALMA
                </span>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 z-10">
                {/* Newsletter bar */}
                <div className="bg-white/5 backdrop-blur-md rounded-[40px] p-8 md:p-12 mb-24 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="space-y-2">
                        <h3 className="text-3xl md:text-4xl font-semibold tracking-tighter">Stay <span className="text-green-500">Connected.</span></h3>
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-[0.2em]">Subscribe for the latest in food security tech.</p>
                    </div>
                    <form className="w-full lg:w-auto flex flex-col sm:flex-row gap-4 flex-grow max-w-xl" onSubmit={(e) => e.preventDefault()}>
                        <div className="relative flex-grow">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-white/10 border border-white/10 rounded-2xl pl-16 pr-8 py-5 text-white placeholder:text-slate-500 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all font-medium"
                            />
                        </div>
                        <button className="bg-green-600 hover:bg-green-500 text-white rounded-2xl px-10 py-5 font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 group">
                            Subscribe <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24 border-b border-white/5 pb-24">
                    {/* Brand Column */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">
                                ALMA <br /><span className="text-green-500">AGRI.</span>
                            </h2>
                            <p className="text-slate-400 text-[14px] leading-relaxed font-medium">
                                Revolutionizing food security through molecular intelligence and blockchain transparency at every touchpoint.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            {[Instagram, Facebook, Linkedin, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-green-600 hover:scale-110 transition-all border border-white/5">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop Column */}
                    <div className="space-y-8">
                        <h3 className="text-[10px] uppercase font-black tracking-[0.4em] text-green-500">QUICK LINKS</h3>
                        <ul className="space-y-4 font-bold text-sm text-slate-300">
                            <li><Link href="/" className="hover:text-green-500 transition-colors uppercase tracking-widest">Home</Link></li>
                            <li><Link href="/about" className="hover:text-green-500 transition-colors uppercase tracking-widest">About Us</Link></li>
                            <li><Link href="/services" className="hover:text-green-500 transition-colors uppercase tracking-widest">Services</Link></li>
                            <li><Link href="/contact" className="hover:text-green-500 transition-colors uppercase tracking-widest">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Connect Column */}
                    <div className="space-y-8">
                        <h3 className="text-[10px] uppercase font-black tracking-[0.4em] text-green-500">WORKING HOURS</h3>
                        <div className="space-y-4 font-medium text-sm text-slate-400">
                            <p className="flex justify-between border-b border-white/5 pb-2"><span>Monday - Friday</span> <span className="text-white">8:00 - 18:00</span></p>
                            <p className="flex justify-between border-b border-white/5 pb-2"><span>Saturday</span> <span className="text-white">9:00 - 16:00</span></p>
                            <p className="flex justify-between"><span>Sunday</span> <span className="text-white">Closed</span></p>
                        </div>
                    </div>

                    {/* Info Column */}
                    <div className="space-y-8">
                        <h3 className="text-[10px] uppercase font-black tracking-[0.4em] text-green-500">GET IN TOUCH</h3>
                        <ul className="space-y-6 font-bold text-sm text-slate-300">
                            <li className="flex items-start gap-4">
                                <MapPin size={20} className="text-green-500 shrink-0" />
                                <span className="leading-relaxed">Kigali Knowledge Lab,<br />Nyarugenge, Kigali, Rwanda</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Phone size={18} className="text-green-500 shrink-0" />
                                <span>+250 788 000 000</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail size={18} className="text-green-500 shrink-0" />
                                <span>hello@alma.agri</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase">
                        © 2026 ALMA AGRICULTURE. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-6 items-center">
                        <span className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase">
                            Privacy Policy
                        </span>
                        <span className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase">
                            Terms of Service
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
