'use client';

import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="bg-white min-h-screen font-[family-name:var(--font-jost)] pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-start gap-16">
                    {/* Left Side: Content & Info */}
                    <div className="w-full lg:w-1/2 space-y-12">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] border border-green-100">
                                <MessageSquare size={14} fill="currentColor" className="opacity-20" /> CONTACT US
                            </div>
                            <h1 className="text-5xl md:text-7xl font-semibold text-slate-900 leading-[1.1] tracking-tighter">
                                Let's <span className="text-green-600">Secure</span> <br />
                                Your Supply <br />
                                Chain.
                            </h1>
                            <p className="text-lg text-slate-500 font-medium max-w-md leading-relaxed">
                                Have questions about our sensor technology or marketplace? Our team is available 24/7 to help you optimize your agricultural flow.
                            </p>
                        </div>

                        {/* Contact Info Boxes */}
                        <div className="space-y-4 max-w-lg">
                            {/* Email */}
                            <div className="flex items-center gap-6 p-6 bg-slate-50 border border-slate-100 rounded-[32px] group hover:bg-white hover:shadow-xl hover:shadow-green-900/5 transition-all duration-500 text-left">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-green-600 shadow-sm border border-slate-100">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-1">Email Us</p>
                                    <p className="text-xl font-semibold text-slate-900">hello@alma.agri</p>
                                </div>
                            </div>

                            {/* Call */}
                            <div className="flex items-center gap-6 p-6 bg-slate-50 border border-slate-100 rounded-[32px] group hover:bg-white hover:shadow-xl hover:shadow-green-900/5 transition-all duration-500 text-left">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-green-600 shadow-sm border border-slate-100">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-1">Call Us</p>
                                    <p className="text-xl font-semibold text-slate-900">+250 788 000 000</p>
                                </div>
                            </div>

                            {/* Visit */}
                            <div className="flex items-center gap-6 p-6 bg-slate-50 border border-slate-100 rounded-[32px] group hover:bg-white hover:shadow-xl hover:shadow-green-900/5 transition-all duration-500 text-left">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-green-600 shadow-sm border border-slate-100">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-1">Visit Us</p>
                                    <p className="text-xl font-semibold text-slate-900">Kigali Innovation City, Rwanda</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form Container */}
                    <div className="w-full lg:w-[500px] xl:w-[580px]">
                        <div className="bg-[#0a1118] p-10 md:p-14 rounded-[50px] shadow-2xl shadow-slate-900/30">
                            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Full Name */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-green-500 uppercase tracking-[0.3em] ml-2">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all font-medium"
                                        />
                                    </div>
                                    {/* Email Address */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-green-500 uppercase tracking-[0.3em] ml-2">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                {/* Subject */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-green-500 uppercase tracking-[0.3em] ml-2">Subject</label>
                                    <input
                                        type="text"
                                        placeholder="General Inquiry"
                                        className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all font-medium"
                                    />
                                </div>

                                {/* Your Message */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-green-500 uppercase tracking-[0.3em] ml-2">Your Message</label>
                                    <textarea
                                        rows={6}
                                        placeholder="Tell us about your needs..."
                                        className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all font-medium resize-none shadow-inner"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button className="w-full bg-green-600 hover:bg-green-500 text-white rounded-2xl py-6 font-bold text-[13px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 group active:scale-[0.98]">
                                    SEND MESSAGE <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
